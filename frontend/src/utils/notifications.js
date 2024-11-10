export const requestNotificationPermission = () => {
    if (Notification.permission === 'default') {
      Notification.requestPermission().then((permission) => {
        console.log(`Notification permission status: ${permission}`);
        if (permission === 'granted') {
          console.log('Notification permission granted.');
        } else {
          console.log('Notification permission denied.');
        }
      });
    } else {
      console.log(`Notification permission status: ${Notification.permission}`);
    }
  };
  
  export const scheduleNotification = (event) => {
    const notificationTime = 10 * 1000; // 10 seconds
  
    console.log(`Scheduling notification for event '${event.title}' in 10 seconds.`);
  
    setTimeout(() => {
      showNotification(event);
    }, notificationTime);
  };
  
  const showNotification = (event) => {
    if (Notification.permission === 'granted') {
      const notification = new Notification(event.title, {
        body: event.description,
        icon: '/path/to/icon.png', // Optional: path to an icon image
        actions: [
          { action: 'dismiss', title: 'Dismiss' },
          { action: 'snooze', title: 'Snooze' },
        ],
      });
  
      console.log(`Showing notification for event: ${event.title}`);
  
      notification.onclick = (event) => {
        event.preventDefault(); // Prevent the browser from focusing the Notification's tab
        console.log('Notification clicked');
      };
  
      notification.onclose = (event) => {
        console.log('Notification closed');
      };
  
      notification.addEventListener('click', (event) => {
        if (event.action === 'dismiss') {
          console.log('Notification dismissed');
          notification.close();
        } else if (event.action === 'snooze') {
          console.log('Notification snoozed');
          setTimeout(() => {
            showNotification(event);
          }, 5 * 60 * 1000); // 5 minutes
        }
      });
    } else {
      console.log('Notification permission not granted.');
    }
  };
  