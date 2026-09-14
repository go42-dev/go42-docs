import { readdir, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { parse } from 'parse5';

async function listFiles(directory, prefix = '') {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const name = prefix + entry.name;
    if (entry.isDirectory()) {
      files.push(...await listFiles(path.join(directory, entry.name), `${name}/`));
    } else if (entry.isFile()) {
      files.push(name);
    }
  }
  return files.sort();
}

function inspectHtml(html) {
  const anchors = new Set();
  const links = [];
  let base;
  const nodes = [parse(html, { sourceCodeLocationInfo: true })];
  while (nodes.length) {
    const node = nodes.pop();
    const attrs = Object.fromEntries((node.attrs ?? []).map(({ name, value }) => [name, value]));
    if (attrs.id !== undefined) anchors.add(attrs.id);
    if (node.tagName === 'a' && attrs.name !== undefined) anchors.add(attrs.name);
    if (node.tagName === 'base' && attrs.href !== undefined) base ??= attrs.href;
    if (['a', 'area'].includes(node.tagName) && attrs.href !== undefined) {
      links.push({ href: attrs.href, line: node.sourceCodeLocation?.attrs?.href?.startLine ?? 1 });
    }
    // Template contents and script text do not contribute active navigation or anchors.
    nodes.push(...(node.childNodes ?? []).toReversed());
  }
  return { anchors, links, base };
}

// Resolve browser navigation against the generated output, without making network requests.
export async function checkSiteLinks(directory, site, base = '/') {
  const origin = new URL(site).origin;
  const basePath = `${base.replace(/\/$/, '')}/`;
  const files = new Set(await listFiles(directory));
  const pages = new Map();
  for (const file of files) {
    if (file.endsWith('.html')) {
      pages.set(file, inspectHtml(await readFile(path.join(directory, file), 'utf8')));
    }
  }
  if (!pages.size) throw new Error('Internal link check found no generated HTML pages.');

  const errors = [];
  let checkedLinks = 0;
  for (const [file, page] of pages) {
    const route = file.replace(/(^|\/)index\.html$/, '$1');
    const pageUrl = new URL(basePath + route.split('/').map(encodeURIComponent).join('/'), origin);
    let resolutionBase = pageUrl;
    if (page.base !== undefined) {
      try {
        resolutionBase = new URL(page.base, pageUrl);
      } catch {
        errors.push(`${file}: invalid base URL ${JSON.stringify(page.base)}`);
        continue;
      }
    }
    for (const { href, line } of page.links) {
      const fail = (message) => errors.push(`${file}:${line}: ${JSON.stringify(href)}: ${message}`);
      let url;
      try {
        url = new URL(href, resolutionBase);
      } catch {
        fail('invalid URL');
        continue;
      }
      if (!['http:', 'https:'].includes(url.protocol) || url.origin !== origin) continue;
      checkedLinks++;
      let pathname;
      let fragment;
      try {
        pathname = decodeURIComponent(url.pathname);
        // Text directives are handled by the browser; an accompanying element ID still needs to exist.
        fragment = decodeURIComponent(url.hash.slice(1).split(':~:')[0]);
      } catch {
        fail('invalid percent encoding');
        continue;
      }
      if (!pathname.startsWith(basePath)) {
        fail(`target is outside the site base ${basePath}`);
        continue;
      }
      const relative = pathname.slice(basePath.length);
      const target = files.has(relative) ? relative : path.posix.join(relative, 'index.html');
      if (!files.has(target)) {
        fail(`missing page or file ${pathname}`);
        continue;
      }
      const destination = pages.get(target);
      if (destination && fragment && !destination.anchors.has(fragment) && fragment.toLowerCase() !== 'top') {
        fail(`missing anchor #${fragment} in ${target}`);
      }
    }
  }
  if (errors.length) throw new Error(`Internal link check failed:\n${errors.join('\n')}`);
  return { pages: pages.size, links: checkedLinks };
}

// All Astro builds use the resolved site URL, base path, and output directory.
export default function checkLinks() {
  let config;
  return {
    name: 'check-internal-links',
    hooks: {
      'astro:config:done': ({ config: resolved }) => { config = resolved; },
      'astro:build:done': async ({ dir, logger }) => {
        const result = await checkSiteLinks(fileURLToPath(dir), config.site, config.base);
        logger.info(`Checked ${result.links} internal links across ${result.pages} HTML pages.`);
      },
    },
  };
}
