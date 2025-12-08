// SignRoad Service Worker
const CACHE_NAME = 'signroad-v22';
const MEDITATION_CACHE_NAME = 'signroad-meditations-v1';
const MAX_MEDITATION_CACHE_SIZE = 3; // Max 3 meditations for offline as per PRD

// Assets to pre-cache on install
const PRECACHE_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
];

// Install event - cache essential assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(PRECACHE_ASSETS);
    })
  );
  self.skipWaiting();
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames
          .filter((name) => name !== CACHE_NAME && name !== MEDITATION_CACHE_NAME)
          .map((name) => caches.delete(name))
      );
    })
  );
  self.clients.claim();
});

// Check if URL is a meditation audio file
const isMeditationAudio = (url) => {
  return url.includes('/audio/') && (url.endsWith('.mp3') || url.endsWith('.wav') || url.endsWith('.ogg'));
};

// Fetch event - network first, fallback to cache
self.addEventListener('fetch', (event) => {
  // Skip non-GET requests
  if (event.request.method !== 'GET') return;
  
  // Skip chrome-extension and other non-http requests
  if (!event.request.url.startsWith('http')) return;

  // Special handling for meditation audio files
  if (isMeditationAudio(event.request.url)) {
    event.respondWith(
      caches.open(MEDITATION_CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((cachedResponse) => {
          if (cachedResponse) {
            // Return cached meditation audio
            return cachedResponse;
          }
          // Not cached, fetch from network
          return fetch(event.request).then((response) => {
            // Don't cache automatically - only cache when explicitly downloaded
            return response;
          }).catch(() => {
            // Return a placeholder or error response for offline
            return new Response('Audio not available offline', {
              status: 503,
              statusText: 'Service Unavailable',
              headers: { 'Content-Type': 'text/plain' }
            });
          });
        });
      })
    );
    return;
  }

  // Standard network-first strategy for other requests
  event.respondWith(
    fetch(event.request)
      .then((response) => {
        // Clone the response before caching
        const responseClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(event.request, responseClone);
        });
        return response;
      })
      .catch(() => {
        // Fallback to cache if network fails
        return caches.match(event.request);
      })
  );
});

// Message handler for meditation download requests
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'DOWNLOAD_MEDITATION') {
    const { audioUrl, meditationId } = event.data;
    
    event.waitUntil(
      downloadMeditation(audioUrl, meditationId).then((success) => {
        // Notify the client about download status
        event.source.postMessage({
          type: 'MEDITATION_DOWNLOAD_COMPLETE',
          meditationId,
          success
        });
      })
    );
  }
  
  if (event.data && event.data.type === 'REMOVE_MEDITATION') {
    const { audioUrl } = event.data;
    
    event.waitUntil(
      removeMeditation(audioUrl).then((success) => {
        event.source.postMessage({
          type: 'MEDITATION_REMOVED',
          audioUrl,
          success
        });
      })
    );
  }
  
  if (event.data && event.data.type === 'GET_CACHED_MEDITATIONS') {
    event.waitUntil(
      getCachedMeditations().then((meditations) => {
        event.source.postMessage({
          type: 'CACHED_MEDITATIONS_LIST',
          meditations
        });
      })
    );
  }
});

// Download and cache a meditation audio file
async function downloadMeditation(audioUrl, meditationId) {
  try {
    const cache = await caches.open(MEDITATION_CACHE_NAME);
    const cachedKeys = await cache.keys();
    
    // Check if we've reached the max cache size
    if (cachedKeys.length >= MAX_MEDITATION_CACHE_SIZE) {
      console.log('Meditation cache full. Remove an existing meditation first.');
      return false;
    }
    
    // Fetch and cache the audio file
    const response = await fetch(audioUrl);
    if (response.ok) {
      await cache.put(audioUrl, response);
      console.log(`Meditation ${meditationId} cached successfully`);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Failed to download meditation:', error);
    return false;
  }
}

// Remove a meditation from cache
async function removeMeditation(audioUrl) {
  try {
    const cache = await caches.open(MEDITATION_CACHE_NAME);
    const deleted = await cache.delete(audioUrl);
    console.log(`Meditation removed from cache: ${deleted}`);
    return deleted;
  } catch (error) {
    console.error('Failed to remove meditation:', error);
    return false;
  }
}

// Get list of cached meditations
async function getCachedMeditations() {
  try {
    const cache = await caches.open(MEDITATION_CACHE_NAME);
    const keys = await cache.keys();
    return keys.map((request) => request.url);
  } catch (error) {
    console.error('Failed to get cached meditations:', error);
    return [];
  }
}
