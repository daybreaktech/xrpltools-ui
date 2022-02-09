import Cookies from 'js-cookie'
import { getAirdropsIds } from '@/api/airdrops-api'

const airdropVisitKey = 'airdrop_visit';

export function initVisits(callback) {
    const visits = getVisitsToArray();
    getAirdropsIds()
    .then(response => response.json()).then(data => {
          if (visits != null && visits.length > 0) {
            let validVisits = visits.filter(v => {
                const visit = data.filter(vit =>  vit == v);
                return visit.length;
            });
            updateVisits(validVisits);
            callback(validVisits);
          } else {
              callback(null);
          }
    })
}

export function getVisitsToArray() {
    const visitsString = getVisits();

    if (visitsString && visitsString != null && visitsString != '') {
        return visitsString.split(",");
    }
    return [];
}

export function getVisits() {
    return localStorage.getItem(airdropVisitKey);
}
  
export function putVisit(airdropId) {
    const air = parseInt(airdropId);
    let visits = getVisitsToArray();
    const visit = visits.filter(v => v == air);

    if (!visit.length) {
        if (visits == null) {
            visits = [];
        }

        visits.push(air);
        updateVisits(visits);
    }
}

function updateVisits(visits) {
    const visitsToString = visits.join(",");
    localStorage.setItem(airdropVisitKey, visitsToString);
}

export function removeVisits() {
    return localStorage.removeItem(airdropVisitKey)
}
  