# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project

SvelteKit blog ("We Love Web") documenting guest lectures at FDND. Content is written in Dutch. Deployed to Vercel.

## Commands

```bash
npm run dev            # start dev server (vite dev)
npm run build           # production build
npm run preview         # preview production build
npm run check            # svelte-kit sync + svelte-check (type checking)
npm run check:watch      # type checking in watch mode
npm run format            # prettier --write .
npm run lint                # prettier --check . && eslint .
```

There is no test runner configured in this repo — `check` and `lint` are the available verification commands.

## Architecture

### Content pipeline (the core of this app)

Blog posts are Markdown files with frontmatter, compiled via **mdsvex** — there is no CMS or database.

- Posts live in `src/lib/content/issues/*.md`. Frontmatter shape is defined by the `Post` type in `src/lib/types.ts` (`title`, `date`, `description`, `image?`, `tags?`, `slug`, `published`, `categories?`). `slug` is derived from the filename, not stored in frontmatter.
- Every markdown file is wrapped in the layout at `src/mdsvex.svelte`, which re-exports the custom `img` component (`src/lib/components/custom/img.svelte`) into markdown scope — use `<img>` in post content and it resolves to that component automatically (see `svelte.config.js` mdsvex `layout` option).
- mdsvex config (`svelte.config.js`) wires in `remark-toc` (table of contents) and `rehype-slug` (heading anchors), plus a Shiki-based syntax highlighter (`poimandres` theme, JS/TS only — add languages to the `langs` array if a post needs another one).
- `src/routes/api/posts/+server.ts` is the single source of truth for reading/parsing all posts: it globs `src/lib/content/issues/*.md` with `import.meta.glob(..., { eager: true })`, filters `published !== false`, and sorts by `date` descending. Other routes/loaders (`+layout.ts`, `+page.server.ts`, `src/routes/issues/+page.ts`, `src/routes/rss.xml/+server.ts`) fetch from `/api/posts` rather than re-globbing — follow this pattern instead of duplicating glob logic when adding new post-listing features.
- `src/routes/issues/[slug]/+page.ts` loads a single post directly via dynamic `import()` of the matching `.md` file (404s on failure) rather than going through the API.
- `src/lib/content/issues/index.js` is stale/unused boilerplate (references non-existent `page-01.md` etc.) — don't treat it as the real content index.
- New post checklist: add a `.md` file to `src/lib/content/issues/` with valid frontmatter, set `published: true`, and drop any referenced image into `static/images/`.

### Component structure — Atomic Design

`src/lib/components/` is organized as `atoms/` → `molecules/` → `organisms/`:
- `atoms/`: `Button.svelte`, `Heading.svelte`, `Text.svelte`
- `molecules/`: `HeroContent.svelte`, `HeroVisual.svelte`
- `organisms/`: `Header.svelte`, `Footer.svelte`, `Hero.svelte`
- `custom/`: components injected into markdown rendering scope (currently just `img.svelte`, exported via `custom/index.ts`)

Follow this tier convention when adding components: single-purpose primitives go in `atoms`, compositions of atoms go in `molecules`, page-level sections go in `organisms`.

### Routing/data flow

- `src/routes/+layout.ts` (runs with `prerender = true`) fetches `/api/posts` and exposes the most recent post as `featuredPost` to the whole app (used by `Header`).
- `src/routes/+page.server.ts` also fetches `/api/posts` for the homepage.
- `src/routes/issues/+page.ts` re-globs and filters posts independently for the listing page (duplicates the `/api/posts` logic rather than calling it — be aware both code paths exist).
- `src/routes/rss.xml/+server.ts` builds the RSS feed from `/api/posts`, using `src/lib/config.ts` (site `title`, `description`, `url`) for feed metadata.

### Path aliases

Defined in `svelte.config.js` `kit.alias` (in addition to SvelteKit's built-in `$lib`):
- `$components` → `src/components` (note: this directory does not currently exist; actual components live under `$lib/components`)
- `$content` → `src/lib/content`

### Styling

Global styles/design tokens come from `open-props` (`open-props/style`, `open-props/normalize`, `open-props/buttons`, imported in `src/routes/+layout.svelte`) plus `src/app.css`. CSS custom properties for the theme (`--main-bg-color`, `--btn-color`, `--txt-color`, `--heading-color`, etc.) are set as globals in `+layout.svelte`. Page transitions use the View Transitions API (`document.startViewTransition`, guarded by a feature check) wired through `onNavigate` in `+layout.svelte`.

### Formatting

Prettier config: tabs, single quotes, no trailing commas, 100 print width, `prettier-plugin-svelte` for `.svelte` files. Run `npm run format` before committing; `npm run lint` checks both Prettier and ESLint.
