"use strict";
const CACHE_NAME = "rf983-orbit-shell-v21";
const CORE_FILES = [
  "./",
  "./index.html",
  "./privacy.html",
  "./terms.html",
  "./404.html",
  "./manifest.webmanifest",
  "./assets/style.css",
  "./assets/app.js",
  "./assets/pwa.js",
  "./assets/orbit-expansion.css",
  "./assets/orbit-expansion.js",
  "./assets/rf983-orbit-logo.svg",
  "./assets/favicon.svg",
  "./hub/",
  "./hub/index.html",
  "./hub/hub.css",
  "./hub/hub.js"
];

// Keep installation light: destination data and studio assets are cached lazily when visited.
self.addEventListener("install", event => {
  event.waitUntil((async () => {
    const cache = await caches.open(CACHE_NAME);
    await cache.addAll(CORE_FILES);
    await self.skipWaiting();
  })());
});

self.addEventListener("activate", event => {
  event.waitUntil((async () => {
    const keys = await caches.keys();
    await Promise.all(keys.filter(key => key.startsWith("rf983-orbit-shell-") && key !== CACHE_NAME).map(key => caches.delete(key)));
    await self.clients.claim();
  })());
});

self.addEventListener("fetch", event => {
  const request = event.request;
  if (request.method !== "GET") return;
  const url = new URL(request.url);
  if (url.origin !== self.location.origin) return;

  event.respondWith((async () => {
    const cached = await caches.match(request, { ignoreSearch: true });
    if (request.mode !== "navigate" && cached) return cached;
    try {
      const fresh = await fetch(request);
      if (fresh.ok) {
        const cache = await caches.open(CACHE_NAME);
        await cache.put(request, fresh.clone());
      }
      return fresh;
    } catch (error) {
      if (cached) return cached;
      if (request.mode === "navigate") {
        const home = await caches.match(new URL("./index.html", self.registration.scope).href);
        if (home) return home;
      }
      return Response.error();
    }
  })());
});
