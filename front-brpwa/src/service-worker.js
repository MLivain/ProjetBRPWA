const FFA_FILES = [
  "/",
  "/index.html",
  "/manifest.json",
  "/assets/case.png",
  "/assets/Carte.json",
  "/assets/TX Tileset Grass.png",
  "/assets/style.css",
  "/main.js",
  "/assets/logo.svg",
];
const FFA_CACHE = "ffa-cache";

async function install() {
  const ffaCache = await caches.open(FFA_CACHE);
  await ffaCache.addAll(FFA_FILES)
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
  } /*else if(!navigator.onLine && request.url.includes("/")){
    const randomInt = Math.floor(Math.random()*DOG_NUMBER);
    const responseBody = JSON.stringify({message : `/dogs/random/${randomInt}`, status : "success"})
    const response = new Response(responseBody, { status : 200});
    return fetch("index.html");
  }*/ else {
    return fetch(request);
  }
}

self.addEventListener("install", (event) => {
  event.waitUntil(install());
});

self.addEventListener("fetch", (event) => {
  event.respondWith(getResource(event.request));
});
