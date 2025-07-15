<script lang="ts">
  import { ArrowDown } from 'lucide-svelte';
  import type { ComponentType } from 'svelte';

  export let href = '#';
  export let size: 'small' | 'medium' | 'large' | null = null;
  export let icon: ComponentType = ArrowDown;
</script>

<a
  href={href}
  class="button responsive {size}"
  {...$$restProps}  
>
  <span class="text">
    <slot />
  </span>
  <span class="icon-wrapper" aria-hidden="true">
    <svelte:component this={icon} size="24" />
  </span>
</a>

<style>
.button {
	display: inline-flex;
	align-items: center;
	gap: 0.5rem;
	justify-content: center;
	font-family: 'cantarell', 'Segoe UI', sans-serif;
	text-transform: uppercase;
	color: var(--btn-color);
	background: transparent;
	border: 2px solid var(--btn-color);
	border-radius: 8px;
	text-shadow: 0 0 5px var(--btn-color);
	box-shadow:
		0 0 5px var(--btn-color),
		0 0 10px var(--btn-color),
		inset 0 0 5px var(--btn-color);
	cursor: pointer;
	transition: all 0.3s ease;
	position: relative;
	overflow: hidden;
	text-decoration: none;
	font-weight: 600;
}

.button:hover {
	background: var(--btn-color);
	color: rgb(199, 199, 199);
	text-shadow: none;
	box-shadow:
		0 0 10px var(--btn-color),
		0 0 20px var(--btn-color),
		inset 0 0 10px white;
}

.button:focus {
	outline: 2px dashed var(--btn-color);
	outline-offset: 4px;
}

.button.responsive:not(.small):not(.medium):not(.large) {
	padding: 0.4rem 1rem;
	font-size: 0.85rem;
}
@media (min-width: 640px) {
	.button.responsive:not(.small):not(.medium):not(.large) {
		padding: 0.75rem 1.5rem;
		font-size: 1rem;
	}
}
@media (min-width: 1024px) {
	.button.responsive:not(.small):not(.medium):not(.large) {
		padding: 1rem 2rem;
		font-size: 1.25rem;
	}
}

.button.small {
	padding: 0.4rem 1rem;
	font-size: 0.85rem;
}
.button.medium {
	padding: 0.75rem 1.5rem;
	font-size: 1rem;
}
.button.large {
	padding: 1rem 2rem;
	font-size: 1.25rem;
}

.icon-wrapper {
	display: inline-flex;
	align-items: center;
	transition: transform 0.3s ease, filter 0.3s ease;
}

.button:hover .icon-wrapper {
	transform: translateX(0.25rem) scale(1.05);
	filter: drop-shadow(0 0 6px white);
}
</style>