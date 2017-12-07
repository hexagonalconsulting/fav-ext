import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button'
import api from '../../../utils/api'
import updateSite, {toggleAutoRefresh} from '../../../reduxRelated/actions/index'

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

  shouldAutoRefresh = (lastUpdated, autoRefresh) => {
    const { lastUpdated: tabLastUpdated }  = this.state;
    if (
      !(lastUpdated === null || tabLastUpdated === null) && // Only if neither is null,
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

  render() {

    const {domains, tabs} = this.props;
    const {domain} = this;
    let lastUpdated, autoRefresh;

    const { _toggleAutoRefresh, shouldAutoRefresh } = this;
    const { lastUpdated: tabLastUpdated, tabId }  = this.state;

    if (domains && domains[domain]) {
      lastUpdated = domains[domain].lastUpdated;
      autoRefresh = (  (tabs  || {} )[tabId]  || {}  ).autoRefresh;
      autoRefresh =   !!autoRefresh ;
      shouldAutoRefresh(lastUpdated, autoRefresh);
    }


    return (
      <div>
        App last updated: { lastUpdated }, Tab last updated: {tabLastUpdated} {lastUpdated === tabLastUpdated && 'Up to date'}, Auto refresh :
        <ToggleButton
          value={ autoRefresh }
          onToggle={ () => _toggleAutoRefresh(autoRefresh) }
        />
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