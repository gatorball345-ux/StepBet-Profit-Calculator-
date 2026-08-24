const CACHE_NAME = "stepcat-v2531-workbook-v2532-20260824-native-sheet-final";
const CORE_ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./quick-start-guide.html",
  "./standalone.html",
  "./StepCat_Quick_Start_Guide_v253.2.pdf",
  "./StepCat_Quick_Start_Guide_v253.2.docx",
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
  "./images/13-workbook-instructions-lower.jpg",
  "./images/13-workbook-instructions.jpg",
  "./images/14-game-records-top.jpg",
  "./images/15-game-records-scrolled.jpg",
  "./images/16-formula-columns.jpg",
  "./images/17-record-review-totals.jpg",
  "./images/18-feedback-dialog.jpg",
  "./images/19-feedback-email-prepared.jpg",
  "./images/20-summary.jpg",
  "./images/21-summary-tally.jpg",
  "./images/22-game-comparisons.jpg",
  "./images/23-best-results.jpg",
  "./images/24-settings-panel.jpg",
  "./images/25-help-main.jpg",
  "./images/26-help-guides-downloads.jpg",
  "./images/27-finalize-this-estimate.jpg",
  "./images/28-install-stepcat-card.jpg",
  "./images/29-android-chrome-install-menu.jpg",
  "./images/30-android-download-confirmation.jpg",
  "./images/31-android-install-dialog.jpg",
  "./images/32-stepcat-home-screen-icon.jpg",
  "./images/33-saved-history-actions.jpg",
  "./images/34-install-information-dialog.jpg",
  "./images/24-settings-page-sections.jpg",
  "./images/24-settings-lower.jpg",
  "./images/25-using-workbook-1.jpg",
  "./images/25-using-workbook-2.jpg",
  "./images/whats-new-v2531-expanded.jpg",
  "./images/whats-new-v2531-collapsed.jpg",
  "./images/35-move-existing-records.jpg"
];

self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await Promise.allSettled(CORE_ASSETS.map(url => cache.add(new Request(url, { cache: "reload" }))));
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
async function cacheFirst(request, fallbackUrl) {
  const cache = await caches.open(CACHE_NAME);
  const cached = await cache.match(request, { ignoreSearch: true });
  if (cached) return cached;
  if (fallbackUrl) {
    const fallback = await cache.match(fallbackUrl, { ignoreSearch: true });
    if (fallback) return fallback;
  }
  try {
    const response = await fetch(request);
    if (response && response.ok && response.type === "basic") await cache.put(request, response.clone());
    return response;
  } catch (error) {
    throw error;
  }
}
function navigationFallback(url) {
  const path = url.pathname.replace(/\/+$/, "");
  if (path.endsWith("/quick-start-guide")) return "./quick-start-guide.html";
  if (path.endsWith("/standalone")) return "./standalone.html";
  return "./index.html";
}
self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;
  event.respondWith(request.mode === "navigate" ? cacheFirst(request, navigationFallback(url)) : cacheFirst(request));
});
self.addEventListener("message", event => { if (event.data === "SKIP_WAITING") self.skipWaiting(); });
