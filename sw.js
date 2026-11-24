"use strict";
const CACHE_NAME = "rf983-orbit-shell-v17";
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
  "./knowledge/",
  "./knowledge/index.html",
  "./knowledge/article.html",
  "./knowledge/knowledge.css",
  "./knowledge/knowledge-data.js",
  "./knowledge/knowledge.js",
  "./knowledge/article.js",
  "./atlas/",
  "./atlas/index.html",
  "./atlas/atlas.css",
  "./atlas/atlas-data.js",
  "./atlas/atlas.js",
  "./earth/",
  "./earth/index.html",
  "./earth/earth.css",
  "./earth/earth-data.js",
  "./earth/earth.js",
  "./encyclopedia/",
  "./encyclopedia/index.html",
  "./encyclopedia/encyclopedia.css",
  "./encyclopedia/encyclopedia-data.js",
  "./encyclopedia/encyclopedia.js",
  "./database/",
  "./database/index.html",
  "./database/database.css",
  "./database/database-data.js",
  "./database/database.js",
  "./constellation/",
  "./constellation/index.html",
  "./constellation/constellation.css",
  "./constellation/constellation.js",
  "./science/",
  "./science/index.html",
  "./science/science.css",
  "./science/science.js",
  "./creative/",
  "./creative/index.html",
  "./creative/creative.css",
  "./creative/creative.js",
  "./sound/",
  "./sound/index.html",
  "./sound/sound.css",
  "./sound/sound.js",\n  "./motion/",\n  "./motion/index.html",\n  "./motion/motion.css",\n  "./motion/motion.js",
  "./video/",
  "./video/index.html",
  "./video/video.css",
  "./video/video.js",
  "./commerce/",
  "./commerce/index.html",
  "./commerce/commerce.css",
  "./commerce/commerce.js"
];

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
