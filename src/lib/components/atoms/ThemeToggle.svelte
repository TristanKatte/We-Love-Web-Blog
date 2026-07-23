<script lang="ts">
	import { onMount } from 'svelte';
	import { scale } from 'svelte/transition';
	import { Sun, Moon } from 'lucide-svelte';

	let theme: 'dark' | 'light' = 'dark';

	onMount(() => {
		const current = document.documentElement.getAttribute('color-scheme');
		theme = current === 'light' ? 'light' : 'dark';
	});

	function toggleTheme() {
		theme = theme === 'dark' ? 'light' : 'dark';
		document.documentElement.setAttribute('color-scheme', theme);
		localStorage.setItem('theme', theme);
	}
</script>

<button
	type="button"
	class="theme-toggle"
	class:is-light={theme === 'light'}
	on:click={toggleTheme}
	aria-pressed={theme === 'light'}
	aria-label={theme === 'dark' ? 'Schakel naar lichte modus' : 'Schakel naar donkere modus'}
>
	<span class="track-icon sun" aria-hidden="true"><Sun size="14" /></span>
	<span class="track-icon moon" aria-hidden="true"><Moon size="14" /></span>

	<span class="thumb">
		{#key theme}
			<span class="thumb-icon" in:scale={{ duration: 220, start: 0.4, opacity: 0 }}>
				{#if theme === 'light'}
					<Sun size="14" />
				{:else}
					<Moon size="14" />
				{/if}
			</span>
		{/key}
	</span>
</button>

<style>
	.theme-toggle {
		position: relative;
		display: inline-flex;
		align-items: center;
		justify-content: space-between;
		width: 3.75rem;
		height: 2rem;
		padding: 0.25rem;
		color: var(--btn-color);
		background: var(--project-card-color);
		border: 2px solid var(--btn-color);
		border-radius: 9999px;
		cursor: pointer;
		transition:
			background 0.2s ease,
			border-color 0.2s ease,
			transform 0.15s ease;
	}

	.theme-toggle:hover {
		transform: translateY(-2px);
	}

	.theme-toggle:active .thumb {
		transform: scale(0.9);
	}

	.theme-toggle.is-light:active .thumb {
		transform: translateX(1.75rem) scale(0.9);
	}

	.theme-toggle:focus-visible {
		outline: 2px solid var(--btn-color);
		outline-offset: 4px;
	}

	.track-icon {
		position: relative;
		z-index: 1;
		display: inline-flex;
		align-items: center;
		justify-content: center;
		width: 1.5rem;
		opacity: 0.35;
		transition: opacity 0.3s ease;
	}

	.theme-toggle:not(.is-light) .track-icon.moon {
		opacity: 1;
	}

	.theme-toggle.is-light .track-icon.sun {
		opacity: 1;
	}

	.thumb {
		position: absolute;
		top: 2px;
		left: 2px;
		display: grid;
		place-items: center;
		width: 1.5rem;
		height: 1.5rem;
		color: var(--project-card-color);
		background: var(--btn-color);
		border-radius: 50%;
		box-shadow: 0 0 6px var(--btn-color);
		transition: transform 0.35s cubic-bezier(0.4, 0, 0.2, 1);
		transform: translateX(0);
	}

	.theme-toggle.is-light .thumb {
		transform: translateX(1.75rem);
	}

	.thumb-icon {
		display: grid;
		place-items: center;
	}

	@media (prefers-reduced-motion: reduce) {
		.thumb {
			transition: none;
		}
	}
</style>
