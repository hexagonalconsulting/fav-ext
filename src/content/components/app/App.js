import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button'
import api from '../../../utils/api'
import TimeStampPresenter  from './TimeStampPresenter'
import UpToDateIndicator  from './UpToDateIndicator'
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
    this.props.dispatch( toggleAutoRefresh({ autoRefresh: !autoRefresh }) );
  };

  handleToggleAutoUpdate =  autoUpdate  => {
    this.props.dispatch( toggleAutoUpdate({ site: this.domain , autoUpdate: !autoUpdate }) );
  };

  shouldAutoRefresh = (lastUpdated, autoRefresh, timestampsNeitherIsNull) => {
    const { lastUpdated: tabLastUpdated }  = this.state;

    if (
       timestampsNeitherIsNull &&        // Only if neither is null,
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

    const {
      autoUpdate,
      lastUpdated,
      tabs,
      tabsIds
    } = this.props;

    let
      autoRefresh,
      timestampsNeitherIsNull,
      timestampsAreEqual;

    const {
      handleToggleAutoRefresh,
      shouldAutoRefresh,
      handleToggleAutoUpdate,
      neitherIsNull
    } = this;

    const { lastUpdated: tabLastUpdated, tabId }  = this.state;

    timestampsNeitherIsNull = neitherIsNull(lastUpdated, tabLastUpdated);


    if (tabsIds.includes(tabId)) {
      autoRefresh =  !!tabs[tabId].autoRefresh
    } else {
      autoRefresh = false;
    }

    shouldAutoRefresh(lastUpdated, autoRefresh, timestampsNeitherIsNull);

    const flexContainer = {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingLeft: 24,
      paddingRight: 24,
      paddingBottom: 10,
      paddingTop: 10,
    };

    timestampsAreEqual = lastUpdated === tabLastUpdated;

    const autoRefreshPopupMessage = "When is on, the page will refresh automatically if it is not up to date with the app.";
    const autoUpdatePopupMessage  = "Automatically get data from the app to figure out when it is updated.";

    return (
      <div style={flexContainer}>

        <TimeStampPresenter
          description={'App last updated'}
          timeStamp={lastUpdated}
        />

        <TimeStampPresenter
          description={'Tab last updated'}
          timeStamp={tabLastUpdated}
        />

        <UpToDateIndicator
          timestampsNeitherIsNull={timestampsNeitherIsNull}
          timestampsAreEqual={timestampsAreEqual}
        />

        <div title={autoRefreshPopupMessage}>
          Auto refresh:{' '}
          <div style={{ display: 'inline-block' }}>
            <ToggleButton
              value={ autoRefresh }
              onToggle={ () => handleToggleAutoRefresh(autoRefresh) }
            />
          </div>
        </div>

        <div title={autoUpdatePopupMessage}>
          Automatic polling:{' '}
          <div style={{ display: 'inline-block' }}>
            <ToggleButton
              value={ autoUpdate }
              onToggle={ () => handleToggleAutoUpdate(autoUpdate) }
            />
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = (state) => {
  const domain = document.location.origin;
  const {domains, domainsIds, tabs, tabsIds} = state;

  let lastUpdated,  autoUpdate;

  if ( domainsIds.includes(domain) ) {
    autoUpdate = !!domains[domain].autoUpdate;
    lastUpdated = domains[domain].lastUpdated ? domains[domain].lastUpdated : null
  } else {
    lastUpdated = null;
    autoUpdate = false
  }

  return {
    autoUpdate,
    lastUpdated,
    tabs,
    tabsIds
  }
};

export default connect(mapStateToProps)(App);