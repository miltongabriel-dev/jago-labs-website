# JAGO Labs website

Responsive HTML/CSS/JS implementation of the JAGO Labs dark website, with a client-side
Portuguese / English / Spanish language switcher.

Domain: `jagolabs.tech` · Contact: `info@jagolabs.tech`

## Pages
- `index.html` — homepage
- `about.html` — company story ("Sobre a JAGO Labs")
- `whats-next.html` — upcoming products roadmap ("O que vem a seguir")
- `impact.html` — 10%-of-revenue Amazon conservation commitment ("Nosso impacto"), teased on the homepage
- `globiloo/index.html` — Globiloo's privacy policy (the kids' game), at `jagolabs.tech/globiloo/`: the URL given to
  Google Play and the App Store, so keep it live and keep it in step with the policy inside the game
  (`public/privacidade.html` in the game's repository)

## Files
- `styles.css` — shared responsive styling for all pages
- `script.js` — mobile nav, active-section highlighting, contact modal, popup links
- `i18n.js` — PT/EN/ES dictionaries and the language switcher logic
- `robots.txt`, `sitemap.xml` — SEO plumbing for jagolabs.tech (includes all 3 pages)
- `assets/jago-logo.png`, `assets/jago-logo_white.png`, `assets/jago-symbol.png` — JAGO Labs brand
- `assets/curumim-icon.png` — real Curumim app icon
- `assets/beeaware-symbol.svg` / `assets/beeaware-symbol.png` — real BeeAware symbol
- `assets/globiloo-icon.png` — Globiloo's app icon (192 px), shown on its privacy page
- `jagolabs-sobre.md`, `jagolabs-sobre-v2.md`, `jagolabs-o-que-vem-a-seguir.md`, `jagolabs-10-porcento-amazonia.md` — source
  copy for the About/roadmap/impact pages. **Not meant to be deployed** — keep these out of the folder you upload to
  hosting (see below).

## Language switching
- A PT/EN/ES pill selector sits in the header nav (desktop and mobile), on every page.
- Language is detected on load in this order: `?lang=` query param → `localStorage` → browser
  language → falls back to English.
- Choosing a language updates the page text, `<html lang>`, the document title/meta description,
  persists to `localStorage`, and reflects in the URL as `?lang=xx` so links stay shareable.
- To add or edit copy, add a `data-i18n="key"` attribute to the HTML and add the matching key to
  all three dictionaries in `i18n.js`. `i18n.js` renders values as HTML (not plain text), so
  `<strong>`/`<br>`/`<ul>` inside a dictionary string work — but never feed it user input.

## Contact form
- "Contact" (nav, footer, and CTA buttons) opens a modal with Name / Email or phone / Message.
- Submitting builds a pre-filled `mailto:info@jagolabs.tech` link and hands off to the visitor's
  email client — there is no backend, so nothing is stored or sent automatically. If you want
  actual form delivery without relying on the visitor having a mail client configured, swap this
  for a form backend (e.g. Formspree) in `script.js`'s `contactForm` submit handler.

## Run locally
```bash
python3 -m http.server 8080
```
Then visit `http://localhost:8080`.

## Before launch
1. **Hosting + DNS** — point `jagolabs.tech` at whatever static host you choose (Vercel, Netlify,
   Cloudflare Pages, GitHub Pages, etc.) and confirm HTTPS is issued. Not yet configured here.
2. **`info@jagolabs.tech` mailbox** — confirm it actually exists and is monitored (Google
   Workspace, Zoho Mail, etc.) before relying on the contact modal.
3. **Don't deploy the two `.md` source files** or this `README.md` to the public web root —
   upload only the HTML/CSS/JS/assets/robots/sitemap files.
4. Replace the CSS phone mockups on the homepage with real Curumim/BeeAware screenshots when ready.
5. Consider a privacy policy page — not strictly required today since the site has no analytics
   and the contact form only opens the visitor's own email client (nothing is stored server-side),
   but expected by many visitors regardless.
6. Only tested in Chromium so far — spot-check Safari and Firefox before launch, particularly the
   contact modal and the Curumim/BeeAware popup-window links in `script.js`.
7. Unused asset `assets/jago-logo.png` (dark-on-light variant) isn't referenced anywhere — safe to
   delete or keep for future use.

## Resolved in this pass
- Removed the "Blog" and "Careers" nav links (header + footer, all pages) — they pointed to
  `#blog` / `#careers` anchors that never existed. Add them back once those pages exist.
- Removed the placeholder footer social icons (LinkedIn/X/Instagram all linked to `#` — the
  accounts don't exist yet). Add them back once the real profiles are live.
- Added a proper square favicon (`assets/favicon.png`, 64×64, navy-backed) and apple-touch-icon
  (`assets/apple-touch-icon.png`, 180×180, solid navy background per Apple's guidance on
  transparency) — replacing the non-square 721×566 `jago-symbol.png` that was doing double duty.
- Added a dedicated 1200×630 Open Graph / Twitter share image (`assets/jago-og-image.jpg`) —
  brand glow + logo, generated to match the site's look — replacing the stretched 2200×700
  wordmark that was being used as the share image before.
