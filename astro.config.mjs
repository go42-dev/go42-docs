import { defineConfig } from 'astro/config';
import { unified } from '@astrojs/markdown-remark';
import starlight from '@astrojs/starlight';
import guideMarkdown from './src/plugins/guide-markdown.mjs';

export default defineConfig({
  site: 'https://go42.dev',
  output: 'static',
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
      editLink: { baseUrl: 'https://github.com/go42-dev/go42-docs/edit/master/' },
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/go42-dev/go42' },
      ],
      sidebar: [
        { label: 'Overview', link: '/docs/' },
        {
          label: 'Working with Go42',
          items: [
            { label: 'Adopt go42', link: '/docs/adopting-go42/' },
            { label: 'Default workflows', link: '/docs/default-workflows/' },
            { label: 'Documentation model', link: '/docs/documentation/' },
          ],
        },
      ],
    }),
  ],
});
