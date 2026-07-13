/*
=========================================================
SERVICE WORKER
Kids Visual Dictionary
FIXED: previously used absolute paths ("/index.html" etc.)
which resolve to the domain ROOT, not the /visual-dictionary/
project subpath GitHub Pages actually serves this from.
That made cache.addAll() fail on every install, so offline
support silently never worked.
=========================================================
*/

const CACHE_NAME = "visual-dictionary-cache-v2";

const urlsToCache = [
  "./",
  "./index.html",
  "./manifest.json",
  "./css/style.css",
  "./css/animations.css",
  "./css/games.css",
  "./css/responsive.css",
  "./js/database.js",
  "./js/utils.js",
  "./js/audio.js",
  "./js/progress.js",
  "./js/flashcards.js",
  "./js/quiz.js",
  "./js/dragdrop.js",
  "./js/memory.js",
  "./js/spelling.js",
  "./js/teacher.js",
  "./js/app.js"
];

self.addEventListener("install", event => {

  event.waitUntil(

    caches.open(CACHE_NAME)

      .then(cache => cache.addAll(urlsToCache))

      .then(() => self.skipWaiting())

  );

});

self.addEventListener("activate", event => {

  event.waitUntil(

    caches.keys().then(keys =>

      Promise.all(

        keys

          .filter(key => key !== CACHE_NAME)

          .map(key => caches.delete(key))

      )

    ).then(() => self.clients.claim())

  );

});

self.addEventListener("fetch", event => {

  event.respondWith(

    caches.match(event.request).then(response => {

      return response || fetch(event.request).catch(() => response);

    })

  );

});
