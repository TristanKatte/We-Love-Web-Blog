// src/routes/issues/+page.ts
import type { PageLoad } from './$types';
import type { Post } from '$lib/types';

export const load: PageLoad = async () => {
	const modules = import.meta.glob('$lib/content/issues/*.md', { eager: true });
	const posts: Post[] = [];

	for (const path in modules) {
		const mod = modules[path] as { metadata: Post };
		if (mod && mod.metadata.published) {
			posts.push({
				...mod.metadata,
				slug: path.split('/').pop()?.replace('.md', '') || ''
			});
		}
	}

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

	return {
		posts
	};
};
