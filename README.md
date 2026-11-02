# Fireground Academy — FF1 & FF2 Trainer (installable web app)

This folder is a complete progressive web app (PWA). Host it on any static web host with HTTPS and people can install it to their phone's home screen with its own icon. Once installed it works offline.

## Files
- `index.html` — the whole app (question bank, artwork, all modes)
- `manifest.webmanifest` — app name, colors, icons (what makes it installable)
- `sw.js` — service worker (offline support + caching)
- `icons/` — home-screen icons (Android, iPhone, maskable)

## Hosting (free, about 2 minutes)

**Option A: Netlify Drop (easiest)**
1. Go to https://app.netlify.com/drop
2. Drag this whole folder onto the page.
3. You get a live `https://….netlify.app` link. Create a free account to keep the site and rename it.

**Option B: GitHub Pages**
1. Create a new public repo and upload these files to the root.
2. Go to Settings → Pages → Deploy from branch → `main` / root.
3. Your app will be at `https://<username>.github.io/<repo>/`

**Option C: Cloudflare Pages or Vercel**: create a project and upload the folder. No build step is needed.

## Installing on a phone
- **Android (Chrome):** open the link, then tap the ⬇ button in the app header (or ⋮ menu → *Install app*).
- **iPhone (Safari):** open the link, tap Share → *Add to Home Screen*. The ⬇ button in the app shows these steps.

## Updating the app
1. Edit `index.html`.
2. In `sw.js`, bump `VERSION` (e.g. `fga-v1` → `fga-v2`) so installed phones fetch the new version.
3. Re-upload.

## Adding questions
In `index.html`, find the QUESTION BANK section and add a line:

```js
add(1,'Ladders','Your question?',['Correct answer FIRST','Wrong','Wrong','Wrong'],'Explanation shown after answering.',{best:1});
```
- First number: `1` = FF1, `2` = FF2
- The correct answer always goes first; options are shuffled on screen.
- Optional extras: `{best:1}` for scenario/best-answer mode, `{img:'ladder'}` to attach a picture, `{v:'youtube search words'}` for the Watch link.

Progress is stored on each user's device (browser storage). There are no accounts or server.
