export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string;
	date: string;
	description: string;
	image?: string;
	tags?: string[];
	slug: string;
	published: boolean;
	categories?: string[];
};
