import {dispatch} from 'redux'
import api  from '../../utils/api'
import updateSite  from '../actions/'

export default function (store) {
  console.log('executing update');
  console.log(store);
  const domains = store.getState.domains ? store.getState.domains : {} ;
  Object.keys(domains).forEach( key => (
    api.fetchChecksumLastUpdatedAt(key)
      .then(
        lastUpdated => dispatch( updateSite({key, lastUpdated}) )
      )
  ))
}