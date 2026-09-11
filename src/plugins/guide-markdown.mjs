import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { visit } from 'unist-util-visit';

const guidesRoot = fileURLToPath(new URL('../../guides/', import.meta.url));

// Keep guide headings and relative Markdown links readable in GitHub and on the site.
export default function guideMarkdown() {
  return (tree, file) => {
    if (!file.path || !path.resolve(file.path).startsWith(guidesRoot)) return;

    // Starlight renders the page title from front matter.
    if (tree.children[0]?.type === 'heading' && tree.children[0].depth === 1) {
      tree.children.shift();
    }

    visit(tree, (node) => {
      if (node.type !== 'link' && node.type !== 'definition') return;
      if (/^(?:[a-z][a-z\d+.-]*:|\/|#)/i.test(node.url)) return;
      const match = /^([^?#]+\.md)([?#].*)?$/.exec(node.url);
      if (!match) return;
      const target = path.resolve(path.dirname(file.path), decodeURI(match[1]));
      const relative = path.relative(guidesRoot, target);
      if (relative.startsWith('..') || path.isAbsolute(relative)) return;
      const slug = relative.replaceAll(path.sep, '/').replace(/\.md$/, '').replace(/(^|\/)index$/, '');
      node.url = `/docs/${slug ? `${slug}/` : ''}${match[2] || ''}`;
    });
  };
}
