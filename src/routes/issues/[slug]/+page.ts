import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export async function load({ params }) {
  try {
    const post = await import(`../../../lib/content/issues/${params.slug}.md`);

    return {
      content: post.default,
      meta: post.metadata
    };
  } catch {
    throw error(404, `Could not find post: ${params.slug}`);
  }
}