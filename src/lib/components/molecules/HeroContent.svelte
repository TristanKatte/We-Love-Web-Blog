<script>
  import Heading from '$lib/components/atoms/Heading.svelte';
  import Text from '$lib/components/atoms/Text.svelte';
  import Button from '$lib/components/atoms/Button.svelte';
</script>

<section class="hero-content">
  <Heading level={1}>Hi, Welkom bij mijn We Love Web Blog</Heading>
  <Text>Gesprekken met de makers, denkers en doeners achter de digitale wereld. Duik in de inzichten van de gastsprekers van FDND – waar onderwijs en praktijkervaring samenkomen.</Text>
  <Button size="medium" href="#posts" aria-label="Bekijk alle blogposts">Recente posts</Button>
  
</section>

<style>
  .hero-content {
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
    width: 75%;
  }
</style>