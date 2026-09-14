import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import guideMarkdown from './src/plugins/guide-markdown.mjs';
import checkLinks from './check-links.mjs';

export default defineConfig({
  site: 'https://go42.dev',
  output: 'static',
  outDir: '../.build/dist',
  trailingSlash: 'always',
  markdown: {
    processor: unified({ remarkPlugins: [guideMarkdown] }),
  },
  integrations: [
    starlight({
      title: 'go42',
      description: 'A Go service blueprint with development workflows and project context.',
      logo: { src: './public/go42.svg', alt: '' },
      favicon: '/go42.svg',
      disable404Route: true,
      customCss: ['./src/styles/docs.css'],
      components: { Header: './src/components/DocsHeader.astro' },
      // Content file paths, including ../docs/, are relative to the Astro project.
      editLink: { baseUrl: 'https://github.com/go42-dev/go42-docs/edit/master/pages/' },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/go42-dev/go42' },
      ],
      sidebar: [
        { label: 'Overview', link: '/docs/' },
        { label: 'Documentation', link: '/docs/documentation/' },
      ],
    }),
    checkLinks(),
  ],
});
