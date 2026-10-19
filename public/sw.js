// Bump this version when changing the offline resources or cache policy.
const CACHE_PREFIX = 'vini-blog-';
const CACHE_NAME = `${CACHE_PREFIX}v1`;
const OFFLINE_URL = '/offline.html';
const MAX_ENTRIES = 150;

self.addEventListener('install', (event) => {
  event.waitUntil(caches.open(CACHE_NAME).then((cache) => cache.addAll([
    OFFLINE_URL,
    '/icons/icon-192.png',
    '/icons/icon-512.png',
    '/icons/apple-touch-icon.png',
  ])));
  // Activate updates after existing tabs close to avoid mixing app versions.
});

self.addEventListener('activate', (event) => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter((name) => name.startsWith(CACHE_PREFIX) && name !== CACHE_NAME)
      .map((name) => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function saveResponse(request, response) {
  if (!response.ok || response.type === 'opaque' || response.redirected) return;
  const cache = await caches.open(CACHE_NAME);
  await cache.put(request, response);
  const keys = await cache.keys();
  const removable = keys.filter((key) => ![OFFLINE_URL, '/icons/icon-192.png',
    '/icons/icon-512.png', '/icons/apple-touch-icon.png'].includes(new URL(key.url).pathname));
  await Promise.all(removable.slice(0, Math.max(0, keys.length - MAX_ENTRIES))
    .map((key) => cache.delete(key)));
}

self.addEventListener('fetch', (event) => {
  const { request } = event;
  if (request.method !== 'GET') return;
  const url = new URL(request.url);
  const sameOrigin = url.origin === self.location.origin;
  // RSC responses vary with router state; never substitute cached HTML for them.
  if (request.headers.has('RSC') || url.searchParams.has('_rsc')) return;
  const navigation = sameOrigin && request.mode === 'navigate';
  const asset = sameOrigin && (url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/_next/image') || ['image', 'font'].includes(request.destination));
  const content = url.origin === 'https://raw.githubusercontent.com' &&
    url.pathname.startsWith('/VIINIU/vini_blog_db/');
  const font = url.origin === 'https://fastly.jsdelivr.net' && request.destination === 'font';
  if (!navigation && !asset && !content && !font) return;

  event.respondWith((async () => {
    try {
      const response = await fetch(request);
      event.waitUntil(saveResponse(request, response.clone()).catch(() => {}));
      return response;
    } catch (error) {
      const cache = await caches.open(CACHE_NAME);
      const cached = await cache.match(request);
      if (cached) return cached;
      if (navigation) return await cache.match(OFFLINE_URL) || Response.error();
      throw error;
    }
  })());
});
