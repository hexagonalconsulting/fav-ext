export const UPDATE_SITE = 'UPDATE_SITE';

export default function updateSite({ site, lastUpdated }) {
  return {
    type: UPDATE_SITE,
    site,
    lastUpdated,
  }
}