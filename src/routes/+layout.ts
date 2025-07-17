import type { LayoutLoad } from './$types';
import type { Post } from '$lib/types';

export const load: LayoutLoad = async ({ fetch }) => {
	const res = await fetch('/api/posts');
	const posts: Post[] = await res.json();

	return {
		featuredPost: posts[0] // Meest recente post
	};
};
