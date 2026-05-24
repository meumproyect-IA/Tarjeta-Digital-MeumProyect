self.addEventListener('install', (e) => {
    e.waitUntil(caches.open('meum-store').then((cache) => cache.addAll(['index.html', 'index.css', 'index.js'])));
});

self.addEventListener('fetch', (e) => {
    e.respondWith(caches.match(e.request).then((response) => response || fetch(e.request)));
});