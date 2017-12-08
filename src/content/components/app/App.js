import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button'
import api from '../../../utils/api'
import updateSite, {toggleAutoRefresh, toggleAutoUpdate} from '../../../reduxRelated/actions/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: null,
      tabId: false
    };
    this.domain = document.location.origin
  }

  _toggleAutoRefresh = (autoRefresh) => {
    this.props.dispatch( toggleAutoRefresh({ site: this.domain , autoRefresh: !autoRefresh }) );
  };

  handleToggleAutoUpdate =  autoUpdate  => {
    this.props.dispatch( toggleAutoUpdate({ site: this.domain , autoUpdate: !autoUpdate }) );
  };

  shouldAutoRefresh = (lastUpdated, autoRefresh) => {
    const { lastUpdated: tabLastUpdated }  = this.state;
    const { neitherIsNull }  = this;

    if (
       neitherIsNull(lastUpdated, tabLastUpdated) &&        // Only if neither is null,
       (autoRefresh && ( lastUpdated !== tabLastUpdated) )  // and auto refresh is true and they are different.
    ) {
      location.reload(true);
    }

  };

  fetchAppLastUpdatedTimestamp = () =>  {
    api.fetchChecksumLastUpdatedAt(this.domain)
      .then(
        lastUpdated => {

          this.props.dispatch(updateSite({ site: this.domain , lastUpdated }));
          this.setState({lastUpdated})

        }
      );
  };

  requestTabId = () => {
    // This ask the background page, (in our case a script) for the tab id in which the component is running.
    chrome.runtime.sendMessage({ request: "get tabId" }, ({tabId}) => {
      this.setState({tabId});
    })
  };

  componentDidMount() {

    const {fetchAppLastUpdatedTimestamp, requestTabId} = this;

    fetchAppLastUpdatedTimestamp();

    requestTabId()

  }

  neitherIsNull = (argOne, argTwo) => !(argOne === null || argTwo === null);

  render() {

    const {domains, tabs} = this.props;
    const {domain} = this;
    let lastUpdated, autoRefresh, autoUpdate;

    const {
      _toggleAutoRefresh,
      shouldAutoRefresh,
      handleToggleAutoUpdate,
      neitherIsNull
    } = this;
    const { lastUpdated: tabLastUpdated, tabId }  = this.state;

    if (domains && domains[domain]) {
      lastUpdated = domains[domain].lastUpdated;
      autoUpdate  = domains[domain].autoUpdate;
      autoRefresh = (  (tabs  || {} )[tabId]  || {}  ).autoRefresh;
      autoRefresh =   !!autoRefresh ;
      shouldAutoRefresh(lastUpdated, autoRefresh);
    }


    return (
      <div>
        App last updated: { lastUpdated }, Tab last updated: {tabLastUpdated} {' '}
        <span style={{ fontWeight: 'bold' }}>
          { neitherIsNull(lastUpdated, tabLastUpdated) &&
            lastUpdated === tabLastUpdated
              ? 'UP TO DATE'
              : 'NOT UP TO DATE'
          }
        </span>,

        <div>
          Auto refresh :
          <ToggleButton
            value={ autoRefresh }
            onToggle={ () => _toggleAutoRefresh(autoRefresh) }
          />
        </div>
        <div>
          Setup polling to get when this app was last updated:
          <ToggleButton
            value={ autoUpdate }
            onToggle={ () => handleToggleAutoUpdate(autoUpdate) }
          />
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {

  const domain = document.location.origin;
  const {domains} = state;
  const thereIsADomain = (domains || {} )[domain];
  return {
    domains: domains ? domains : {},
    tabs: (thereIsADomain || {})['tabs']
  }
};

export default connect(mapStateToProps)(App);