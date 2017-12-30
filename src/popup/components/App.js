import React from 'react';
import {connect} from 'react-redux';
import  {toggleShowDebugBar} from '../../reduxRelated/actions/index'
import  CustomizedToggle from '../../content/components/CustomizedToggle'

export function App({ showDebugBar, toggleShowDebugBar, domain }) {

    const POPUP_MESSAGE = 'Toggles on and off the showing of the debug bar.';
    const DESCRIPTION = 'DebugBar';
    const FAVEOD = '.dev.faveod.com';
		const NOT_RECOGNIZED_TITLE = 'The tab url does not contain the string `faveod`.';
		const NOT_RECOGNIZED_MESSAGE = 'Url was not recognized as a faveod app...';

    return(

			domain.includes(FAVEOD)
				?
				<CustomizedToggle
					popUpMessage={POPUP_MESSAGE}
					description={DESCRIPTION}
					value={ showDebugBar }
					onToggle={ () => toggleShowDebugBar({domain, showDebugBar}) }
				/>
				:
				<span title={NOT_RECOGNIZED_TITLE}>
					{NOT_RECOGNIZED_MESSAGE}
				</span>

		)
}

const mapStateToProps = (state, OwnProps) => {

  const { domain } = OwnProps ;
	const { domains, domainsIds } = state;

	const showDebugBar = domainsIds.includes(domain) ? !!domains[domain].showDebugBar : false;

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