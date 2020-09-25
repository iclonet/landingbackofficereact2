import React from 'react';
import PropTypes from 'prop-types';


/**
 * Muestra el contenido resaltado en un color en caso de existir el dato.
 * 
 */
export default class StrongText extends React.Component {

	render() {
		// Compruebo si debo mostrar el texto en color
		if (this.props.text && this.props.text !== '-') {
			return (
				<span style={{color: this.props.color}}>
					<b>{this.props.text}</b>
				</span>
			);
		}
		else {
			// El texto no debe ser resaltado
			return <span>{this.props.text}</span>;
		}
	}

}

StrongText.propTypes = {
	color: PropTypes.string,
	text: PropTypes.string,
}

StrongText.defaultProps = {
	color: 'red'
};