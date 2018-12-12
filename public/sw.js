/* Caches variables */

const CACHE_VERSION = 1;
const STATIC_CACHE = `static-cache-v${CACHE_VERSION}`;
const IMAGES_CACHE = `images-cache-v`;
const allCaches = [
    STATIC_CACHE,
    IMAGES_CACHE
];

/* Functions */

function isImageURL(url) {
    let img_types = ["jpg", "jpeg", "png", "gif"];
    var isImage = false;
    for (let type of img_types) {
        if (url.endsWith(type)) { 
            isImage = true; break; 
        }
    }
    return isImage;
}

function store(cacheName, requestClone, responseClone) {
    return caches.open(cacheName)
        .then((cache) => {
            return cache.put(requestClone, responseClone)
        }
    );
}

/* Listeners */

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(STATIC_CACHE)
            .then( (cache) => {
                console.log("Current Cache: ", STATIC_CACHE);
                return cache.addAll([
                    "/",
                    "/index.html"
                ]);
            })
    );
});

self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches.keys().then( cacheNames => {
            console.log("Clearing Old Caches...");
            Promise.all(
                cacheNames.map( (cacheName) => {
                    if (!allCaches.includes(cacheName)) {
                        console.log(`Deleting: ${cacheName}`);
                        return caches.delete(cacheName);
                    }
                })
            );
        })
    );
});

self.addEventListener("fetch", (event) => {
    if (event.request.method === "GET") {
        event.respondWith(
            caches.match(event.request)
                .then((result) => {
                    if (result) { 
                        return result; 
                    }
                    fetch(event.request)
                        .then( response => {
                            // is the cache an image or not?
                            let thisCache = isImageURL(event.request.url) ? IMAGES_CACHE : STATIC_CACHE;
                            // store it
                            store(thisCache, event.request.clone(), response.clone());
                            return response;
                        })
                        .catch( error => {
                            console.log(error);
                        });
                })
        );
    }
    else {
        event.respondWith(fetch(event.request));
    }
});
