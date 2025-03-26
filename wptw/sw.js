const CACHE_NAME = 'wptw-v3.2-subdir';
const ASSETS = [
  '/wptw/',
  '/wptw/index.html',
  '/wptw/favicon.ico',
  '/wptw/styles.css',
  '/wptw/default.wptw',
  '/wptw/icons/icon-192x192.png',
  '/wptw/icons/icon-512x512.png'
];

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(ASSETS);
      })
  );
});

self.addEventListener('fetch', (event) => {
  const requestUrl = new URL(event.request.url);
  
  // Only handle requests within our app's directory
  if (requestUrl.pathname.startsWith('/wptw/')) {
    event.respondWith(
      caches.match(event.request)
        .then((response) => {
          return response || fetch(event.request);
        })
    );
  }
});

self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});