const CACHE_NAME = 'Pravda';
const cacheList = [
    'index.html',
    'vue.min.js',
    'index.js',
    'reset.min.css',
    'index.css',
    'images/balloons.svg',
    'images/decoration.svg',
    'images/fav.svg',
    'images/balloons.svg' ,
    'images/bird.png' ,
    'images/decoration.svg' ,
    'images/false.svg' ,
    'images/favicon.png' ,
    'images/grass.png' ,
    'images/heart.svg' ,
    'images/lock.png' ,
    'images/menu.svg' ,
    'images/next.svg' ,
    'images/noHeart.svg' ,
    'images/noStar.svg' ,
    'images/right.png' ,
    'images/star.svg' ,
    'images/te.txt' ,
    'images/timeout.png' ,
    'images/true.svg'
];
this.addEventListener('install', function (event) {
    event.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            return cache.addAll(cacheList);
        })
    );
});
const CACHE_PREFIX = 'Pravda-1';

this.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(keyList => {
            return Promise.all(keyList.map(key => {
                if (key.indexOf(CACHE_PREFIX) === 0 && key !== CACHE_NAME) {
                    return caches.delete(key);
                }
            }));
        })
    );
});

this.addEventListener('fetch', function (event) {
    if (
        event.request.method !== 'GET' ||
        event.request.url.indexOf('http://') === 0 ||
        event.request.url.indexOf('an.yandex.ru') !== -1
    ) {
        return;
    }
    event.respondWith(
        caches.match(event.request).then(function(response) {
            return response || fetch(event.request);
        })
    );
});
