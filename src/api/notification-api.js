let API_PATH = process.env.VUE_APP_XRPLT_API;

export function sendSubscription(subscription) {
    let request = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    }
    return fetch(API_PATH + "/notifications/", request);    
}

export function checkSubscription(subscription) {
    let request = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    }
    return fetch(API_PATH + "/notifications/check", request);    
}

export function removeSubscription(subscription) {
    let request = {
        method: "DELETE",
        headers: { 
            "Content-Type": "application/json"
        },
        body: JSON.stringify(subscription)
    }
    return fetch(API_PATH + "/notifications/", request);    
}