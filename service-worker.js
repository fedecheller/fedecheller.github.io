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


this.addEventListener('fetch', event => {
  // request.mode = navigate isn't supported in all browsers
  // so include a check for Accept: text/html header.
  console.log('fetch');
  if (event.request.mode === 'navigate' || (event.request.method === 'GET' && event.request.headers.get('accept').includes('text/html'))) {
          console.log('navigate');
	  event.respondWith(
          fetch(event.request.url).catch(error => {
              // Return the offline page
		  console.log('offline');
              return caches.match(offlineUrl);
          })
    );
  }
  else{
	console.log('not navigate');
        // Respond with everything else if we can
        event.respondWith(caches.match(event.request)
                        .then(function (response) {
			console.log('response');
                        return response || fetch(event.request);
                    })
            );
      }
});
