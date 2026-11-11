// Firefighter Training service worker — makes the app work offline.
// Bump VERSION whenever you change index.html so phones pick up the update.
const VERSION = 'fga-v4';
const CORE = [
  './',
  './index.html',
  './manifest.webmanifest',
  './content/q-ff1-a.js',
  './content/q-ff1-b.js',
  './content/q-ff1-c.js',
  './content/q-ff2.js',
  './content/q-ff2-b.js',
  './content/art-extra.js',
  './content/study-guide.js',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/maskable-512.png',
  './icons/apple-touch-icon.png'
];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(CORE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', e => {
  e.waitUntil(
    caches.keys()
      .then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // App page: network first (fresh content), fall back to cache when offline.
  if (req.mode === 'navigate') {
    e.respondWith(
      fetch(req).then(res => {
        const copy = res.clone();
        caches.open(VERSION).then(c => c.put('./index.html', copy));
        return res;
      }).catch(() => caches.match('./index.html'))
    );
    return;
  }

  // Same-origin files and Google Fonts: cache first, then network.
  if (url.origin === location.origin || url.host.endsWith('googleapis.com') || url.host.endsWith('gstatic.com')) {
    e.respondWith(
      caches.match(req).then(hit => hit || fetch(req).then(res => {
        if (res.ok || res.type === 'opaque') {
          const copy = res.clone();
          caches.open(VERSION).then(c => c.put(req, copy));
        }
        return res;
      }))
    );
  }
});
