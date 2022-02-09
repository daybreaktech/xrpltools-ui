export function fetchXrpMarket() {
    return fetch("https://api.coingecko.com/api/v3/coins/ripple/market_chart?vs_currency=usd&days=30&interval=daily");
}

export function fetchXrplTopMarkets() {
    return fetch("https://data.ripple.com/v2/network/top_markets?limit=15");
}