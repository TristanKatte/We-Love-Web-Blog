<script lang="ts">
	import { formatDate } from '$lib/utils';
	import * as config from '$lib/config';
	import Hero from '$lib/components/organisms/Hero.svelte';
	import Button from '$lib/components/atoms/Button.svelte';
	import { ArrowRight } from 'lucide-svelte';

	export let data;

	let filters = {
		year: '',
		month: '',
		day: ''
	};

	let years = new Set<string>();
	let months = new Set<string>();
	let days = new Set<string>();

	const monthMap = [
		{ name: 'Januari', value: '01' },
		{ name: 'Februari', value: '02' },
		{ name: 'Maart', value: '03' },
		{ name: 'April', value: '04' },
		{ name: 'Mei', value: '05' },
		{ name: 'Juni', value: '06' },
		{ name: 'Juli', value: '07' },
		{ name: 'Augustus', value: '08' },
		{ name: 'September', value: '09' },
		{ name: 'Oktober', value: '10' },
		{ name: 'November', value: '11' },
		{ name: 'December', value: '12' }
	];

	function parseDateParts(dateStr: string) {
		const d = new Date(dateStr);
		return {
			year: d.getFullYear().toString(),
			month: (d.getMonth() + 1).toString().padStart(2, '0'),
			day: d.getDate().toString().padStart(2, '0')
		};
	}

	for (const post of data.posts) {
		const d = parseDateParts(post.date);
		years.add(d.year);
		months.add(d.month);
		days.add(d.day);
	}

	$: filteredPosts = data.posts.filter((post) => {
		const d = parseDateParts(post.date);
		return (
			(!filters.year || d.year === filters.year) &&
			(!filters.month || d.month === filters.month) &&
			(!filters.day || d.day === filters.day)
		);
	});
</script>

<svelte:head>
	<title>{config.title}</title>
</svelte:head>

<Hero />

<section aria-label="List of posts" id="posts">
	<section class="posts">
		{#each filteredPosts.slice(0, 4) as post, i}
			<article class="post" aria-labelledby={`post-title-${i}`}>
				<header>
					<h2 class="title" id={`post-title-${i}`}>
						<a href={`/issues/${post.slug}`}>{post.title}</a>
					</h2>
					<time class="date" datetime={post.date}>{formatDate(post.date)}</time>
				</header>
				<p class="description">{post.description}</p>
				<Button
					href={`/issues/${post.slug}`}
					size="small"
					icon={ArrowRight}
					aria-label={`Bekijk ${post.title}`}>Lees meer</Button
				>
			</article>
		{/each}
		<Button href="/issues" size="large" icon={ArrowRight} aria-label="Bekijk alle issues"
			>Alle issues</Button
		>
	</section>
</section>

<style>
	.posts {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--size-5);
		padding: var(--size-5);
	}

	@media (min-width: 640px) {
		.posts {
			grid-template-columns: repeat(2, 1fr);
		}
	}

	@media (min-width: 1024px) {
		.posts {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.post {
		display: flex;
		flex-direction: column;
		justify-content: space-between;
		background: var(--project-card-color);
		border: 6px solid var(--btn-color);
		border-radius: 8px;
		padding: var(--size-5);
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
		min-height: 100%;
	}

	.post:hover {
		transform: translateY(-5px);
	}

	.post:focus-within {
		outline: 4px solid var(--btn-color);
		outline-offset: 4px;
		box-shadow: 0 0 0 4px rgba(0, 122, 204, 0.2);
	}

	.title {
		font-size: var(--font-size-fluid-2);
		font-weight: bold;
		text-transform: capitalize;
		margin: 0;
	}

	.title a {
		color: var(--heading-color);
		text-decoration: none;
	}

	.title a:focus {
		outline: none;
		text-decoration: underline;
	}

	.title a:hover,
	.title a:focus {
		text-decoration: underline;
		color: rgb(199, 199, 199);
	}

	.date {
		color: var(--strong-color);
		font-size: 0.9rem;
		margin-top: var(--size-2);
		display: block;
	}

	.description {
		margin-top: var(--size-3);
		color: var(--txt-color);
		font-size: 1rem;
		margin-bottom: var(--size-3);
	}
</style>