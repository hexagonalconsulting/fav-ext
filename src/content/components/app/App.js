import React, {Component} from 'react';
import {connect} from 'react-redux';
import api from '../../../utils/api'
import updateSite from '../../../reduxRelated/actions/index'

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lastUpdated: null
    }
  }

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
    const { lastUpdated: tabLastUpdated }  = this.state;

    return (
      <div>
        App last updated: { lastUpdated }, Tab last updated: {tabLastUpdated} {lastUpdated === tabLastUpdated && 'Up to date'}
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