const trustlineFilterKey = 'trustline_filter';

export function getTrustlineFilter() {
    return localStorage.getItem(trustlineFilterKey);
}
  
export function setTrustlineFilter(value) {
    return localStorage.setItem(trustlineFilterKey, value);
}
  
export function removeTrustlineFilter() {
    return localStorage.removeItem(trustlineFilterKey);
}
