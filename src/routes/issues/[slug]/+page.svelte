<script lang="ts">
	import { formatDate } from '$lib/utils';
	export let data;
</script>

<svelte:head>
	<title>{data.meta.title}</title>
	<meta property="og:type" content="article" />
	<meta property="og:title" content={data.meta.title} />
	<meta property="og:description" content={data.meta.description} />
	{#if data.meta.image}
		<meta property="og:image" content={`/images/${data.meta.image}`} />
	{/if}
</svelte:head>

<article>
	{#if data.meta.image}
		<img
			src={`/images/${data.meta.image}`}
			alt={data.meta.title}
			style="width: 100%; border-radius: var(--radius-3);"
		/>
	{/if}

	<hgroup>
		<h1>{data.meta.title}</h1>
		<p>Published at {formatDate(data.meta.date)}</p>
	</hgroup>

	{#if data.meta.categories?.length}
		<div class="tags">
			{#each data.meta.categories as category}
				<span class="surface-4">&num;{category}</span>
			{/each}
		</div>
	{/if}

	<div class="prose">
		<data.content />
	</div>
</article>

<style>
	article {
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

	.tags {
		display: flex;
		gap: var(--size-3);
		margin-top: var(--size-7);
		margin-bottom: var(--size-7);
		font-family: 'Numans', sans-serif;
		font-weight: 400;
	}

	.tags > * {
		padding: var(--size-2) var(--size-3);
		border-radius: var(--radius-round);
	}
</style>
