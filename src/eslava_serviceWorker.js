export function register() {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register(
            '/sw.js',
            { scope: '/' }
        )
            .then((reg) => {
                console.log('SW registered', reg);
            })
            .catch((error) => {
                console.log('SW registration failed because of: ', error);
            });
    }
}
