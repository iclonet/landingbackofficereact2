import React from 'react';
import { NavItem } from 'react-bootstrap';

import whatsappLogo from '../../../../../images/whatsapp.png';
import { CONTACTO_WHATSAPP } from '../../../../../config';

/**
 * Muestra el ícono de Whatsapp, mediante el cual se llama a la API de Whatsapp
 * para iniciar una conversación con el número de la empresa.
 * 
 * Se muestra únicamente para clientes de Agildata, no así para el modo Reseller.
 */
export default class WhatsappContact extends React.Component {
	render() {
		// Compruebo si debo mostrar el ícono de Whatsapp
		if (process.env.REACT_APP_FLAVOR != "reseller") {
			return (
				<NavItem target="_blank"
					href={"https://api.whatsapp.com/send?phone=".concat(CONTACTO_WHATSAPP)}>
					<img src={whatsappLogo} alt=""/>
				</NavItem>
			);
		}
		else {
			// No corresponde mostrar el ícono para resellers
			return false;
		}
	}
}