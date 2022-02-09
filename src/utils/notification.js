import { sendSubscription } from '@/api/notification-api'

let vapidPublicKey = process.env.VUE_APP_XRPL_PUSH_PK;

export async function askPermission(callback) {
  let permissionResult = await Notification.requestPermission();

  if (permissionResult == 'granted') {
    subscribe();
  }
  callback(permissionResult);
}

export function checkPermission() {
  return Notification.permission;
}

export async function subscribe() {
    let sw = await navigator.serviceWorker.ready;
    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey
    });

    sendSubscription(push);
}

export function init() {
    if ('serviceWorker' in navigator) {
        addEventListener('load', async () => {
          let sw = await navigator.serviceWorker.register('./sw.js');
        });
    }    
}