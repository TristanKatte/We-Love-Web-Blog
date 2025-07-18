<script>
  // data of logic kan hier als nodig
</script>

<svelte:head>
	<title>Over</title>
	<meta name="description" content="About" />
</svelte:head>


  <article class="about-me">
    <header>
      <h2>Over Mij</h2>
    </header>

    <section>
      <p>
        Hallo! Ik ben Tristan, een enthousiaste webontwikkelaar/frontend developer gespecialiseerd in toegankelijke, performante en moderne webapplicaties.
      </p>
      <p>
        Mijn passie ligt bij het bouwen van gebruiksvriendelijke websites die voor iedereen toegankelijk zijn.
      </p>
      <p>
        Als je meer wilt weten,neem dan een kijkje op mijn portfolio.
      </p>
    </section>
  </article>


<style>
  /* Styles hetzelfde als eerder, mobile-first */
.about-me {
    padding: 1rem;
    max-width: 600px;
    margin-inline: auto;
    font-family: Numans, sans-serif;
    color: var(--txt-color);
    line-height: 1.6;
  }

  h2 {
    margin-bottom: 0.75rem;
    color: var(--heading-color);
  }

  p {
    margin-bottom: 1rem;
  }

  @media (min-width: 600px) {
    .about-me {
      padding: 2rem;
      font-size: 1.125rem;
    }
  }
</style>