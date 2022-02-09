import Cookies from 'js-cookie'

const filterKey = 'selected_airdrop_filter'

export function getSelectedFilter() {
  return localStorage.getItem(filterKey)
}

export function initiateFilter() {
  const selectedFilter = localStorage.getItem(filterKey);
  if (!(selectedFilter && selectedFilter != null)) {
    localStorage.setItem(filterKey, "NEW");
  }
}

export function setFilter(filter) {
  localStorage.setItem(filterKey, filter);
}


