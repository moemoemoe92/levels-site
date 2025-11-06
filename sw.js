/* ====================================
   Service Worker for PWA
   خدمة العامل للتطبيق التقدمي
   ==================================== */

const CACHE_NAME = 'levels-cafe-v1.0.0';
const RUNTIME_CACHE = 'levels-runtime-v1.0.0';

// Files to cache immediately
const PRECACHE_URLS = [
    '/',
    '/index.html',
    '/assets/css/variables.css',
    '/assets/css/main.css',
    '/assets/css/responsive.css',
    '/assets/js/main.js',
    '/assets/js/menu.js',
    '/3d/index.html',
    '/3d/css/style.css',
    '/3d/js/scene.js',
    '/manifest.json'
];

// External resources (CDN) - cache with network-first strategy
const EXTERNAL_RESOURCES = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://cdnjs.cloudflare.com',
    'https://unpkg.com'
];

// Install event - cache essential files
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');

    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log('[Service Worker] Precaching app shell');
                return cache.addAll(PRECACHE_URLS);
            })
            .then(() => {
                console.log('[Service Worker] Skip waiting');
                return self.skipWaiting();
            })
            .catch((error) => {
                console.error('[Service Worker] Precache failed:', error);
            })
    );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');

    event.waitUntil(
        caches.keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames
                        .filter((cacheName) => {
                            return cacheName !== CACHE_NAME && cacheName !== RUNTIME_CACHE;
                        })
                        .map((cacheName) => {
                            console.log('[Service Worker] Deleting old cache:', cacheName);
                            return caches.delete(cacheName);
                        })
                );
            })
            .then(() => {
                console.log('[Service Worker] Claiming clients');
                return self.clients.claim();
            })
    );
});

// Fetch event - serve from cache, fallback to network
self.addEventListener('fetch', (event) => {
    const { request } = event;
    const url = new URL(request.url);

    // Skip cross-origin requests that aren't in our external resources list
    if (url.origin !== location.origin && !isExternalResource(url.href)) {
        return;
    }

    // Handle API requests differently
    if (request.url.includes('/api/')) {
        event.respondWith(networkFirst(request));
        return;
    }

    // Handle external resources (CDN)
    if (isExternalResource(url.href)) {
        event.respondWith(staleWhileRevalidate(request));
        return;
    }

    // Handle navigation requests
    if (request.mode === 'navigate') {
        event.respondWith(
            fetch(request)
                .catch(() => {
                    return caches.match('/index.html');
                })
        );
        return;
    }

    // Default: cache-first strategy
    event.respondWith(cacheFirst(request));
});

// Check if URL is an external resource
function isExternalResource(url) {
    return EXTERNAL_RESOURCES.some(resource => url.startsWith(resource));
}

// Cache-first strategy
async function cacheFirst(request) {
    const cache = await caches.open(CACHE_NAME);
    const cached = await cache.match(request);

    if (cached) {
        console.log('[Service Worker] Serving from cache:', request.url);
        return cached;
    }

    try {
        const response = await fetch(request);

        // Cache successful responses
        if (response.status === 200) {
            const responseClone = response.clone();
            cache.put(request, responseClone);
            console.log('[Service Worker] Cached new resource:', request.url);
        }

        return response;
    } catch (error) {
        console.error('[Service Worker] Fetch failed:', error);

        // Return offline page if available
        const offlinePage = await cache.match('/offline.html');
        if (offlinePage) {
            return offlinePage;
        }

        // Return a basic offline response
        return new Response('Offline - التطبيق غير متصل بالإنترنت', {
            status: 503,
            statusText: 'Service Unavailable',
            headers: new Headers({
                'Content-Type': 'text/plain; charset=utf-8'
            })
        });
    }
}

// Network-first strategy (for API requests)
async function networkFirst(request) {
    const cache = await caches.open(RUNTIME_CACHE);

    try {
        const response = await fetch(request);

        if (response.status === 200) {
            const responseClone = response.clone();
            cache.put(request, responseClone);
        }

        return response;
    } catch (error) {
        console.error('[Service Worker] Network request failed, trying cache:', error);
        const cached = await cache.match(request);

        if (cached) {
            return cached;
        }

        throw error;
    }
}

// Stale-while-revalidate strategy (for external resources)
async function staleWhileRevalidate(request) {
    const cache = await caches.open(RUNTIME_CACHE);
    const cached = await cache.match(request);

    // Fetch in background
    const fetchPromise = fetch(request).then((response) => {
        if (response.status === 200) {
            cache.put(request, response.clone());
        }
        return response;
    }).catch((error) => {
        console.error('[Service Worker] Background fetch failed:', error);
    });

    // Return cached version immediately if available
    if (cached) {
        console.log('[Service Worker] Serving stale cache:', request.url);
        return cached;
    }

    // Otherwise wait for network
    return fetchPromise;
}

// Background sync for offline actions
self.addEventListener('sync', (event) => {
    console.log('[Service Worker] Background sync:', event.tag);

    if (event.tag === 'sync-orders') {
        event.waitUntil(syncOrders());
    }
});

async function syncOrders() {
    // Implement your sync logic here
    console.log('[Service Worker] Syncing orders...');
}

// Push notifications
self.addEventListener('push', (event) => {
    console.log('[Service Worker] Push received');

    const options = {
        body: event.data ? event.data.text() : 'رسالة جديدة من مقهى ليفيلز',
        icon: '/assets/images/icon-192x192.png',
        badge: '/assets/images/badge-72x72.png',
        vibrate: [200, 100, 200],
        data: {
            dateOfArrival: Date.now(),
            primaryKey: 1
        },
        actions: [
            {
                action: 'explore',
                title: 'استكشف',
                icon: '/assets/images/checkmark.png'
            },
            {
                action: 'close',
                title: 'إغلاق',
                icon: '/assets/images/cross.png'
            }
        ]
    };

    event.waitUntil(
        self.registration.showNotification('مقهى ليفيلز', options)
    );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
    console.log('[Service Worker] Notification clicked:', event.action);

    event.notification.close();

    if (event.action === 'explore') {
        event.waitUntil(
            clients.openWindow('/')
        );
    }
});

// Message handler
self.addEventListener('message', (event) => {
    console.log('[Service Worker] Message received:', event.data);

    if (event.data && event.data.type === 'SKIP_WAITING') {
        self.skipWaiting();
    }

    if (event.data && event.data.type === 'CLEAR_CACHE') {
        event.waitUntil(
            caches.keys().then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => caches.delete(cacheName))
                );
            })
        );
    }
});

console.log('[Service Worker] Service Worker loaded');
