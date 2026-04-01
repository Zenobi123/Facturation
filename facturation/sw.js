const CACHE_NAME = 'prisma-v1';

const PRECACHE_URLS = [
  './',
  './index.html',
  './clients.html',
  './contrats.html',
  './facture-app.html',
  './avance-app.html',
  './recu-app.html',
  './note-app.html',
  './situation-app.html',
  './courrier-app.html',
  './activite-app.html',
  './parametres-cabinet.html',
  './devis.html',
  './prisma-components.js',
  './prisma-print.css',
  './assets/css/tailwindcss.min.js',
  './assets/css/inter-font.css',
  './assets/fonts/inter-latin.woff2',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/apple-touch-icon.png',
];

// Installation : précache tous les fichiers locaux
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

// Activation : supprime les anciens caches
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys.filter(key => key !== CACHE_NAME).map(key => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

// Fetch : cache-first, avec mise en cache dynamique des ressources CDN
self.addEventListener('fetch', event => {
  // Ne pas intercepter les requêtes non-GET
  if (event.request.method !== 'GET') return;

  event.respondWith(
    caches.match(event.request).then(cached => {
      if (cached) return cached;

      return fetch(event.request).then(response => {
        // Mettre en cache les ressources CDN (jsPDF, html2canvas, XLSX)
        if (
          response.ok &&
          (event.request.url.includes('cdnjs.cloudflare.com') ||
           event.request.url.startsWith(self.location.origin))
        ) {
          const clone = response.clone();
          caches.open(CACHE_NAME).then(cache => cache.put(event.request, clone));
        }
        return response;
      }).catch(() => {
        // Fallback vers index.html pour les navigations
        if (event.request.mode === 'navigate') {
          return caches.match('./index.html');
        }
      });
    })
  );
});
