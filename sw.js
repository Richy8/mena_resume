const staticCacheName = 'site-static-v1';
const dynamicCacheName = 'site-dynamic-v1'

const assets = [
    '/',
    '/index.html',
    '/favicon.png',
    '/manifest.json',
    '/static/css/app.css',
    '/static/js/app.js',
    '/static/js/register.js',
    '/static/assets/background.jpg',
    '/static/assets/elvis.jpg',
    '/static/assets/logo.png',
    '/static/assets/sunshine.png',
    '/static/assets/paper_plane.png',
    '/static/assets/paper_plane2.png',
    'https://res.cloudinary.com/richy-jones/raw/upload/v1585944829/Albas.ttf',
    'https://res.cloudinary.com/richy-jones/image/upload/v1585944807/Efemena_Elvis.pdf',
    'https://res.cloudinary.com/richy-jones/raw/upload/v1585949216/online_themify.css',
    'https://res.cloudinary.com/richy-jones/raw/upload/v1585946305/font/themify.eot',
    'https://res.cloudinary.com/richy-jones/raw/upload/v1585946305/font/themify.woff',
    'https://res.cloudinary.com/richy-jones/raw/upload/v1585946305/font/themify.ttf',
    '/static/css/themify.svg',
    'https://use.fontawesome.com/releases/v5.8.1/css/all.css',
    '/static/font/webfonts/fa-brands-400.woff2',
    '/static/font/webfonts/fa-brands-400.woff',
    '/static/font/webfonts/fa-brands-400.ttf',
    '/static/font/webfonts/fa-solid-900.woff2',
    '/static/font/webfonts/fa-solid-900.woff',
    '/static/font/webfonts/fa-solid-900.ttf',
    'https://use.fontawesome.com/releases/v5.8.1/webfonts/fa-solid-900.woff2',
    'https://use.fontawesome.com/releases/v5.8.1/webfonts/fa-solid-900.woff',
    'https://use.fontawesome.com/releases/v5.8.1/webfonts/fa-solid-900.ttf'
];


// CACHE SIZE LIMIT FUNCTION
const limitCacheSize = (name, size) => {
    caches.open(name).then(cache => {
        cache.keys().then(keys => {
            if(keys.length > size) {
                cache.delete(keys[0]).then(limitCacheSize(name, size));
            }
        })
    })
}


// INSTALL SERVICE WORKER
self.addEventListener('install', evt => {
    // console.log('Service worker has been installed');
    evt.waitUntil(
        caches.open(staticCacheName).then(cache => {
            cache.addAll(assets);
        }),
        caches.open(dynamicCacheName)
    );
})

// ACTIVATE SERVICE WORKER
self.addEventListener('activate', evt => {
    // console.log('Service Worker activated');
    evt.waitUntil(
        caches.keys().then(keys => {
            return Promise.all(keys
                .filter(key => key !== staticCacheName  && key !== dynamicCacheName)
                .map(key => caches.delete(key))
            )
        })
    )
})

// FETCH EVENTS
self.addEventListener('fetch', evt => {
    // console.log('fetch events', evt);
    evt.respondWith(
        caches.match(evt.request).then(cacheRes => {
            return cacheRes || fetch(evt.request).then(fetchRes => {
                return caches.open(dynamicCacheName).then(cache => {
                    cache.put(evt.request.url, fetchRes.clone());
                    limitCacheSize(dynamicCacheName, 50);
                    return fetchRes;
                })
            })
        })
    )
})