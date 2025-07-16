import { json } from '@sveltejs/kit';
import type { Post } from '$lib/types';

/**
 * Haalt alle Markdown‑posts op uit /src/lib/content/issues
 * en sorteert ze op datum (nieuwste eerst).
 */
async function getPosts(): Promise<Post[]> {
	let posts: Post[] = [];

	// ↘︎ pad aanpassen aan jouw map
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });

	for (const path in modules) {
		const mod = modules[path] as { metadata: Omit<Post, 'slug'> };
		const slug = path.split('/').at(-1)?.replace('.md', ''); // bv. "hello-world"

		if (mod?.metadata && slug) {
			const post: Post = { ...mod.metadata, slug };

			if (post.published !== false) {
				posts.push(post);
			}
		}
	}

	// Sorteer op datum (desc)
	return posts.sort(
		(a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
	);
}

/** GET /﻿api/posts  →  JSON met alle gepubliceerde posts */
export async function GET() {
	const posts = await getPosts();
	return json(posts);
}
