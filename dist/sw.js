if (!self.define) {
    let e,
        s = {};
    const i = (i, n) => (
        (i = new URL(i + '.js', n).href),
        s[i] ||
            new Promise((s) => {
                if ('document' in self) {
                    const e = document.createElement('script');
                    (e.src = i), (e.onload = s), document.head.appendChild(e);
                } else (e = i), importScripts(i), s();
            }).then(() => {
                let e = s[i];
                if (!e)
                    throw new Error(`Module ${i} didn’t register its module`);
                return e;
            })
    );
    self.define = (n, t) => {
        const r =
            e ||
            ('document' in self ? document.currentScript.src : '') ||
            location.href;
        if (s[r]) return;
        let o = {};
        const c = (e) => i(e, r),
            l = { module: { uri: r }, exports: o, require: c };
        s[r] = Promise.all(n.map((e) => l[e] || c(e))).then(
            (e) => (t(...e), o)
        );
    };
}
define(['./workbox-7cfec069'], function (e) {
    'use strict';
    self.addEventListener('message', (e) => {
        e.data && 'SKIP_WAITING' === e.data.type && self.skipWaiting();
    }),
        e.precacheAndRoute(
            [
                { url: 'assets/index-AMca1tqb.js', revision: null },
                { url: 'assets/index-CkJUlw1M.css', revision: null },
                {
                    url: 'index.html',
                    revision: 'ea0d0ea3122d2c39fc7159b50fa98300',
                },
                {
                    url: 'registerSW.js',
                    revision: '1872c500de691dce40960bb85481de07',
                },
                {
                    url: 'manifest.webmanifest',
                    revision: '46b679d562c3eaef5c01263c2ee0114c',
                },
            ],
            {}
        ),
        e.cleanupOutdatedCaches(),
        e.registerRoute(
            new e.NavigationRoute(e.createHandlerBoundToURL('index.html'))
        );
});
