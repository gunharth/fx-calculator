self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open('fxcalc-v1')
            .then(function (cache) {
                return cache.addAll([
                    '/',
                    'index.html',
                    'style.css',
                    'app.js',
                    'icon512.png',
                    'icon16.png',
                    'rates.json',
                    'manifest.webmanifest'
                ]);
        })
    );
});


self.addEventListener('fetch', function (e) {
    e.respondWith(
        caches.open('fxcalc-v1')
        .then(
            cache => cache.match(e.request)
        )
    );
});
