<script>
// @ts-nocheck

	

  export let footerTitle = 'We Love Web';
  export const author = 'Tristan Katte';

  
  export let footerLinks = [
    { label: 'Home', href: '/' },
    { label: 'Lezingen', href: '/issues' },
    { label: 'Over', href: '/about' },
    { label: 'Contact', href: '/contact' }
  ];
</script>

<footer class="neon-footer" aria-label="Footer">
  <div class="footer-container">
    <nav class="footer-nav" aria-label="Footer Navigation">
      <ul>
        {#each footerLinks as link}
          <li>
            <a 
              href={link.href}
              target={link.external ? "_blank" : null}
              rel={link.external ? "noopener noreferrer" : null}
            >
              {link.label}
            </a>
          </li>
        {/each}
      </ul>
    </nav>

    <address class="footer-copy" role="contentinfo">
      &copy; {new Date().getFullYear()} {author}'s {footerTitle}. All rights reserved.
    </address>
  </div>
</footer>

<style>
.neon-footer {
  width: 100%;
  background: transparent;
  color: var(--txt-color);
  font-family: 'Orbitron', 'Segoe UI', sans-serif;
  padding: 2rem 1rem;
  border-top: 2px solid var(--btn-color);
  text-align: center;
}

.footer-container {
  max-width: 960px;
  margin: 0 auto;
}

.footer-nav ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1.5rem;
}

.footer-nav a {
  color: var(--txt-color);
  text-decoration: none;
  font-weight: 500;
  transition: color 0.3s ease;
}

.footer-nav a:hover,
.footer-nav a:focus {
  color: var(--btn-color);
  text-decoration: underline;
}

.footer-copy {
  font-style: normal;
  font-size: 0.9rem;
  opacity: 0.7;
}

@media (max-width: 600px) {
  .footer-nav ul {
    flex-direction: column;
    gap: 0.8rem;
  }
}
</style>