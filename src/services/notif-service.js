import { http } from './http-service';
export async function askNotificationPermission() {
  if (!('Notification' in window)) {
    return;
  }
  if (Notification.permission === 'default') {
    const VAPID_PUBLIC_KEY =
      'BB9n0lFwwoNIh54oW_oXTjuBCVyAMXw_CjchkgwxXdY2rf3T3ATPsTPfFc-CgPsU0rJzpoqmbtVemYGEqzn3eBE';
    let permission = await Notification.requestPermission();

    if (permission === 'granted') {
      let registration = await navigator.serviceWorker.ready;

      let subscription = await registration.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY),
      });
      console.log(JSON.stringify(subscription));
      await http.sendRequest(
        'POST',
        '/notification/subscribe',
        JSON.stringify(subscription),
        true
      );
    }
  }
}
function urlBase64ToUint8Array(base64String) {
  const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
  const base64 = (base64String + padding).replace(/-/g, '+').replace(/_/g, '/');
  const rawData = window.atob(base64);
  const outputArray = new Uint8Array(rawData.length);

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i);
  }

  return outputArray;
}
