import React, {Component} from 'react';
import {connect} from 'react-redux';
import  {toggleShowDebugBar} from '../../reduxRelated/actions/index'
import  CustomizedToggle from '../../content/components/CustomizedToggle'

export class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const {
    	showDebugBar,
			toggleShowDebugBar,
			domain
    } = this.props;
    const POPUP_MESSAGE = 'Toggles on and off the showing of the debug bar.';
    const DESCRIPTION = 'DebugBar';

    return(

			<CustomizedToggle
				popUpMessage={POPUP_MESSAGE}
				description={DESCRIPTION}
				value={ showDebugBar }
				onToggle={ () => toggleShowDebugBar({domain, showDebugBar}) }
			/>

		)
  }
}

const mapStateToProps = (state, OwnProps) => {

  const { domain } = OwnProps ;
	const { domains, domainsIds } = state;

	let showDebugBar;

	if ( domainsIds.includes(domain) ) {
		showDebugBar = !!domains[domain].showDebugBar;

	} else {
		showDebugBar = false;
	}

	return {
		showDebugBar
	};
};

function mapDispatchToProps(dispatch) {
  return {
		toggleShowDebugBar:  ({domain, showDebugBar}) => dispatch( toggleShowDebugBar({ site: domain, showDebugBar: !showDebugBar }) )
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);