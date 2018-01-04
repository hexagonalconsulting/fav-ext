import React, {Component} from 'react';
import PropTypes from "prop-types";
import {connect} from 'react-redux';
import api from '../../utils/api'
import TimeStampPresenter  from './TimeStampPresenter'
import UpToDateIndicator  from './UpToDateIndicator'
import CustomizedToggle  from './CustomizedToggle'
import updateSite, {toggleAutoRefresh, toggleAutoUpdate} from '../../reduxRelated/actions/index'
import {
  SET_LISTENER_WATCH_FOR_TAB_CLOSED,
  SET_LISTENER_WATCH_FOR_TAB_UPDATED
} from '../../reduxRelated/actions/backgroundActions'

export class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: null,
      tabId: false
    };

    this.requestTabId                  = this.requestTabId.bind(this);
    this.fetchAppLastUpdatedTimestamp  = this.fetchAppLastUpdatedTimestamp.bind(this);
    this.watchForThisTabOnCloseEvent   = this.watchForThisTabOnCloseEvent.bind(this);
    this.watchForThisTabOnUpdatedEvent = this.watchForThisTabOnUpdatedEvent.bind(this);

  }

  handleToggleAutoRefresh = (autoRefresh) => {
    this.props.dispatch( toggleAutoRefresh({ autoRefresh: !autoRefresh }) );
  };

  handleToggleAutoUpdate =  autoUpdate  => {
    const { dispatch, domain } = this.props;
    dispatch( toggleAutoUpdate({ site: domain , autoUpdate: !autoUpdate }) );
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

  fetchAppLastUpdatedTimestamp() {

    const { dispatch, domain } = this.props;

    api.fetchChecksumLastUpdatedAt(domain)
      .then(
        lastUpdated => {

          dispatch(updateSite({ site: domain , lastUpdated }));
          this.setState({lastUpdated})

        }
      );
  };

  requestTabId() {
    // This ask the background page, (in our case a script) for the tab id in which the component is running.
    chrome.runtime.sendMessage({ request: "get tabId" }, ({tabId}) => {
      this.setState({tabId});
    })
  };

  watchForThisTabOnCloseEvent() {

    const { dispatch, domain } = this.props;
    // this sets initiates the alias action of type 'SET_LISTENER_WATCH_FOR_TAB_CLOSED',
    // which will setup add listener on the close event of this tab to delete the key for this tab from the redux state,
    // but only if it is not already set.
    dispatch({ type: SET_LISTENER_WATCH_FOR_TAB_CLOSED, domain })

  };

  watchForThisTabOnUpdatedEvent() {
    // this is very similar to watchForThisTabOnCloseEvent(), but for the action SET_LISTENER_WATCH_FOR_TAB_UPDATED.

    const { dispatch, domain } = this.props;

    dispatch({ type: SET_LISTENER_WATCH_FOR_TAB_UPDATED, domain })

  };

  componentDidMount() {

    const {
      fetchAppLastUpdatedTimestamp,
      requestTabId,
      watchForThisTabOnCloseEvent,
      watchForThisTabOnUpdatedEvent,
    } = this;

    requestTabId();

    watchForThisTabOnCloseEvent();

    watchForThisTabOnUpdatedEvent();

    fetchAppLastUpdatedTimestamp();

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

    const AUTO_REFRESH_POPUP_MESSAGE = 'When is on, the page will refresh automatically if it is not up to date with the app.';
    const AUTO_UPDATE_POPUP_MESSAGE  = 'Automatically get data from the app to figure out when it is updated.';
    const AUTO_UPDATE_DESCRIPTION    = 'Automatic polling';
    const AUTO_REFRESH_DESCRIPTION   = 'Auto refresh';

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

        <CustomizedToggle
          popUpMessage={AUTO_REFRESH_POPUP_MESSAGE}
          description={AUTO_REFRESH_DESCRIPTION}
          value={ autoRefresh }
          onToggle={ () => handleToggleAutoRefresh(autoRefresh) }
        />

        <CustomizedToggle
          popUpMessage={AUTO_UPDATE_POPUP_MESSAGE}
          description={AUTO_UPDATE_DESCRIPTION}
          value={ autoUpdate }
          onToggle={ () => handleToggleAutoUpdate(autoUpdate)  }
        />

      </div>
    );
  }
}

App.propTypes = {
  domain: PropTypes.string.isRequired,
  autoUpdate: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.string,
  tabs: PropTypes.object.isRequired,
  tabsIds: PropTypes.array.isRequired,
};

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
    tabsIds,
    domain
  }
};

export default connect(mapStateToProps)(App);