import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button'
import api from '../../../utils/api'
import updateSite, {toggleAutoRefresh, toggleAutoUpdate} from '../../../reduxRelated/actions/index'
import {
  SET_LISTENER_WATCH_FOR_TAB_CLOSED,
  SET_LISTENER_WATCH_FOR_TAB_UPDATED
} from '../../../reduxRelated/actions/backgroundActions'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: null,
      tabId: false
    };
    this.domain = document.location.origin
  }

  handleToggleAutoRefresh = (autoRefresh) => {
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

  watchForThisTabOnCloseEvent = () => {

    const { domain } = this;
    const { dispatch } = this.props;
    // this sets initiates the alias action of type 'SET_LISTENER_WATCH_FOR_TAB_CLOSED',
    // which will setup add listener on the close event of this tab to delete the key for this tab from the redux state,
    // but only if it is not already set.
    dispatch({ type: SET_LISTENER_WATCH_FOR_TAB_CLOSED, domain })

  };

  watchForThisTabOnUpdatedEvent = () => {

    const { domain } = this;
    const { dispatch } = this.props;

    dispatch({ type: SET_LISTENER_WATCH_FOR_TAB_UPDATED, domain })

  };

  componentDidMount() {

    const {
      fetchAppLastUpdatedTimestamp,
      requestTabId,
      watchForThisTabOnCloseEvent,
      watchForThisTabOnUpdatedEvent,
    } = this;

    watchForThisTabOnCloseEvent();

    watchForThisTabOnUpdatedEvent();

    fetchAppLastUpdatedTimestamp();

    requestTabId()

  }

  neitherIsNull = (argOne, argTwo) => !(argOne === null || argTwo === null);

  render() {

    const {domains, tabs} = this.props;
    const {domain} = this;
    const thisDomainData = domains[domain];
    let lastUpdated, autoRefresh, autoUpdate;

    const {
      handleToggleAutoRefresh,
      shouldAutoRefresh,
      handleToggleAutoUpdate,
      neitherIsNull
    } = this;
    const { lastUpdated: tabLastUpdated, tabId }  = this.state;

    if (domains && thisDomainData) {
      lastUpdated = thisDomainData.lastUpdated;
      autoUpdate  = thisDomainData.autoUpdate;
      autoRefresh = (  (tabs  || {} )[tabId]  || {}  ).autoRefresh;
      autoRefresh =   !!autoRefresh ;
      shouldAutoRefresh(lastUpdated, autoRefresh);
    }

    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 24,
    };

    const autoRefreshPopupMessage = "When is on, the page will refresh automatically if it is not up to date with the app.";
    const autoUpdatePopupMessage  = "Automatically get data from the app to figure out when it is updated.";

    return (
      <div style={flexContainer}>

        <div>
          App last updated:{' '}
          <span style={{ fontWeight: 'bold' }}>
            { lastUpdated }
          </span>
        </div>

        <div>
          Tab last updated:{' '}
           <span style={{ fontWeight: 'bold' }}>
             {tabLastUpdated}
           </span>
        </div>

        <div style={{ fontWeight: 'bold' }}>
          { neitherIsNull(lastUpdated, tabLastUpdated) &&
            lastUpdated === tabLastUpdated
              ? 'UP TO DATE'
              : 'NOT UP TO DATE'
          }
        </div>

        <div title={autoRefreshPopupMessage}>
          Auto refresh:
          <ToggleButton
            value={ autoRefresh }
            onToggle={ () => handleToggleAutoRefresh(autoRefresh) }
          />
        </div>

        <div title={autoUpdatePopupMessage}>
          Automatic polling:
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