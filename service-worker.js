const CACHE_NAME = "stepcat-v145-help-drawer-polish-20260625-1";

const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./stepcat-icon-192.png",
  "./stepcat-icon-512.png",
  "./stepcat-icon-192-maskable.png",
  "./stepcat-icon-512-maskable.png",
  "./stepcat-favicon.png",
  "./stepcat-apple-touch-icon.png",
  "./stepcat-icon-152.png"
];

self.addEventListener("install", event => {
  event.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME);

      await Promise.allSettled(
        CORE_ASSETS.map(url =>
          cache.add(new Request(url, { cache: "reload" }))
        )
      );

      await self.skipWaiting();
    })()
  );
});

self.addEventListener("activate", event => {
  event.waitUntil(
    (async () => {
      const cacheNames = await caches.keys();

      await Promise.all(
        cacheNames
          .filter(name => name !== CACHE_NAME)
          .map(name => caches.delete(name))
      );

      await self.clients.claim();
    })()
  );
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
    const cachedResponse = await cache.match(request);

    if (cachedResponse) {
      return cachedResponse;
    }

    if (fallbackUrl) {
      const fallbackResponse = await cache.match(fallbackUrl);

      if (fallbackResponse) {
        return fallbackResponse;
      }
    }

    throw error;
  }
}

self.addEventListener("fetch", event => {
  const request = event.request;

  if (request.method !== "GET") {
    return;
  }

  const url = new URL(request.url);

  if (url.origin !== self.location.origin) {
    return;
  }

  if (request.mode === "navigate") {
    event.respondWith(networkFirst(request, "./index.html"));
    return;
  }

  event.respondWith(networkFirst(request));
});

self.addEventListener("message", event => {
  if (event.data === "SKIP_WAITING") {
    self.skipWaiting();
  }
});
