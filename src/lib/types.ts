export type Categories = 'sveltekit' | 'svelte'

export type Post = {
	title: string;
	description: string;
	date: string;
	image?: string;
	categories?: string[];
	published: boolean;
	slug?: string;
};
