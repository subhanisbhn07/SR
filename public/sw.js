// SignRoad Service Worker v2 - Enhanced PWA Support
const CACHE_NAME = 'signroad-v2';
const AUDIO_CACHE_NAME = 'signroad-audio-v1';

// App shell assets to pre-cache for instant loading
const APP_SHELL_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
  '/offline.html'
];

// Install event - pre-cache app shell
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log('Pre-caching app shell assets');
        return cache.addAll(APP_SHELL_ASSETS);
      })
      .then(() => self.skipWaiting())
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== AUDIO_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    }).then(() => self.clients.claim())
  );
});

// Fetch event - smart caching strategy
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  const url = new URL(event.request.url);

  // Handle navigation requests (HTML pages)
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const responseClone = response.clone();
          caches.open(CACHE_NAME).then((cache) => {
            cache.put(event.request, responseClone);
          });
          return response;
        })
        .catch(() => {
          return caches.match(event.request)
            .then((cachedResponse) => {
              if (cachedResponse) return cachedResponse;
              return caches.match('/offline.html');
            });
        })
    );
    return;
  }

  // Handle audio files - cache for offline playback
  if (url.pathname.includes('/audio/') || event.request.url.includes('.mp3')) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          if (cachedResponse) return cachedResponse;
          
          return fetch(event.request)
            .then((response) => {
              const responseClone = response.clone();
              caches.open(AUDIO_CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
              return response;
            });
        })
    );
    return;
  }

  // Handle static assets - stale-while-revalidate
  if (url.pathname.match(/\.(js|css|png|jpg|jpeg|gif|svg|webp|woff|woff2)$/)) {
    event.respondWith(
      caches.match(event.request)
        .then((cachedResponse) => {
          const fetchPromise = fetch(event.request)
            .then((networkResponse) => {
              const responseClone = networkResponse.clone();
              caches.open(CACHE_NAME).then((cache) => {
                cache.put(event.request, responseClone);
              });
              return networkResponse;
            })
            .catch(() => cachedResponse);
          
          return cachedResponse || fetchPromise;
        })
    );
    return;
  }

  // Default: network first, fallback to cache
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => caches.match(event.request))
  );
});

// Handle messages from the app (e.g., cache audio on demand)
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'CACHE_AUDIO') {
    const audioUrl = event.data.url;
    caches.open(AUDIO_CACHE_NAME)
      .then((cache) => cache.add(audioUrl))
      .then(() => {
        event.ports[0].postMessage({ success: true });
      })
      .catch((error) => {
        event.ports[0].postMessage({ success: false, error: error.message });
      });
  }
});
