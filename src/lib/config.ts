import { dev } from '$app/environment'

export const title = 'We Love Web'

export const navLinks = [
  { href: '/', label: 'Home', external: false },
  { href: '/issues', label: 'Lezingen', external: false },
  { href: '/about', label: 'Over', external: false },
  { href: '/contact', label: 'Contact', external: false },
  { href: '/rss.xml', label: 'RSS', external: true }
];
export const description = 'SvelteKit blog about guest speakers at FDND'
export const url = dev ? 'http://localhost:5173/' : 'https://joyofcode.xyz/'