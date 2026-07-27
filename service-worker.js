const CACHE_NAME = "stepcat-v250-1-actual-example-guides";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./quick-start-guide.html",
  "./standalone.html",
  "./StepCat_Quick_Start_Guide_v250.1.pdf",
  "./StepCat_Quick_Start_Guide_v250.1.docx",
  "./stepcat-favicon.png",
  "./stepcat-apple-touch-icon.png",
  "./stepcat-icon-152.png",
  "./stepcat-icon-192.png",
  "./stepcat-icon-512.png",
  "./stepcat-icon-192-maskable.png",
  "./stepcat-icon-512-maskable.png",
  "./images/01-game-record-information.jpg",
  "./images/02-membership-confirmation.jpg",
  "./images/03-filled-record-details.jpg",
  "./images/04-calculation-information.jpg",
  "./images/05-final-earned-requirement.jpg",
  "./images/06-notes-field.jpg",
  "./images/07-final-earned-entered.jpg",
  "./images/08-calculate-and-save.jpg",
  "./images/09-newest-saved-result.jpg",
  "./images/10-saved-history-card.jpg",
  "./images/11-copy-sheet-row.jpg",
  "./images/12-sheet-row-copied.jpg",
  "./images/13-google-sheets-copy-privacy-examples.jpg",
  "./images/13-workbook-instructions.jpg",
  "./images/14-game-records-top.jpg",
  "./images/15-game-records-scrolled.jpg",
  "./images/16-formula-columns.jpg",
  "./images/17-record-review-totals.jpg",
  "./images/18-feedback-dialog.jpg",
  "./images/19-feedback-email-prepared.jpg"
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
