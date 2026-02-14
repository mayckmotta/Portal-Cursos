const CACHE_NAME = 'portal-cursos-v3'; // Incrementado para v3
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
  'https://fonts.googleapis.com/icon?family=Material+Icons',
  'https://fonts.googleapis.com/css2?family=Roboto:wght@400;500&family=Inter:wght@400;500;600&display=swap'
];

// Instalação: Salva os arquivos essenciais
self.addEventListener('install', (e) => {
  self.skipWaiting(); // Força a atualização imediata
  e.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Ativação: Limpa caches de versões anteriores
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keys) => {
      return Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            console.log('Limpando cache antigo:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
});

// Estratégia de Busca: Tenta a rede primeiro, se falhar usa o cache
self.addEventListener('fetch', (e) => {
  e.respondWith(
    fetch(e.request)
      .then((response) => {
        // Se a rede funcionar, atualiza o cache com a nova versão
        const resClone = response.clone();
        caches.open(CACHE_NAME).then((cache) => cache.put(e.request, resClone));
        return response;
      })
      .catch(() => caches.match(e.request)) // Se estiver offline, usa o cache
  );
});
