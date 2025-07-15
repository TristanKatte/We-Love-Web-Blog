<script>
  export let size = 'base'; // base, small, large
</script>

<p class={`text ${size}`}>
  <slot />
</p>

<style>
  .text {
    /* default size */
    font-size: clamp(1rem, 1.5vw + 0.5rem, 1.5rem);
  }

  .text.small {
    font-size: clamp(0.875rem, 1vw + 0.3rem, 1.1rem);
  }

  .text.large {
    font-size: clamp(1.25rem, 2vw + 0.5rem, 2rem);
  }
</style>