import api  from '../../utils/api'
import updateSite from '../actions/index'

export default function (store) {

  const {domains, domainsIds} = store.getState() ;

  domainsIds.forEach( site => {

    const domainData = domains[site];
    // If autoUpdate key does not exist yet, then it has not been set for the first time, we will get `undefined`,
    // so !!undefined will turn that into a boolean : false .
    const autoUpdate = !!domainData.autoUpdate;

    const domainDataHasAtLeastOneTabOpen =  domainData.tabsIds.length > 0;

    if (autoUpdate && domainDataHasAtLeastOneTabOpen) {
      api.fetchChecksumLastUpdatedAt(site)
        .then(
          lastUpdated => store.dispatch(updateSite({site, lastUpdated}))
        )
    }
  })
}