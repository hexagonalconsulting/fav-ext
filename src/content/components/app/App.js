import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button'
import api from '../../../utils/api'
import TimeAgo from 'timeago-react'
import { PulseLoader } from 'react-spinners';
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

    const {domains, tabs} = this.props;
    const {domain} = this;
    const thisDomainData = domains[domain];
    let
      lastUpdated,
      autoRefresh,
      autoUpdate,
      timestampsNeitherIsNull,
      upToDateIndicatorColor,
      timestampsAreEqual;

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

      timestampsNeitherIsNull = neitherIsNull(lastUpdated, tabLastUpdated);

      shouldAutoRefresh(lastUpdated, autoRefresh, timestampsNeitherIsNull);
    }

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

    // Color code meanings, upToDateIndicatorColor will either be:
    //'#00C851' => green success
    //'#ffbb33' => orange warning
    timestampsNeitherIsNull && ( upToDateIndicatorColor = { color: timestampsAreEqual ? '#00C851' : '#ffbb33' });

    const pulseLoader = (

      <div style={{ display: 'inline-block' }}>
        <PulseLoader size={3} margin={'2px'} />
      </div>

    );

    const autoRefreshPopupMessage = "When is on, the page will refresh automatically if it is not up to date with the app.";
    const autoUpdatePopupMessage  = "Automatically get data from the app to figure out when it is updated.";
    const timestampContainerStyle = { width: 240};

    return (
      <div style={flexContainer}>

        <div style={timestampContainerStyle}>
          App last updated:{' '}
          { !!lastUpdated ? <TimeAgo datetime={lastUpdated} locale='en' style={{ fontWeight: 'bold' }}/> : pulseLoader }
        </div>

        <div style={timestampContainerStyle}>
          Tab last updated:{' '}
          { !!tabLastUpdated ? <TimeAgo datetime={tabLastUpdated} locale='en' style={{ fontWeight: 'bold' }}/> : pulseLoader }
        </div>

        <div style={ {...{ fontWeight: 'bold', width: 150, textAlign: 'center' }, ...upToDateIndicatorColor} }>
          { !timestampsNeitherIsNull && pulseLoader /* Show the pulseLoader as long either of the timestamps is null. */}
          { timestampsNeitherIsNull && (timestampsAreEqual
              ? 'UP TO DATE'
              : 'NOT UP TO DATE')
          }
        </div>

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
  const {domains} = state;
  const thereIsADomain = (domains || {} )[domain];
  return {
    domains: domains ? domains : {},
    tabs: (thereIsADomain || {})['tabs']
  }
};

export default connect(mapStateToProps)(App);