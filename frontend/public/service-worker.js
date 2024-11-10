self.addEventListener('install', (event) => {
    console.log('Service Worker installing.');
    self.skipWaiting();
  });
  
  self.addEventListener('activate', (event) => {
    console.log('Service Worker activating.');
  });
  
  self.addEventListener('notificationclick', (event) => {
    event.notification.close();
    if (event.action === 'snooze') {
      console.log('Notification snoozed');
      setTimeout(() => {
        self.registration.showNotification(event.notification.title, {
          body: event.notification.body,
          icon: '/path/to/icon.png',
          actions: [
            { action: 'dismiss', title: 'Dismiss' },
            { action: 'snooze', title: 'Snooze' },
          ],
        });
      }, 5 * 60 * 1000); // 5 minutes
    } else {
      console.log('Notification clicked');
    }
  });
  
  self.addEventListener('notificationclose', (event) => {
    console.log('Notification closed');
  });
  