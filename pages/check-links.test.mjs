import assert from 'node:assert/strict';
import { mkdir, mkdtemp, rm, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import test from 'node:test';
import checkLinks, { checkSiteLinks } from './check-links.mjs';

const scratch = fileURLToPath(new URL('../.build/link-check-tests/', import.meta.url));
const site = 'https://docs.example.test';

async function fixture(t, files) {
  await mkdir(scratch, { recursive: true });
  const directory = await mkdtemp(path.join(scratch, 'site-'));
  t.after(() => rm(directory, { recursive: true, force: true }));
  for (const [file, contents] of Object.entries(files)) {
    const target = path.join(directory, file);
    await mkdir(path.dirname(target), { recursive: true });
    await writeFile(target, contents);
  }
  return directory;
}

test('resolves relative, root, same-origin, query, fragment, and download links', async (t) => {
  const directory = await fixture(t, {
    'index.html': '<a href="docs/start/">Start</a><a href="/guide.pdf">Download</a>',
    'docs/start/index.html': `
      <h1 id="setup">Setup</h1>
      <a href="#setup">Here</a><a href="../next/?mode=1#run">Next</a>
      <a href="/docs/next">Next without slash</a>
      <a href="https://docs.example.test/docs/next/index.html#run">Next absolute</a>`,
    'docs/next/index.html': '<h1 id="run">Run</h1><a href="../../">Home</a>',
    'guide.pdf': 'download',
  });
  assert.deepEqual(await checkSiteLinks(directory, site), { pages: 3, links: 7 });
});

test('reports missing pages and anchors with their referring file and line', async (t) => {
  const directory = await fixture(t, {
    'index.html': '<a href="/missing/">Missing</a>\n<a href="/docs/#gone">Gone</a>',
    'docs/index.html': '<h1 id="present">Present</h1>',
  });
  await assert.rejects(checkSiteLinks(directory, site), (error) => {
    assert.match(error.message, /index\.html:1:.*missing page or file \/missing\//);
    assert.match(error.message, /index\.html:2:.*missing anchor #gone in docs\/index\.html/);
    return true;
  });
});

test('matches decoded paths, HTML entities, Unicode IDs, and named anchors', async (t) => {
  const directory = await fixture(t, {
    'index.html': `<a href="/space%20here/#caf%C3%A9">Unicode</a>
      <a href="/space%20here/#a&amp;b">Entity</a><a href="/space%20here/#legacy">Named</a>`,
    'space here/index.html': '<h2 id="café">Café</h2><h2 id="a&amp;b">A &amp; B</h2><a name="legacy"></a>',
  });
  assert.equal((await checkSiteLinks(directory, site)).links, 3);
});

test('checks paths and anchors case-sensitively on every host OS', async (t) => {
  const directory = await fixture(t, {
    'index.html': '<a href="/Docs/">Path</a><a href="/docs/#Setup">ID</a>',
    'docs/index.html': '<h2 id="setup">Setup</h2>',
  });
  await assert.rejects(checkSiteLinks(directory, site), (error) => {
    assert.match(error.message, /missing page or file \/Docs\//);
    assert.match(error.message, /missing anchor #Setup/);
    return true;
  });
});

test('resolves a configured deployment base and an HTML base element', async (t) => {
  const directory = await fixture(t, {
    'index.html': '<base href="/project/docs/"><a href="./#run">Run</a>',
    'docs/index.html': '<h1 id="run">Run</h1><a href="/project/">Home</a>',
  });
  assert.deepEqual(await checkSiteLinks(directory, site, '/project'), { pages: 2, links: 2 });
});

test('rejects same-origin links outside the configured deployment base', async (t) => {
  const directory = await fixture(t, { 'index.html': '<a href="/docs/">Wrong base</a>' });
  await assert.rejects(checkSiteLinks(directory, site, '/project/'), /outside the site base \/project\//);
});

test('ignores external URLs, non-HTTP schemes, comments, and inert HTML', async (t) => {
  const directory = await fixture(t, {
    'index.html': `<a href="https://elsewhere.invalid/missing#gone">External</a>
      <a href="//elsewhere.invalid/missing">External</a><a href="mailto:docs@example.test">Email</a>
      <a href="tel:123">Phone</a><!-- <a href="/missing/">Comment</a> -->
      <script>const example = '<a href="/missing/">Script</a>';</script>
      <template><a href="/missing/">Template</a></template>`,
  });
  assert.deepEqual(await checkSiteLinks(directory, site), { pages: 1, links: 0 });
});

test('accepts empty, top, and text-only fragments while checking an accompanying ID', async (t) => {
  const directory = await fixture(t, {
    'index.html': `<h1 id="intro">Intro</h1><a href="#">Empty</a><a href="#top">Top</a>
      <a href="#:~:text=Intro">Text</a><a href="#intro:~:text=Intro">ID and text</a>`,
  });
  assert.equal((await checkSiteLinks(directory, site)).links, 4);
  await writeFile(path.join(directory, 'index.html'), '<a href="#gone:~:text=Intro">Gone</a>');
  await assert.rejects(checkSiteLinks(directory, site), /missing anchor #gone/);
});

test('reports malformed URLs and percent encoding', async (t) => {
  const directory = await fixture(t, {
    'index.html': '<a href="http://[broken">URL</a><a href="/%zz/">Path</a><a href="#%zz">ID</a>',
  });
  await assert.rejects(checkSiteLinks(directory, site), (error) => {
    assert.match(error.message, /invalid URL/);
    assert.equal(error.message.match(/invalid percent encoding/g).length, 2);
    return true;
  });
});

test('rejects empty output instead of reporting a successful check', async (t) => {
  const directory = await fixture(t, {});
  await assert.rejects(checkSiteLinks(directory, site), /no generated HTML pages/);
});

test('the Astro integration propagates failures and uses the resolved output and base', async (t) => {
  const directory = await fixture(t, { 'index.html': '<a href="/project/#gone">Gone</a>' });
  const integration = checkLinks();
  integration.hooks['astro:config:done']({ config: { site, base: '/project/' } });
  const messages = [];
  const options = { dir: pathToFileURL(directory + path.sep), logger: { info: (message) => messages.push(message) } };
  await assert.rejects(integration.hooks['astro:build:done'](options), /missing anchor #gone/);
  assert.deepEqual(messages, []);
  await writeFile(path.join(directory, 'index.html'), '<a href="/project/">Home</a>');
  await integration.hooks['astro:build:done'](options);
  assert.deepEqual(messages, ['Checked 1 internal links across 1 HTML pages.']);
});
