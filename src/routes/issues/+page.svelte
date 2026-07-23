<script lang="ts">
  import { onMount } from 'svelte';
  import { fade, fly } from 'svelte/transition';
  import { flip } from 'svelte/animate';
  import { formatDate } from '$lib/utils';
  import type { Post } from '$lib/types';
  import Button from '$lib/components/atoms/Button.svelte';
  import { ArrowRight } from 'lucide-svelte';

  export let data: {
    posts?: Post[];
    allPosts?: Post[];
    selectedCategories?: string[];
  };

  // Safely fallback to empty array/set
  let posts: Post[] = data.allPosts ?? data.posts ?? [];
  let selected = new Set(data.selectedCategories ?? []);

  // Compute all categories from all posts, dropping any category present on
  // every post — a tag that never excludes a post can't act as a filter.
  let allCategories = new Set<string>();
  posts.forEach(p => p.categories?.forEach(c => allCategories.add(c)));
  const meaningfulCategories = Array.from(allCategories).filter(
    cat => posts.filter(p => p.categories?.includes(cat)).length < posts.length
  );
  allCategories = new Set(meaningfulCategories.sort());

  // JavaScript enhancement flag
  let jsEnabled = false;
  onMount(() => {
    jsEnabled = true;
  });

  // Reactive filtered posts
  let filteredPosts = data.posts ?? [];

  $: if (jsEnabled) {
    filteredPosts = selected.size
      ? posts.filter(post =>
          post.categories?.some(cat => selected.has(cat))
        )
      : posts;
  }

  // Debounced URL update
  let timeout: ReturnType<typeof setTimeout>;

  function updateURL() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      const params = new URLSearchParams();
      if (selected.size > 0) {
        params.set('categories', Array.from(selected).join(','));
      }
      const newUrl = `${window.location.pathname}${params.toString() ? '?' + params.toString() : ''}`;
      history.replaceState(null, '', newUrl);
    }, 150);
  }

  function toggleCategory(category: string) {
    selected = selected.has(category)
      ? new Set([...selected].filter(c => c !== category))
      : new Set([...selected, category]);
    updateURL();
  }

  function clearCategories() {
    selected = new Set();
    updateURL();
  }
</script>

<svelte:head>
  <title>Lezingen</title>
  <meta name="description" content="Issues" />
</svelte:head>

<noscript>
  <p style="color: red; padding: 1rem;">
    JavaScript is uitgeschakeld. Filtering werkt nog, maar voelt minder snel aan.
  </p>
</noscript>

<!-- Category Filters -->
<section class="category-filters" aria-label="Filter posts by category">
  <div class="filter-scroll">
    {#if jsEnabled}
      <button
        on:click={clearCategories}
        class:selected={selected.size === 0}
        type="button"
        aria-pressed={selected.size === 0}
        in:fly={{ y: 8, duration: 250 }}
      >
        Alle categorieën
      </button>
    {:else}
      <a href="?" class:selected={selected.size === 0}>Alle categorieën</a>
    {/if}

    {#each Array.from(allCategories) as category, i (category)}
      {#if jsEnabled}
        <button
          on:click={() => toggleCategory(category)}
          class:selected={selected.has(category)}
          type="button"
          aria-pressed={selected.has(category)}
          in:fly={{ y: 8, duration: 250, delay: 40 + i * 30 }}
        >
          {category}
        </button>
      {:else}
        <a
          href={`?categories=${category}`}
          class:selected={selected.has(category)}
        >
          {category}
        </a>
      {/if}
    {/each}
  </div>
</section>

<!-- Posts -->
<section class="container" aria-labelledby="posts-heading">
  <h2 id="posts-heading">Alle lezingen</h2>

  {#if filteredPosts.length === 0}
    <p>Geen resultaten gevonden voor de geselecteerde categorieën.</p>
  {:else}
    <section class="cards" aria-label="Posts">
      {#each filteredPosts as post, i (post.slug)}
        <article
          class="post"
          aria-labelledby={`post-title-${i}`}
          animate:flip={{ duration: 250 }}
          in:fade={{ duration: 200, delay: i * 30 }}
          out:fade={{ duration: 150 }}
        >
          {#if post.image}
            <img
              class="thumb"
              src={`/images/${post.image}`}
              alt=""
              width="400"
              height="200"
              loading="lazy"
              style={`view-transition-name: issue-image-${post.slug};`}
            />
          {:else}
            <div class="thumb fallback" aria-hidden="true"></div>
          {/if}

          <header>
            <h3
              class="title"
              id={`post-title-${i}`}
              style={`view-transition-name: issue-title-${post.slug};`}
            >{post.title}</h3>
            <time class="date" datetime={post.date}>
              {formatDate(post.date, 'long', 'nl-NL')}
            </time>
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
  #posts-heading {
  padding-left: var(--size-5);
  padding-right: var(--size-5);
  color: var(--btn-color);
}
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

  .filter-scroll button,
  .filter-scroll a {
    scroll-snap-align: start;
    white-space: nowrap;
    padding: 0.4rem 0.9rem;
    font-size: 0.9rem;
    background-color: var(--project-card-color);
    border: 1px solid var(--btn-color);
    border-radius: 9999px;
    cursor: pointer;
    transition: background 0.2s, color 0.2s, transform 0.15s ease;
    text-decoration: none;
  }

  .filter-scroll button:hover,
  .filter-scroll a:hover {
    background-color: var(--btn-color);
    color: white;
    transform: translateY(-2px);
  }

  .filter-scroll button:active {
    transform: scale(0.94);
  }

  .filter-scroll .selected,
  .filter-scroll [aria-pressed="true"] {
    background-color: var(--btn-color);
    color: white;
    transform: scale(1.06);
  }

  /* Cards Layout */
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
    background: var(--project-card-color);
    border: 6px solid var(--btn-color);
    border-radius: 8px;
    padding: var(--size-5);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    transition: transform 0.2s ease;
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
    font-weight: bold;
    margin: 0;
    color: var(--heading-color);
  }

  .date {
    color: var(--strong-color);
    font-size: 0.9rem;
    margin-top: var(--size-2);
  }

  .description {
    margin-top: var(--size-3);
    margin-bottom: var(--size-3);
    color: var(--txt-color);
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
    font-size: 0.85rem;
    background: rgba(0, 0, 0, 0.1);
    padding: 0.45rem 0.65rem;
    border-radius: 10px;
    border: 1px solid var(--btn-color);
    color: var(--txt-color);
    font-family: 'numans', sans-serif;
    font-weight: 600;
  }
</style>
