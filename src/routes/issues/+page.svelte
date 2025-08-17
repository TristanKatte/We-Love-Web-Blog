<script lang="ts">
  import { goto } from '$app/navigation';
  import Button from '$lib/components/atoms/Button.svelte';
  import { ArrowRight } from 'lucide-svelte';
  import { formatDate } from '$lib/utils';
  import type { Post } from '$lib/types';

  export let data: {
    posts: Post[]
  };

  let { posts } = data;

  // All categories collected from all posts
  let allCategories = new Set<string>();
  posts.forEach(post => {
    post.categories?.forEach(cat => allCategories.add(cat));
  });
  allCategories = new Set(Array.from(allCategories).sort());

  // Selected categories, init empty = show all
  let selected = new Set<string>();

  // On page load, read URL query params for categories to pre-select them
  if (typeof window !== 'undefined') {
    const params = new URLSearchParams(window.location.search);
    const catParam = params.get('categories');
    if (catParam) {
      selected = new Set(catParam.split(',').map(c => c.trim()));
    }
  }

  function toggleCategory(category: string) {
    if (selected.has(category)) {
      selected.delete(category);
    } else {
      selected.add(category);
    }
    updateURL();
  }

  function clearCategories() {
    selected.clear();
    updateURL();
  }

  function updateURL() {
    const params = new URLSearchParams();

    if (selected.size > 0) {
      params.set('categories', Array.from(selected).join(','));
    }

    goto(`?${params.toString()}`, {
      replaceState: true,
      noScroll: true,
      keepFocus: true
    });
  }

  // Filter posts on client based on selected categories
  $: filteredPosts = selected.size
    ? posts.filter(post => post.categories?.some(cat => selected.has(cat)))
    : posts;
</script>


<svelte:head>
  <title>Lezingen</title>
  <meta name="description" content="Issues" />
</svelte:head>

<!-- Category Filters -->
<section class="category-filters" aria-label="Filter posts by category">
  <div class="filter-scroll">
    <button
      on:click={clearCategories}
      class:selected={selected.size === 0}
      type="button"
      aria-pressed={selected.size === 0}
    >
      Alle categorieën
    </button>

    {#each Array.from(allCategories) as category}
      <button
        on:click={() => toggleCategory(category)}
        class:selected={selected.has(category)}
        type="button"
        aria-pressed={selected.has(category)}
      >
        {category}
      </button>
    {/each}
  </div>
</section>

<!-- Posts Grid -->
<section class="container" aria-labelledby="posts-heading">
  <h2 id="posts-heading">Alle lezingen</h2>

  {#if filteredPosts.length === 0}
    <p>Geen resultaten gevonden voor de geselecteerde categorieën.</p>
  {:else}
    <section class="cards" aria-label="Posts">
      {#each filteredPosts as post, i}
        <article class="post" aria-labelledby={`post-title-${i}`}>
          {#if post.image}
            <img
              class="thumb"
              src={`/images/${post.image}`}
              alt=""
              width="400"
              height="200"
              loading="lazy"
              style="view-transition-name: post-image-{post.slug}"
            />
          {:else}
            <div class="thumb fallback" aria-hidden="true"></div>
          {/if}

          <header>
            <h3
              class="title"
              id={`post-title-${i}`}
              style="view-transition-name: post-title-{post.slug}"
            >
              {post.title}
            </h3>
            <time class="date" datetime={post.date}>{formatDate(post.date, 'long', 'nl-NL')}</time>
          </header>

          <p class="description">{post.description}</p>

          {#if post.categories?.length}
            <ul class="card__tags" aria-label="Categories">
              {#each post.categories as cat}
                <li class="card__tag">{cat}</li>
              {/each}
            </ul>
          {/if}

          <Button
            href={`/issues/${post.slug}`}
            data-sveltekit-view-transition
            size="small"
            icon={ArrowRight}
            aria-label={`Bekijk ${post.title}`}
          >
            Lees meer
          </Button>
        </article>
      {/each}
    </section>
  {/if}
</section>

<style>
  /* Category Filters */
  .category-filters {
    padding: var(--size-5);
    overflow-x: auto;
  }

  .filter-scroll {
    display: flex;
    gap: 0.5rem;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    padding-bottom: 1rem;
  }

  .filter-scroll button {
    scroll-snap-align: start;
    white-space: nowrap;
    padding: 0.4rem 0.9rem;
    font-size: 0.9rem;
    background-color: var(--project-card-color);
    border: 1px solid var(--btn-color);
    border-radius: 9999px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s;
  }

  .filter-scroll button:hover {
    background-color: var(--btn-color);
    color: white;
  }

  .filter-scroll button.selected,
  .filter-scroll button[aria-pressed="true"] {
    background-color: var(--btn-color);
    color: white;
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
    justify-content: space-between;
    background: var(--project-card-color);
    border: 6px solid var(--btn-color);
    border-radius: 8px;
    padding: var(--size-5);
    min-height: 100%;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
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
    border: 1px solid var(--btn-color);
  }
</style>
