import { createHandlerBoundToURL } from "workbox-precaching";
import { NavigationRoute, registerRoute } from "workbox-routing";

const FFA_FILES = [
  "/",
  "/index.html",
  "/manifest.json",
  "/service-worker.js",
  "/assets/case.png",
  "/assets/Carte.json",
  "/assets/TX Tileset Grass.png",
  "/assets/style.css",
  "/main.js",
  "/assets/logo.svg",
];
const FFA_VUES = ["/game", "/gamehistory"];
const FFA_CACHE = "ffa-cache";

async function install() {
  const ffaCache = await caches.open(FFA_CACHE);
  await ffaCache.addAll(FFA_FILES);
}

async function getResource(request) {
  const [ffaCache] = await Promise.all([caches.open(FFA_CACHE)]);
  if (FFA_FILES.includes(request.url)) {
    const response = ffaCache.match(request);
    if (response) {
      return response;
    }
    console.error("Could not get from cache", request);
    return fetch(request);
  } else if (!navigator.onLine && FFA_VUES.includes(request.url)) {
    return fetch("/index.html");
  } else {
    return fetch(request);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(install());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(getResource(event.request));
});

const handler = createHandlerBoundToURL("/index.html");
const navigationRoute = new NavigationRoute(handler);
registerRoute(navigationRoute);
