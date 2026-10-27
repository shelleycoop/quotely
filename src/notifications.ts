import { Platform } from 'react-native';
import * as Notifications from 'expo-notifications';
import { dailyQuote } from './data/quotes';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowBanner: true,
    shouldShowList: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

const CHANNEL_ID = 'daily-quotes';

async function ensureAndroidChannel(): Promise<void> {
  if (Platform.OS !== 'android') return;
  await Notifications.setNotificationChannelAsync(CHANNEL_ID, {
    name: 'Daily quotes',
    importance: Notifications.AndroidImportance.DEFAULT,
    vibrationPattern: [0, 40],
    lightColor: '#C45C26',
  });
}

export async function enableDailyReminder(): Promise<boolean> {
  await ensureAndroidChannel();
  const current = await Notifications.getPermissionsAsync();
  let status = current.status;
  if (status !== 'granted') {
    const asked = await Notifications.requestPermissionsAsync();
    status = asked.status;
  }
  if (status !== 'granted') return false;

  await Notifications.cancelAllScheduledNotificationsAsync();
  const quote = dailyQuote();
  await Notifications.scheduleNotificationAsync({
    content: {
      title: 'Today in Quotely',
      body: `"${quote.text}" — ${quote.author}`,
      sound: undefined,
      ...(Platform.OS === 'android' ? { channelId: CHANNEL_ID } : {}),
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.DAILY,
      hour: 8,
      minute: 0,
      channelId: CHANNEL_ID,
    },
  });
  return true;
}

export async function disableDailyReminder(): Promise<void> {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
