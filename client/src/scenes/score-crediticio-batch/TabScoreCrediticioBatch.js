import React from 'react';
import PropTypes from 'prop-types';
import ScoreBatch from './components/ScoreBatch';

class TabScoreCrediticioBatch extends React.Component {

	constructor(props) {
		super(props);

		this.state = {
		};

	}

	componentWillMount() {
	}

	render() {
		return (
			<ScoreBatch
				creditoActualizado={this.props.creditoDisponible}
				returnTabFiltros={this.returnTabFiltros}
				tipoFiltro={this.state.tipoFiltro}
			/>
		);
	}
}


TabScoreCrediticioBatch.propTypes = {
	match: PropTypes.object,
}

export default TabScoreCrediticioBatch;
