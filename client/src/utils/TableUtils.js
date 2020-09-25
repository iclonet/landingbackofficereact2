import React from 'react';
import {
    merge
} from 'lodash';
import numeral from 'numeral';
import moment from 'moment';
import {
    LinkContainer
} from 'react-router-bootstrap';

let defaultPaginationConfig = () => {

    let showsTotal = (start, to, total) => {
        return "";
    }

    return {
        sizePerPage: 20,
        hideSizePerPage: true,
        prePage: '<', // Previous page button text
        nextPage: '>', // Next page button text
        firstPage: '|<', // First page button text
        lastPage: '>|', // Last page button text
        alwaysShowAllBtns: true, // Always show next and previous button
        withFirstAndLast: true,
        paginationShowsTotal: showsTotal
    };
}

let defaultConfig = (options, extraOptions) => {
    var result = {
        noDataText: 'No hay registros para mostrar',
        expandRowBgColor: '#e7e7e7'
    };

    if (options !== undefined) {
        if (options.pagination) {
            result = merge(result, defaultPaginationConfig());
        }
    }

    if (extraOptions !== undefined) {
        result = merge(result, extraOptions);
    }

    return result;
}

/**
 * Agrega color al estado de la relación de dependencia.
 * 
 * @param {String} estado activo/inactivo
 */
function colorearEstadoLaboral(estado) {
	estado = convertFirstToUpperCase(estado)
	var textColor
	switch (estado) {
		case 'Activo':
			textColor = '#228B22'
			break;
		
		case 'Inactivo':
			textColor = '#FF3333'
			break;
		
		default:
			textColor = 'black'
	}

	return <span style={{ color: textColor }}>
		<b>{estado}</b>
	</span>
}


/**
 * Devuelve el número de CUIT junto a un ícono
 * para acceder al detalle de la persona correspondiente
 * 
 * @param {String} value número de CUIT a ser mostrado
 */
function cuitFormat(value) {
	let route = `/dashboard/empresas/busqueda/cuit/${value}`;

	return <span>
		{value}&nbsp;
		<LinkContainer to={route}>
			<a>&nbsp;<i className="fa fa-search"></i>&nbsp;</a>
		</LinkContainer>
	</span>;
}


/**
 * Devuelve el número de CUIL junto a un ícono
 * para acceder al detalle de la persona correspondiente
 * 
 * @param {String} value número de CUIL a ser mostrado
 */
function cuilFormat(value) {
	let route = `/dashboard/personas/busqueda/cuil/${value}`;

	return <span>
		{value}&nbsp;
		<LinkContainer to={route}>
			<a>&nbsp;<i className="fa fa-search"></i>&nbsp;</a>
		</LinkContainer>
	</span>;
}

/**
 * Devuelve la fecha en formato DD/MM/YYYY a partir de un string
 * de fecha completo
 * 
 * @param {String} value 
 */
function dateFormat(value) {
	try {
		var d = value.substring(0, 10);
		var sd = d.split('-');
		var a = sd[0];
		var m = sd[1] - 1;
		var d = sd[2];

		return moment([a, m, d]).format('DD/MM/YYYY');
	} catch (error) {
		console.error(error);
		return '-';
	}
}


function dateFormatHs(value) {
	try {
		return moment(value).format("DD/MM/YYYY HH:mm:ss");
	} catch (error) {
		console.log(error)
		return '';
	}
}


function monthFormat(value) {
    if (value === null)
        return '';
    let rst = moment().set('month', value).format('MMMM');
    rst = rst.charAt(0).toUpperCase() + rst.slice(1);
    return rst;
}


function ARSFormat(value, thousands, noDecimals) {
    if (thousands === true) {
        value /= 1000;
    }
    let format = '$ 0,0.00';
    if (noDecimals === true)
        format = '$ 0,0';

    return numeral(value).format(format);
}


function percentageFormat(value) {
    return numeral(value).format('0.00') + '%';
}


function numberFormat(value) {
    return numeral(value).format('0,0')
}

/**
 * Formateo de número con separador de miles (.)
 * 
 * @param {String} value 
 */
function formatearNumeroEntero(value) {
    return parseInt(value).toLocaleString();
}


function phoneTypeFormat(value) {
	if (value.toUpperCase() === 'FIJO')
		return <span><i className="fa fa-phone"></i>&nbsp;{value}</span>;
	if (value.toUpperCase() === 'CELULAR')
		return <span><i className="fa fa-mobile"></i>&nbsp;{value}</span>;
	return value;
}


/**
 * Comprueba si el número posee WhatsApp activo y genera un enlace
 * para abrir una conversación en WhatsApp
 * 
 * @param {String} number número de celular
 * @param {Boolean} wsp indica si el número está asociado a una cuenta de WhatsApp
 */
function phoneWhatsappFormat(number, wsp) {
	// Compruebo si el número tiene Whatsapp activo
	if (wsp) {
		// Agrego prefijo de país y elimino el cero de la característica
		let wspnumber = '549'.concat(number.substring(1, number.length));
		let route = `https://wa.me/${wspnumber}`;

		return <span>
			{number}&nbsp;&nbsp;
			<a target="_blank" href={route}>
				<i className="fa fa-whatsapp"></i>
			</a>
		</span>;
	}
	
	// No tiene Whatsapp activo, devuelvo el número solo
	return number;
}


function plusButtonFormat() {
    return <i className="fa fa-plus"></i>;
}


function stringFormat(value) {
    if (value === null)
        return '';
    if (typeof value === 'string')
        return value;
    if (typeof value === 'number')
        return value.toString();
    return '';
}


function convertJsonToString(value) {
    var array = value;
    if (array != undefined && array.length != 0) {
        var valores = ' ';
        array.forEach(val => {
            valores += ' ' + val.label + ',';
        });
        return valores.slice(0, -1);;
    }
    return JSON.stringify(array);
}

/**
 * Devuelve el texto original con la primera letra en mayúscula.
 * 
 * @param {String} value texto original
 */
function convertFirstToUpperCase(value) {
    return value.charAt(0).toUpperCase() + value.slice(1);
}


function convertTipoFiltro(value) {
    var tipoFiltroText = ''
    switch (value) {
        case '1':
            tipoFiltroText = 'Persona';
            break;
        case '2':
            tipoFiltroText = 'Empresa';
            break;
    }
    return tipoFiltroText;
}

export default {
    dateFormat,
    monthFormat,
    stringFormat,
    ARSFormat,
	percentageFormat,
	colorearEstadoLaboral,
    cuilFormat,
    cuitFormat,
    phoneTypeFormat,
    phoneWhatsappFormat,
    plusButtonFormat,
    defaultConfig,
    dateFormatHs,
    convertJsonToString,
    convertFirstToUpperCase,
    numberFormat,
    formatearNumeroEntero,
    convertTipoFiltro
}