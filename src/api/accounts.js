export function findAccount(address) {
    return fetch("https://api.xrpscan.com/api/v1/account/" + address);
}

export function generateFindAccountRequest(address) {
    return "https://data.ripple.com/v2/accounts/" + address + "/balances";
}

export function generateFindTrustRequest(address) {
    return "https://api.xrpscan.com/api/v1/account/" + address + "/trustlines";
}

export function findTrustlines(address) {
    return fetch("https://api.xrpscan.com/api/v1/account/" + address + "/trustlines");
}

export function generateExchangeRates(suffix) {
    return "https://data.ripple.com/v2/exchange_rates/" + suffix;
}

export function fetchSoloMarket(data) {
    let request = {
        method: "POST",
        headers: { 
            "Content-Type": "application/json", 
            "Connection": "keep-alive", 
            "User-Agent": "PostmanRuntime/7.28.4",
        },
        body: JSON.stringify(data),
        mode: 'no-cors',
    }
    return fetch("https://api.sologenic.org/api/v1/tickers/24h", request);
}


export function getXrpUsdValue() {
    return fetch("https://api.coingecko.com/api/v3/simple/price?ids=ripple&vs_currencies=usd");
}