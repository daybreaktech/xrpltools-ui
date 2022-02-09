export function getTokens() {
    return fetch("https://xrpldata.com/api/v1/tokens");
}