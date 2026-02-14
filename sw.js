const CACHE_NAME = 'portal-cursos-v2'; // Mude de v1 para v2
const ASSETS = [
  './',
  './index.html',
  './css/style.css',
  './js/data.js',
  './js/ui.js',
  './js/search.js',
  './manifest.json',
  './icon-192.png',
  './icon-512.png',
  'https://fonts.googleapis.com/icon?family=Material+Icons'
];

// Limpa caches antigos quando a nova versão ativa
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((key) => {
        if (key !== CACHE_NAME) {
          return caches.delete(key);
        }
      }));
    })
  );
});

// Instala o Service Worker e armazena os arquivos no cache
self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Intercepta as requisições para servir os arquivos do cache quando offline
self.addEventListener('fetch', (e) => {
  e.respondWith(
    caches.match(e.request).then((res) => res || fetch(e.request))
  );
});
