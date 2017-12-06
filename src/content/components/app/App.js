import React, {Component} from 'react';
import {connect} from 'react-redux';
import ToggleButton from 'react-toggle-button'
import api from '../../../utils/api'
import updateSite from '../../../reduxRelated/actions/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: null,
      autoRefresh:  false
    }
  }

  toggleAutoRefresh = () => {
    const { autoRefresh} = this.state;
    this.setState({ autoRefresh: !autoRefresh })
  };

  shouldAutoRefresh = (lastUpdated) => {
    const { lastUpdated: tabLastUpdated, autoRefresh }  = this.state;

    if ( autoRefresh && ( lastUpdated !== tabLastUpdated ) ) {
      location.reload(true)
    }

  };

  componentWillMount() {

    api.fetchChecksumLastUpdatedAt(document.location.origin)
      .then(
        lastUpdated => {

          const site = document.location.origin;
          this.props.dispatch(updateSite({ site , lastUpdated }));
          this.setState({lastUpdated})

        }
      );
  }

  render() {

    const domains = this.props.domains;
    const domain = document.location.origin;
    const lastUpdated = domains[domain] ? domains[domain].lastUpdated : null;
    const { lastUpdated: tabLastUpdated, autoRefresh }  = this.state;
    const { toggleAutoRefresh, shouldAutoRefresh } = this;

    shouldAutoRefresh(lastUpdated);

    return (
      <div>
        App last updated: { lastUpdated }, Tab last updated: {tabLastUpdated} {lastUpdated === tabLastUpdated && 'Up to date'}, Auto refresh :
        <ToggleButton
          value={ autoRefresh }
          onToggle={ toggleAutoRefresh }
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    domains: state.domains ? state.domains : {}
  };
};

export default connect(mapStateToProps)(App);