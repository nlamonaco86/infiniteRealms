const FILES_TO_CACHE = [
    "/",
    "./assets",
    "./assets/css",
    "./assets/css/00copyfont.txt",
    "./assets/css/Antique Quest St.ttf",
    "./assets/css/style.css",
    "./assets/images",
    "./assets/images/android-chrome-192x192.png",
    "./assets/images/android-chrome-512x512.png",
    "./assets/images/apple-touch-icon.png",
    "./assets/images/favicon-16x16.png",
    "./assets/images/favicon-32x32.png",
    "./assets/images/favicon.ico",
    "./assets/js",
    "./assets/js/loadImages.js",
    "./assets/screenshot.png",
    "./favicon.ico",
    "./index.html",
    "./manifest.webmanifest",
    "./service-worker.js",
  ];
  
  const CACHE_NAME = "static-cache-v2";
  const DATA_CACHE_NAME = "data-cache-v1";
// install
self.addEventListener("install", function (event) {
    // pre cache image data
    event.waitUntil(
        caches.open(DATA_CACHE_NAME).then((cache) => cache.add("/api/images"))
    );

    // pre cache all static assets
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => cache.addAll(FILES_TO_CACHE))
    );

    // tell the browser to activate this service worker immediately once it
    // has finished installing
    self.skipWaiting();
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener("activate", function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(
                keyList.map(key => {
                    if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
                        console.log("Removing old cache data", key);
                        return caches.delete(key);
                    }
                })
            );
        })
    );

    self.clients.claim();
});

self.addEventListener('fetch', function (event) {
    if (event.request.url.includes('/api/')) {
        console.log('[Service Worker] Fetch (data)', event.request.url);

        event.respondWith(
            caches.open(DATA_CACHE_NAME).then(cache => {
                return fetch(event.request)
                    .then(response => {
                        if (response.status === 200) {
                            cache.put(event.request.url, response.clone());
                        }

                        return response;
                    })
                    .catch(err => {
                        return cache.match(event.request);
                    });
            })
        );
        return;
    }

    event.respondWith(
        caches.open(CACHE_NAME).then(cache => {
            return cache.match(event.request).then(response => {
                return response || fetch(event.request);
            });
        })
    );
});