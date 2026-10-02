// Offline support: cache the app files so the diary opens without a connection.
// Bump VERSION whenever any cached file changes, so phones pick up the update.
var VERSION = "bowel-diary-v6";
var FILES = [
  "./",
  "./index.html",
  "./manifest.json",
  "./brand.js",
  "./jspdf.umd.min.js",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./apple-touch-icon.png"
];

self.addEventListener("install", function (e) {
  e.waitUntil(caches.open(VERSION).then(function (c) { return c.addAll(FILES); }));
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  e.waitUntil(caches.keys().then(function (keys) {
    return Promise.all(keys.filter(function (k) { return k !== VERSION; }).map(function (k) { return caches.delete(k); }));
  }));
  self.clients.claim();
});

self.addEventListener("fetch", function (e) {
  if (e.request.method !== "GET") return;
  // The page itself: try the internet first so updates show straight away,
  // and fall back to the saved copy when offline.
  if (e.request.mode === "navigate") {
    e.respondWith(fetch(e.request).then(function (res) {
      if (res.ok) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put("./index.html", copy); });
      }
      return res;
    }).catch(function () {
      return caches.match("./index.html");
    }));
    return;
  }
  e.respondWith(caches.match(e.request, { ignoreSearch: true }).then(function (hit) {
    if (hit) return hit;
    return fetch(e.request).then(function (res) {
      // Keep a copy of anything else from this site (like a clinic logo) for offline use.
      if (res.ok && new URL(e.request.url).origin === location.origin) {
        var copy = res.clone();
        caches.open(VERSION).then(function (c) { c.put(e.request, copy); });
      }
      return res;
    });
  }));
});
