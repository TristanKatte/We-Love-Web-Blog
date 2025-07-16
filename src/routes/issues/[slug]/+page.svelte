<script lang="ts">
	import { onMount } from 'svelte';
	import { formatDate } from '$lib/utils';

	let { data } = $props();

	onMount(() => {
		// Zorg dat de pagina naar boven scrollt bij navigatie
		requestAnimationFrame(() => {
			window.scrollTo({ top: 0, behavior: 'auto' });
		});
	});
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
</svelte:head>

<article>
	{#if data.meta.image}
		<img
			src={`/images/${data.meta.image}`}
			alt={`Header image for ${data.meta.title}`}
			style={`view-transition-name: issue-image-${data.meta.slug}; width: 100%; border-radius: var(--radius-3);`}
		/>
	{/if}

	<hgroup>
		<h1 style={`issue-title-${data.meta.slug}`}>
			{data.meta.title}
		</h1>
		<p>Gepubliceerd op {formatDate(data.meta.date)}</p>
	</hgroup>

	<div class="tags">
		{#each data.meta.categories as category}
			<span class="surface-4">&num;{category}</span>
		{/each}
	</div>

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	article {
		width: 100%;
		max-inline-size: var(--size-content-3);
		margin-inline: auto;
		padding: var(--size-4);
	}

	h1 {
		text-transform: capitalize;
		color: var(--heading-color);
		font-family: 'Cantarell', sans-serif;
		font-weight: 400;
		padding: var(--size-3);
	}

	h1 + p {
		margin-top: var(--size-2);
		color: var(--text-2);
	}

	p {
		font-family: 'Ruluko', sans-serif;
		font-weight: 400;
	}

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
		margin-bottom: var(--size-7);
		font-family: 'Numans', sans-serif;
		font-weight: 400;

		> * {
			padding: var(--size-2) var(--size-3);
			border-radius: var(--radius-round);
		}
	}
</style>