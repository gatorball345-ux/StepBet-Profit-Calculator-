const CACHE_NAME = 'stepcat-v246-2-20260725-chip-display-audit';
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./quick-start-guide.html",
  "./standalone.html",
  "./StepCat_Blank_Profitability_Analysis_Template.xlsx",
  "./stepcat-favicon.png",
  "./stepcat-apple-touch-icon.png",
  "./stepcat-icon-152.png",
  "./stepcat-icon-192.png",
  "./stepcat-icon-512.png",
  "./stepcat-icon-192-maskable.png",
  "./stepcat-icon-512-maskable.png"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(
      CORE_ASSETS.map(url => cache.add(new Request(url, { cache: "reload" })))
    );
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const names = await caches.keys();
    await Promise.all(names.filter(name => name !== CACHE_NAME).map(name => caches.delete(name)));
    await self.clients.claim();
  })());
});

async function networkFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);
  try {
    const response = await fetch(request, { cache: "no-store" });
    if (response && response.ok && response.type === "basic") {
      await cache.put(request, response.clone());
    }
    return response;
  } catch (error) {
    const cached = await cache.match(request);
    if (cached) return cached;
    if (fallbackUrl) {
      const fallback = await cache.match(fallbackUrl);
      if (fallback) return fallback;
    }
    throw error;
  }
}

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(
    request.mode === "navigate"
      ? networkFirst(request, "./index.html")
      : networkFirst(request)
  );
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") self.skipWaiting();
});
