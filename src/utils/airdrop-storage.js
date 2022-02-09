import Cookies from 'js-cookie'

const airdropKey = 'airdrop_list';

export function getAirdropList() {
    const ok = Cookies.get(airdropKey);
    console.log("ok = " + ok);
    return ok;
}
  
export function setAirdropList(airdropList) {
    console.log('SETTING = ' + airdropList);
    return Cookies.set(airdropKey, airdropList)
}
  
export function removeAirdropList() {
    return Cookies.remove(airdropKey)
}
  