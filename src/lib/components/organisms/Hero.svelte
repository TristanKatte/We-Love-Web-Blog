<script lang="ts">
	import { onMount } from 'svelte';
	import { gsap } from 'gsap';
	import HeroContent from '$lib/components/molecules/HeroContent.svelte';
	import HeroVisual from '$lib/components/molecules/HeroVisual.svelte';

	onMount(() => {
		const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
		const isMobile = window.matchMedia('(max-width: 768px)').matches;

		if (prefersReducedMotion || isMobile) return;

		gsap.from('.hero-left', {
			x: -50,
			opacity: 0,
			duration: 1,
			ease: 'power2.out'
		});
	});
</script>

<section class="hero" aria-label="Introductie">
	<section class="hero-left">
		<HeroContent />
	</section>

	<section class="hero-right">
		<HeroVisual />
	</section>
</section>

<style>
	.hero {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		padding: 3rem 2rem;
		gap: 2rem;
		text-align: left;
		width: 100%; 
	}

	.hero-left,
	.hero-right {
		width: 100%;
		max-width: 800px;
	}

	.hero-right,
	.hero-left {
		display: flex;
		justify-content: center;
		width: 100%;
		text-align: left;
	}

	@media (min-width: 768px) {
		.hero {
			padding: 3rem 2rem;
			gap: 3rem;
		}
	}

	@media (min-width: 1024px) {
		.hero {
			flex-direction: row;
			align-items: center;
			justify-content: space-between;
			height: 100vh;
			padding: 4rem 2rem;
			text-align: left;
		}

		.hero-left,
		.hero-right {
			max-width: none;
			flex: 1;
		}
	}

	@media (max-width: 480px) {
		.hero {
			padding: 1.5rem 1rem;
			gap: 1.5rem;
		}

		
		
		.hero-left {
			width: 100%;
			max-width: 100%;
			display: flex;
			justify-content: center;
			text-align: left;
		}

		.hero-right {
			display: none;
		}
	}
</style>