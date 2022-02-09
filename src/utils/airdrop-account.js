import Cookies from 'js-cookie'

const airdropAccountKey = 'airdrop_account';

export function getSavedAirdropAccount() {
    return localStorage.getItem(airdropAccountKey);
}
  
export function setAirdropAccount(account) {
    return localStorage.setItem(airdropAccountKey, account);
}
  
export function removeAirdropAccount() {
    return localStorage.removeItem(airdropAccountKey);
}

export function getSavedAccounts() {
    const accounts = localStorage.getItem("accounts");
    const accountsArray = accounts && accounts != null ? JSON.parse(accounts) : [];
    return accountsArray
}

export function getAccount(account) {
    return fetch("https://api.xrpscan.com/api/v1/account/" + account, { 
        method: "GET"
    });
}

export function getAccountTrustlines(account) {
    return fetch("https://api.xrpscan.com/api/v1/account/" + account + "/trustlines2", { 
        method: "GET"
    });
}

export function getAccountTrustlinesRipple(account) {
    return fetch("https://data.ripple.com/v2/accounts/" + account + "/balances", { 
        method: "GET"
    });
}
  