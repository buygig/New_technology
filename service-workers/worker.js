const CATCH_NAME = "fed-catch";

this.addEventListener("install", event => {
  this.skipWaiting();
  console.log("install service worker");
  caches.open(CATCH_NAME);

})