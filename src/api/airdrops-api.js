let API_PATH = process.env.VUE_APP_XRPLT_API;

export function getAirdropSchedules() {
    return fetch(API_PATH + "/airdrop/publisher/", { 
        method: "GET"
    });
}

export function getAirdropByCode(code) {
    return fetch(API_PATH + "/airdrop/publisher/code/" + code, { method: "GET" });
}

export function getAirdropsByFeatured() {
    return fetch(API_PATH + "/airdrop/publisher/featured", { 
        method: "GET"
    });    
}

export function getAirdropsByHolders() {
    return fetch(API_PATH + "/airdrop/publisher/holders", { 
        method: "GET"
    });    
}

export function getAirdropsByNew() {
    return fetch(API_PATH + "/airdrop/publisher/calendar/added?days=7", { 
        method: "GET"
    });    
}

export function getAirdropsByCalendar() {
    return fetch(API_PATH + "/airdrop/publisher/calendar/airdrop", { 
        method: "GET"
    });    
}


export function getAirdropsByTag(tag) {
    return fetch(API_PATH + "/airdrop/publisher/tags/" + tag, { 
        method: "GET"
    });    
}

export function getAirdropsIds() {
    return fetch(API_PATH + "/airdrop/publisher/ids", { 
        method: "GET"
    });    
}

export function getXRPValue() {
    return fetch("https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=30&interval=daily", { 
        method: "GET"
    });    
}

export function getBalancesFromAccount(account) {
    return fetch("https://data.ripple.com/v2/accounts/" + account + "/balances", { 
        method: "GET"
    });
}