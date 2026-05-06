# Wedding Invitation (Vite + React + Tailwind)

High-end, mobile-first, bilingual (EN/AR) digital wedding invitation inspired by the provided logo + floral bar design.

## Run locally

```bash
cd wedding-invite
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## Deploy to GitHub Pages

- Push the project to a GitHub repository.
- In repository settings, set `Pages` source to `GitHub Actions`.
- Push to `main` and the workflow at `.github/workflows/deploy.yml` will build and publish the site.
- If you are using a custom domain like `osamaandfarah.com`, set the domain in `Settings -> Pages -> Custom domain` and point your DNS to GitHub Pages.
- If you are publishing at the repository path `https://<user>.github.io/wedding-3.0/`, build with `VITE_BASE_PATH=/wedding-3.0/ npm run build`.
- If you are publishing on a custom domain, leave `VITE_BASE_PATH` unset so the build uses `/`.
- If your default branch is not `main`, update the workflow branch filter.

## Personalization

- Guest name (welcome message): add `?guest=Ahmed` (or `?g=Ahmed`) to the URL.
- Language: use the top-right toggle (RTL/LTR flips automatically).
- RSVP: saved locally in the browser (`localStorage`). Wire to a backend when ready.

## Map configuration (optional)

By default, the map uses a simple Google Maps query. For a more accurate embed, create `.env` in `wedding-invite/`:

```bash
VITE_MAP_QUERY="Masged Al Aly Al Azeem, Cairo"
# Or set a full embed URL:
# VITE_MAP_EMBED_URL="https://www.google.com/maps/embed?..."
```

## Music

- Ambient track lives at `wedding-invite/public/audio/ambient.wav`.
- Replace it with your own file (keep the same path), or update `AUDIO_SRC` in `wedding-invite/src/components/MusicToggle.tsx`.

## Where to edit branding

- Theme + palette: `wedding-invite/tailwind.config.js`
- Event details (date/time/venue): `wedding-invite/src/config/event.ts`
- Translations: `wedding-invite/src/i18n/content.ts`
- Logo + bar assets: `wedding-invite/src/assets/logo.jpeg`, `wedding-invite/src/assets/bar.jpeg`
