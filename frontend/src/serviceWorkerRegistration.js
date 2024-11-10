// Register Service Worker
export function register() {
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register(`${process.env.PUBLIC_URL}/service-worker.js`).then(
          (registration) => {
            console.log('Service Worker registered with scope:', registration.scope);
          },
          (error) => {
            console.error('Service Worker registration failed:', error);
          }
        );
      });
    }
  }
  