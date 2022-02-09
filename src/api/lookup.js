export function getTrustlines(address) {
    return fetch("https://api.xrpscan.com/api/v1/account/" + address + "/trustlines");
}

export function getOblications(issuerAddress) {
    return fetch("https://api.xrpscan.com/api/v1/account/" + issuerAddress + "/obligations");
}