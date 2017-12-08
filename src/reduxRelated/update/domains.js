import api  from '../../utils/api'
import updateSite from '../actions/index'

export default function (store) {

  const domains = store.getState().domains ? store.getState().domains : {} ;

  Object.keys(domains).forEach( site => {

    const domainData = domains[site];
    // If autoUpdate key does not exist yet, then it has not been set for the first time, we will get `undefined`,
    // so !!undefined will turn that into a boolean : false .
    const autoUpdate = !!domainData.autoUpdate;

    if (autoUpdate) {
      api.fetchChecksumLastUpdatedAt(site)
        .then(
          lastUpdated => store.dispatch(updateSite({site, lastUpdated}))
        )
    }
  })
}