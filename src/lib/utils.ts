import type { Post } from '$lib/types';

type DateStyle = Intl.DateTimeFormatOptions['dateStyle'];

/**
 * Formatteert een datum string (YYYY-MM-DD) naar leesbare datum.
 * Lost ook Safari-problemen met datum parsing op.
 */
export function formatDate(date: string, dateStyle: DateStyle = 'medium', locales = 'en') {
	const dateToFormat = new Date(date.replaceAll('-', '/'));
	const dateFormatter = new Intl.DateTimeFormat(locales, { dateStyle });
	return dateFormatter.format(dateToFormat);
}

/**
 * Haalt de meest recente gepubliceerde blogpost op uit src/posts.
 */
export async function getLatestPost(): Promise<Post | null> {
	const modules = import.meta.glob('/src/posts/*.md', { eager: true });

	let posts: Post[] = [];

	for (const path in modules) {
		const mod = modules[path];
		const slug = path.split('/').pop()?.replace('.md', '');

		if (mod && typeof mod === 'object' && 'metadata' in mod && slug) {
			const metadata = (mod as any).metadata as Omit<Post, 'slug'>;
			const post = { ...metadata, slug } satisfies Post;
			if (post.published) posts.push(post);
		}
	}

	if (posts.length === 0) return null;

	posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
	return posts[0];
}
