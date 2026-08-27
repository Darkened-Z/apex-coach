/* Apex Coach — service worker for PWA install + offline shell. */
const CACHE = 'apexcoach-v1';
const SHELL = ['/', '/index.html', '/assets/app.js', '/manifest.webmanifest'];

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE).then((c) => c.addAll(SHELL)).catch(() => {}));
  self.skipWaiting();
});
self.addEventListener('activate', (event) => {
  event.waitUntil(caches.keys().then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))));
  self.clients.claim();
});
self.addEventListener('fetch', (event) => {
  const req = event.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  if (url.origin !== location.origin) return;
  if (req.mode === 'navigate') {
    event.respondWith(fetch(req).then((r) => { caches.open(CACHE).then((c) => c.put(req, r.clone())); return r; }).catch(() => caches.match(req).then((r) => r || caches.match('/index.html'))));
    return;
  }
  event.respondWith(caches.match(req).then((c) => c || fetch(req).then((r) => { if (r.status === 200) caches.open(CACHE).then((c) => c.put(req, r.clone())); return r; })));
});
