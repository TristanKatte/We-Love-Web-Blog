<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import { title as siteTitle, navLinks } from '$lib/config';
	import { getLatestPost } from '$lib/utils';
	import type { Post } from '$lib/types';

	let navOpen = false;
	export let featuredPost: Post | null;

	onMount(async () => {
		featuredPost = await getLatestPost();
	});

	function navigateTo(href: string) {
		navOpen = false;
		goto(href);
	}
</script>

<header class="neon-header">
	<section class="top-bar">
		<a href="/"><h1 class="site-title">{siteTitle}</h1></a>

		<button
			class="nav-toggle"
			on:click={() => (navOpen = !navOpen)}
			aria-label="Menu"
			aria-expanded={navOpen}
			aria-controls="main-nav"
		>
			☰
		</button>

		<nav id="main-nav" class={`main-nav ${navOpen ? 'open' : ''}`} aria-label="Primary Navigation">
			{#each navLinks as link}
				<a
					href={link.href}
					class="nav-link"
					target={link.external ? '_blank' : null}
					rel={link.external ? 'noopener noreferrer' : null}
					on:click={(event) => {
						if (!link.external) {
							event.preventDefault();
							navigateTo(link.href);
						} else {
							navOpen = false;
						}
					}}
				>
					{link.label}
				</a>
			{/each}
		</nav>
	</section>
	{#if featuredPost}
		<section class="featured-post">
			<h2 class="featured-title">
				<a href={`/issues/${featuredPost.slug}`}>{featuredPost.title}</a>
			</h2>
			<p class="featured-summary">{featuredPost.description}</p>
		</section>
	{/if}
</header>

<style>
	a {
		text-decoration: none;
	}

	.neon-header {
		z-index: 9999;
		position: relative;
		background: transparent;
		color: var(--txt-color);
		font-family: 'Orbitron', 'Segoe UI', sans-serif;
		padding: 2rem 1rem;
		margin: 0;
		overflow-x: hidden;
		animation: shrink;
		animation-timeline: scroll();
		animation-duration: 5ms;
		animation-range: 0px 300px;
	}

	.top-bar {
		display: flex;
		justify-content: space-between;
		align-items: center;
		border-bottom: 2px solid var(--heading-color);
		padding-bottom: 1rem;
	}

	.site-title {
		font-weight: 700;
		color: var(--heading-color);
		text-shadow: 0 0 10px var(--btn-color);
		font-size: clamp(1.5rem, 5vw, 2.5rem);
		white-space: nowrap;
		margin-left: 2.2rem;
	}

	.site-title:focus-visible {
		outline: 2px solid var(--btn-color);
		outline-offset: 8px;
		border-radius: 4px;
	}

	.nav-toggle {
		display: none;
		font-size: 2rem;
		color: var(--btn-color);
		background-color: var(--cyan-12);
		border: none;
		cursor: pointer;
		z-index: 10000;
	}

	.main-nav {
		display: flex;
		gap: 2.5rem;
	}

	.nav-link {
		text-transform: uppercase;
		font-weight: 600;
		font-size: 1rem;
		color: var(--txt-color);
		text-decoration: none;
		position: relative;
		transition: all 0.3s ease;
		flex-shrink: 1;
		min-width: 0;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.nav-link::after {
		content: '';
		position: absolute;
		bottom: -4px;
		left: 0;
		width: 100%;
		height: 2px;
		background: var(--btn-color);
		transform: scaleX(0);
		transition: transform 0.3s ease;
		transform-origin: right;
	}

	.nav-link:hover::after {
		transform: scaleX(1);
		transform-origin: left;
	}

	.nav-link:focus-visible {
		outline: 2px solid var(--btn-color);
		outline-offset: 8px;
		border-radius: 4px;
	}

	.featured-post {
		margin-top: 2rem;
		background: rgba(0, 173, 181, 0.05);
		border-left: 4px solid var(--btn-color);
		padding: 1rem 1.5rem;
		backdrop-filter: blur(4px);
		-webkit-backdrop-filter: blur(4px);
		border-radius: 4px;
		animation-name: shrink-featured;
		animation-timeline: scroll();
		animation-duration: 1ms;
		animation-range: 0px 500px;
	}

	.featured-post h2 {
		color: var(--strong-color);
		font-size: 1.5rem;
		font-weight: bold;
		margin-bottom: 0.5rem;
		text-shadow: 0 0 6px var(--btn-color);
	}

	.featured-post p {
		font-style: italic;
		color: var(--txt-color);
	}

	@keyframes shrink {
		from {
			height: 450px;
		}
		to {
			height: 60px;
		}
	}

	@keyframes shrink-featured {
		from {
			opacity: 1;
		}
		to {
			opacity: 0;
		}
	}

	@media (max-width: 768px) {
		.top-bar {
			flex-direction: row;
			justify-content: space-between;
			align-items: center;
			gap: 1rem;
		}

		.nav-toggle {
			display: block;
		}

		.main-nav {
			position: fixed;
			top: 0;
			left: 0;
			right: 0;
			width: 100vw;
			height: 75vh;
			background: var(--gray-12);
			flex-direction: column;
			display: none;
			padding: 4rem 1rem 2rem;
			border-top: 2px solid var(--btn-color);
			box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
			z-index: 9998; 
		}

	.main-nav.open {
	display: flex;
}

		.nav-link {
			font-size: 1.2rem;
			padding: 0.5rem 0;
		}
	}
</style>
