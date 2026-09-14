import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { getBlogPosts } from '../lib/blog';

export async function GET(context: APIContext) {
  const posts = await getBlogPosts();
  return rss({
    title: 'Go42 — Notes from the build',
    description: 'Ideas, experiments, and lessons from developing Go42.',
    site: context.site!,
    items: posts.map((post) => ({
      title: post.data.title,
      description: post.data.description,
      pubDate: post.data.pubDate,
      link: `/blog/${post.id}/`,
    })),
    customData: '<language>en</language>',
  });
}
