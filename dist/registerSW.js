if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
        navigator.serviceWorker.register('/OneSignalSDKWorker.js.js', {
            scope: '/',
        });
    });
}
