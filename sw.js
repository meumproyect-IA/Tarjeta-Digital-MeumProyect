/* ==========================================================================
   MOTOR PRINCIPAL - SERVICE WORKER MEUMPROYECT
   ========================================================================== */

const CACHE_NAME = 'meumproyect-v1';
const ASSETS = [
    './',
    './index.html',
    './index.css',
    './index.js',
    './manifest.json'
];

// 1. Instalación y enraizamiento del caché en la Cabaña de Cristal
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log('Caché enraizado con éxito');
            return cache.addAll(ASSETS);
        })
    );
});

// 2. Activación y limpieza de circunstancias viejas
self.addEventListener('activate', (event) => {
    console.log('Service Worker activo y listo');
});

// 3. El puente de escucha obligatorio para permitir el flujo sin desmadre
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});