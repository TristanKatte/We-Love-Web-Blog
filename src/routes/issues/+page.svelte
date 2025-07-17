<script lang="ts">
	import { formatDate } from '$lib/utils';
	import Button from '$lib/components/atoms/Button.svelte';
	import { ArrowRight } from 'lucide-svelte';
	export let data;
	const { posts } = data;

	let filters = { year: '', month: '', day: '' };

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

	for (const post of posts) {
		const d = parseDateParts(post.date);
		years.add(d.year);
		months.add(d.month);
		days.add(d.day);
	}

	$: filteredPosts = posts.filter((post) => {
		const d = parseDateParts(post.date);
		return (
			(!filters.year || d.year === filters.year) &&
			(!filters.month || d.month === filters.month) &&
			(!filters.day || d.day === filters.day)
		);
	});
</script>

<svelte:head>
	<title>Issues</title>
	<meta name="description" content="Issues" />
</svelte:head>

<section aria-labelledby="filter-heading" class="filters-section">
	<form class="filters" aria-labelledby="filter-heading" on:submit|preventDefault>
		<h2 id="filter-heading" class="visually-hidden">Filter posts op datum</h2>

		<fieldset>
			<legend>Jaar</legend>
			<select bind:value={filters.year}>
				<option value="">Alle Jaren</option>
				{#each Array.from(years).sort() as year}
					<option value={year}>{year}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset>
			<legend>Maand</legend>
			<select bind:value={filters.month}>
				<option value="">Alle Maanden</option>
				{#each monthMap as m}
					<option value={m.value}>{m.name}</option>
				{/each}
			</select>
		</fieldset>

		<fieldset>
			<legend>Dag</legend>
			<select bind:value={filters.day}>
				<option value="">Alle Dagen</option>
				{#each Array.from(days).sort() as day}
					<option value={day}>{day}</option>
				{/each}
			</select>
		</fieldset>
	</form>
</section>

<section class="container" aria-labelledby="blog-heading">
	<h2 id="blog-heading">Alle lezingen</h2>
	<section class="cards" aria-label="Blog posts">
		{#each filteredPosts as issue, i}
			<article class="post" aria-labelledby={`post-title-${i}`}>
				{#if issue.image}
					<img
						class="thumb"
						src={`/images/${issue.image}`}
						alt=""
						width="400"
						height="200"
						loading="lazy"
						style="view-transition-name: issue-image-{issue.slug}"
					/>
				{:else}
					<div class="thumb fallback" aria-hidden="true"></div>
				{/if}

				<header>
					<h3
						class="title"
						id={`post-title-${i}`}
						style="view-transition-name: issue-title-{issue.slug}"
					>
						{issue.title}
					</h3>
					<time class="date" datetime={issue.date}>{formatDate(issue.date)}</time>
				</header>

				<p class="description">{issue.description}</p>

				{#if issue.tags?.length}
					<ul class="card__tags" aria-label="Tags">
						{#each issue.tags as tag}
							<li class="card__tag">{tag}</li>
						{/each}
					</ul>
				{/if}

				<Button
					href={`/issues/${issue.slug}`}
					data-sveltekit-view-transition
					size="small"
					icon={ArrowRight}
					aria-label={`Bekijk ${issue.title}`}
				>
					Lees meer
				</Button>
			</article>
		{/each}
	</section>
</section>

<style>
	/* Filter styling (optioneel behouden) */
	.filters-section {
		padding: var(--size-5);
	}

	.filters {
		display: flex;
		flex-direction: row;
		gap: 1rem;
	}

	fieldset {
		border: 2px dashed var(--btn-color);
		padding: 0.75rem;
		border-radius: 6px;
	}

	select {
		padding: 0.5rem;
		border: 1px solid var(--btn-color);
		border-radius: 4px;
		background-color: var(--project-card-color);
		color: var(--text-1);
	}

    h2 {
        margin-left: var(--size-5);
    }

	/* Posts grid */
	.cards {
		display: grid;
		grid-template-columns: 1fr;
		gap: var(--size-5);
		padding: var(--size-5);
	}

	@media (min-width: 640px) {
		.cards {
			grid-template-columns: repeat(2, 1fr);
		}
	}
	@media (min-width: 1024px) {
		.cards {
			grid-template-columns: repeat(4, 1fr);
		}
	}

	.post {
		display: flex;
		flex-direction: column;
		justify-content: space-between; /* standaard */
		background: var(--project-card-color);
		border: 6px solid var(--btn-color);
		border-radius: 8px;
		padding: var(--size-5);
		min-height: 100%;
		transition:
			transform 0.2s ease,
			box-shadow 0.2s ease;
	}

	section {
		padding: var(--size-3);
	}

	h2 {
		color: var(--heading-color);
	}

	.post:hover {
		transform: translateY(-5px);
	}

	.thumb {
		width: 100%;
		height: 160px;
		object-fit: cover;
		border-radius: 6px;
		margin-bottom: var(--size-3);
	}

	.thumb.fallback {
		display: block;
		background: radial-gradient(
			at top left,
			var(--btn-color),
			var(--heading-color),
			var(--project-card-color)
		);
		filter: blur(4px);
	}

	.title {
		font-size: var(--font-size-fluid-2);
		color: var(--heading-color);
		font-weight: bold;
		margin: 0;
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
		margin-bottom: var(--size-3);
	}

	.card__tags {
		display: flex;
		flex-wrap: wrap;
		gap: 0.4rem;
		margin-bottom: var(--size-3);
		list-style: none;
		padding: 0;
	}

	.card__tag {
		font-size: 0.75rem;
		background: rgba(0, 0, 0, 0.1);
		color: var(--txt-color);
		padding: 0.25rem 0.5rem;
		border-radius: 10px;
		white-space: nowrap;
	}
</style>