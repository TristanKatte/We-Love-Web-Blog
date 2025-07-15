<script>
  export let level = 1;
</script>

<svelte:element this={`h${level}`} class="heading">
  <slot />
</svelte:element>

<style>
  .heading {
    font-size: 2.5rem;
    color: var(--heading-color, #00adb5);
    font-family: 'Cantarell', sans-serif;
    font-weight: 700;
  }
</style>