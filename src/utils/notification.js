import { sendSubscription, checkSubscription, removeSubscription } from '@/api/notification-api'

let vapidPublicKey = process.env.VUE_APP_XRPL_PUSH_PK;

export async function subscribe(callback) {
  let permissionResult = await Notification.requestPermission();
  if (permissionResult == 'granted') {
    let sw = await navigator.serviceWorker.ready;

    let push = await sw.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: vapidPublicKey
    });

    sendSubscription(push)
      .then(res => res.json()).then(res => {
        if (res.status === 'SUCCESS') {
          callback('subscribed');
        }
      });
  } else {
    callback(permissionResult);
  }
}

export async function checkPermissionAndSubscription(callback) {
  let permission = Notification.permission;

  if (permission === 'granted') {
    let sw = await navigator.serviceWorker.ready;
    sw.pushManager.getSubscription().then(function(value) {
      if (value) {
        checkSubscription(value)
          .then(res => res.json()).then(res => {
            if (res.status === 'SUCCESS') {
              callback('subscribed');
            } else {
              callback('unsubscribed');
            }
          })
      } else {
        callback('unsubscribed');
      }
    });
  } else {
    callback(permission);
  }
}

export async function unsubscribe(callback) {
  let sw = await navigator.serviceWorker.ready;
  sw.pushManager.getSubscription().then(function(result) {
    removeSubscription(result).then(res => res.json()).then(res => {
      if (res.status === 'SUCCESS') {
        result.unsubscribe().then(function(){
          callback('unsubscribed');
        })
      }
    });
  });  
}

export function init(callback) {
    if ('serviceWorker' in navigator && 'Notification' in window) {
        if ('serviceWorker' in navigator) {
          navigator.serviceWorker.register('/sw.js', {
              scope: '/'
            })
            .then(function(reg) {
              checkPermissionAndSubscription(function(value) {
                console.log(value);
                callback(value);
              });

            }).catch(function(error) {
              callback('error_sw');
            });
        }

    } else {
      callback('not_supported');
    }   
}