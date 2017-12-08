import api  from '../../utils/api'
import updateSite from '../actions/index'

export default function (store) {
  const domains = store.getState().domains ? store.getState().domains : {} ;
  Object.keys(domains).forEach( site => (
    api.fetchChecksumLastUpdatedAt(site)
      .then(
        lastUpdated => store.dispatch( updateSite({site, lastUpdated}) )
      )
  ))
}