'use strict';

var cacheVersion = 1;
var currentCache = {
  offline: 'offline-cache' + cacheVersion
};
const offlineUrl = 'offline-page.html';

this.addEventListener('install', event => {
  event.waitUntil(
    caches.open(currentCache.offline).then(function(cache) {
      return cache.addAll([
          './launcher-icon-1x.png',
		  './launcher-icon-2x.png',
		  './launcher-icon-3x.png',
		  './launcher-icon-4x.png',
          offlineUrl
      ]);
    })
  );
});