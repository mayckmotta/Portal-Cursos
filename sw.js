const CACHE_NAME = 'portal-v-debug-' + Date.now(); // Gera um nome único sempre

self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força o novo Service Worker a assumir na hora
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(keys.map((k) => caches.delete(k))); // Apaga TUDO que for velho
    })
  );
});

self.addEventListener('fetch', (e) => {
  // Busca na rede primeiro, se falhar, tenta o cache
  e.respondWith(fetch(e.request).catch(() => caches.match(e.request)));
});
