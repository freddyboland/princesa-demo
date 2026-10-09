// Service worker de la demo: sirve las fotos subidas (guardadas en este navegador).
self.addEventListener('install', () => self.skipWaiting())
self.addEventListener('activate', (e) => e.waitUntil(self.clients.claim()))
self.addEventListener('fetch', (e) => {
  const u = new URL(e.request.url)
  if (u.hostname !== 'demo-local.invalid') return
  e.respondWith(
    caches.open('princesa-demo-fotos')
      .then((c) => c.match(u.origin + u.pathname))
      .then((r) => r || new Response('', { status: 404 }))
  )
})
