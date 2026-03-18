import { useEffect } from 'react';

export function useNotifications(settings) {
  useEffect(() => {
    if (!settings.reminders) return;

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    // Check reminders every hour
    const interval = setInterval(() => {
      const now = new Date();
      const hour = now.getHours();
      const minute = now.getMinutes();
      
      // Morning reminder at set time
      const [reminderHour, reminderMinute] = settings.reminderTime.split(':').map(Number);
      if (hour === reminderHour && minute === reminderMinute) {
        sendNotification('Time for your daily Quran tasks!', 'Start your memorization and reading for today.');
      }
      
      // Evening reminder if tasks incomplete
      if (hour === 20 && minute === 0) {
        sendNotification('Don\'t forget your tasks!', 'Complete your daily Quran goals before Isha.');
      }
    }, 60000);

    return () => clearInterval(interval);
  }, [settings]);

  const sendNotification = (title, body) => {
    if ('Notification' in window && Notification.permission === 'granted') {
      new Notification(title, {
        body: body,
        icon: '/icon-192.png',
        badge: '/icon-192.png'
      });
    }
  };
}
