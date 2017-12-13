import api  from '../../utils/api'
import updateSite from '../actions/index'

export default function (store) {

  const domains = store.getState().domains ? store.getState().domains : {} ;

  Object.keys(domains).forEach( site => {

    const domainData = domains[site];
    // If autoUpdate key does not exist yet, then it has not been set for the first time, we will get `undefined`,
    // so !!undefined will turn that into a boolean : false .
    const autoUpdate = !!domainData.autoUpdate;
    // The boolean domainDataHasAtLeastOneTabOpen indicates that this domain has at least a tabId key in the redux state.
    // That is, the 'tabs' key exist in this domain data, and has at least one key (keys there represent tabIds objects) inside.
    const domainDataHasAtLeastOneTabOpen =  !!((domainData || {})['tabs']) && ( Object.keys(domainData['tabs']).length > 0);
    // So if domainDataHasAtLeastOneTabOpen is false, the auto update should not be performed.

    if (autoUpdate && domainDataHasAtLeastOneTabOpen) {
      api.fetchChecksumLastUpdatedAt(site)
        .then(
          lastUpdated => store.dispatch(updateSite({site, lastUpdated}))
        )
    }
  })
}