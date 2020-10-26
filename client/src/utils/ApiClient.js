import Session from './Session';
import {
    API_BASE,
    API_VERSION,
    HTTP_METHODS
} from '../config';
import Validations from './Validations';

function authenticate(userName, pass) {
    Session.clear();
    return call(HTTP_METHODS.post, 'account/authenticate', {
        "username": userName,
        "password": pass
    }, {}).then(function (response) {
        if (response !== undefined && response.access_token !== null) {
            Session.setToken(response.access_token, response.expires_in);

            Session.setUser({
                userName: response.username,
                isAdmin: Validations.userIsAdmin(response.roles)
            });
            return {
                success: true
            };
        } else {
            return {
                success: false,
                reason: ''
            };
        }
    });
}

/**
 * Utilizado cuando el usuario solicita un blanqueo de contraseña
 * 
 * @param {*} userName 
 * @param {*} email 
 */
function recoverPassword(userName, email) {
    return call(HTTP_METHODS.get, 'reset/account/requestPasswordReset/' + email + "?username=" + userName);
}

/**
 * Fuerzo el blanqueo de la clave para el usuario indicado.
 * 
 * @param {String} userName
 */
function createSecurePassword(userName) {
	let body = {
	    username: userName
	};

    return call(HTTP_METHODS.post, 'reset/account/requestCreateSecurePassword', body);
}

/**
 * Busca una persona en la api rest
 */
function searchPerson(option, query, nombre, provincia, nacionalidad, edadgt, edadlt, page, per_page, modo_busqueda) {
    let url = '';
    if (modo_busqueda === "full") {
        url = `searchFull/?${option}=${escape(query)}`;
    } else {
        url = `person/?${option}=${escape(query)}`;
    }

    if (nombre !== undefined && nombre.length > 0) {
        url += `&nombre=${escape(nombre)}`;
    }

    if (provincia !== undefined && provincia.length > 0) {
        url += `&provincia=${escape(provincia)}`;
    }
    if (nacionalidad !== undefined && nacionalidad.length > 0) {
        url += `&nacionalidad=${escape(nacionalidad)}`;
    }
    if (edadgt !== undefined && edadgt > 0) {
        url += `&edadgt=${edadgt}`;
    }
    if (edadlt !== undefined && edadlt > 0) {
        url += `&edadlt=${edadlt}`;
    }

    if (page !== undefined) {
        url += `&page=${page}`;
    }
    if (per_page !== undefined) {
        url += `&per_page=${per_page}`;
    }

	// Agrego parámetro consulta web
	url += `&web_request=true`;

	return apiCall(HTTP_METHODS.get, url);
}

function getPerson(cuil) {
    return apiCall(HTTP_METHODS.get, `person/${cuil}?web_request=true`);
}

function getPersonPublic(token) {
    return call(HTTP_METHODS.get, `arco/${token}`);
}

function searchCompanies(option, query, page, per_page, modo_busqueda) {
    let url = '';
    if (modo_busqueda === "full") {
        url = `searchFull/?${option}=${query}`;
    } else {
        url = `company/?${option}=${query}`;
    }
    if (page !== undefined) {
        url += `&page=${page}`;
    }
    if (per_page !== undefined) {
        url += `&per_page=${per_page}`;
    }

	// Agrego parámetro consulta web
	url += `&web_request=true`;

	return apiCall(HTTP_METHODS.get, url);
}

function getCompany(cuit) {
    return apiCall(HTTP_METHODS.get, `company/${cuit}?web_request=true`);
}

function searchCarOwners(option, query, page, per_page) {
    var url = `automotor/?${option}=${query}`;
    if (page !== undefined) {
        url += `&page=${page}`;
    }
    if (per_page !== undefined) {
        url += `&per_page=${per_page}`;
    }

	// Agrego parámetro consulta web
	url += `&web_request=true`;

    return apiCall(HTTP_METHODS.get, url);
}


function searchTelefonos(option, query, page, per_page) {
    var url = `telefono/?tel=${query}`;
    if (page !== undefined) {
        url += `&page=${page}`;
    }
    if (per_page !== undefined) {
        url += `&per_page=${per_page}`;
    }

	// Agrego parámetro consulta web
	url += `&web_request=true`;

    return apiCall(HTTP_METHODS.get, url);
}

function getAccount() {
    return apiCall(HTTP_METHODS.get, 'account/me/client');
}

function getClientLogo(idCliente) {
    return baseCall(HTTP_METHODS.get, API_BASE + `clientes/logo/${idCliente}`, null, {
            "Authorization": `Bearer ${Session.getToken()}`
        })
        .then(function (res) {
            if (res.file) {
                if (res.file.length > 0) {
                    Session.setLogo(res.file);
                    return true;
                }
            }
            const error = new Error("Cannot load logo");
            throw error;
        });
}

function getClient(idCliente) {
    return baseCall(HTTP_METHODS.get, API_BASE + `clientes/${idCliente}`, null, {
        "Authorization": `Bearer ${Session.getToken()}`
    });
}

function getAllClients() {
    return baseCall(HTTP_METHODS.get, API_BASE + `clientes`, null, {
        "Authorization": `Bearer ${Session.getToken()}`
    });
}

function changePassword(newPass) {
    let body = {
        usuario: {
            newPassword: newPass
        }
    };
    return apiCall(HTTP_METHODS.put, 'account/me/changepassword', body);
}

function getListUsers() {
    return apiCall(HTTP_METHODS.get, 'account/me/listuser');
}

function getUsers(clienteId) {
    return baseCall(HTTP_METHODS.get, API_BASE + `users/?clienteId=${clienteId}&max=1000`, null, {
        "Authorization": `Bearer ${Session.getToken()}`
    });
}

function getCurrentUser() {
    return apiCall(HTTP_METHODS.get, 'account/me');
}

function completeUserData() {
    return apiCall(HTTP_METHODS.get, 'account/me/completeUserData');
}
/**
 * Busca el log de consultas para el usuario especificado entre las fechas indicadas
 * @param {Number} user_id id del usuario a buscar
 * @param {String} fecha_desde fecha en formato iso
 * @param {String} fecha_hasta fecha en formato iso
 */
function getLog(user_id, fecha_desde, fecha_hasta,
	porServicio, servicio, cliente, consumeCredito, agruparPorUsuario) {

    let idParam = "";
    let idServicio = "";
    let idCliente = "";
    let consumeCreditoParam = "";

	if (user_id > 0) {
        idParam = `id=${user_id}&`;
    }
    if (servicio > 0) {
        idServicio = `&servicio=${servicio}&`;
    }
    if (cliente > 0) {
        idCliente = `cliente=${cliente}&`;
    }
    if (consumeCredito === '1') {
        consumeCreditoParam = `consumeCredito=true&`
    }

	return apiCall(HTTP_METHODS.get,
		`log/?${consumeCreditoParam}${idParam}${idCliente}${idServicio}from=${fecha_desde}&to=${fecha_hasta}&porServicio=${porServicio}&agruparPorUsuario=${agruparPorUsuario}`);
}

function createUser(user) {
    let body = {
        usuario: user
    };
    return apiCall(HTTP_METHODS.post, 'account/me/create', body);
}

function createUserDemo(user) {
    let body = {
        usuario: user
    };
    return call(HTTP_METHODS.post, 'demo/account/create', body);
}

function completeUserData(user) {
    let body = {
        usuario: user
    };
    return apiCall(HTTP_METHODS.post, 'account/me/completeUserData', body);
}

function modifyUser(user) {
    let body = {
        usuario: user
    };
    return apiCall(HTTP_METHODS.put, 'account/me/update', body);
}

function deleteUser(user) {
    let body = {
        usuario: user
    };
    return apiCall(HTTP_METHODS.put, 'account/me/delete', body);
}

function getNotifications() {
    return apiCall(HTTP_METHODS.get, 'notificacion');
}

function markNotificationAsRead(id) {
    let body = {
        notificacion: {
            id: id
        }
    };

    return apiCall(HTTP_METHODS.post, 'notificacion/lectura', body);
}

function requestExtraInfo(id, block, subBlock) {
    let body = {
        idLog: id,
        bloque: block,
        subBloque: subBlock
    };

    return apiCall(HTTP_METHODS.post, 'infoextra', body);
}

function getLocalidades() {
    return apiCall(HTTP_METHODS.get, `localidad`);
}

function getFiltros() {
    return apiCall(HTTP_METHODS.get, 'fitro/getFiltros');
}

function getFiltrosOption(id, nombre) {
    return apiCall(HTTP_METHODS.get, `fitro/getFiltrosOption?id=${id}&nombre=${nombre}`);
}

function getCredito() {
    return apiCall(HTTP_METHODS.get, 'busquedaEnriquecida/getCredito');
}

function getConsultasEnriquecimientos() {
    return apiCall(HTTP_METHODS.get, 'busquedaEnriquecida/findAllConsultasEnriquecidas');
}

function filtroBusqueda(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/procesarFiltro', body);
}

function procesarFile(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/procesarArchivo', body);
}

/**
 * Envío el archivo en una solicitud multipart
 * 
 * @param {*} data 
 */
function procesarScoreBatch(data) {
	let formData = new FormData()
	formData.append('file', data)

    return apiCall(HTTP_METHODS.post, 'score?source=scoreNav', formData, true);
}

function presupuestarConsulta(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/presupuestarConsulta', body);
}

function obtenerResumenResultados(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/obtenerResumenResultados', body);
}

function descargarResultadoConsulta(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/descargarResultadoConsulta', body);
}

function descargarSegmentacion(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/descargarSegmentacion', body);
}

function descargarSegmentacionEmpresa(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/descargarSegmentacionEmpresa', body);
}

function deleteConsultaEnriquecida(data) {
    let body = {
        data: data
    };
    return apiCall(HTTP_METHODS.post, 'busquedaEnriquecida/deleteConsultaEnriquecida', body);
}

function getServiciosByCliente(idCliente) {
    return baseCall(HTTP_METHODS.get, API_BASE + `tipoServicios/getServiciosByCliente?id=${idCliente}`, null, {
        "Authorization": `Bearer ${Session.getToken()}`
    });
}

function getListBloqueEnriquecimientoByTipo(tipo) {
    return apiCall(HTTP_METHODS.get, `bloqueEnriquecimiento?tipo=${tipo}`);
}

/**
 * Envío la solicitud de informe previsional sobre el cuil indicado
 * @param {string} cuil 
 */
function solicitarInformePrevisional(cuil) {
    return apiCall(HTTP_METHODS.post, `historialPrevisional/?cuil=${cuil}`);
}


/**
 * internal functions
 */

function apiCall(method, url, body, isMultiPart) {

    if (Session.isAuthenticated() === true) {
		return call(
			method,
			url,
			body,
			{
				"Authorization": `Bearer ${Session.getToken()}`
			},
			isMultiPart);
    } else {
        const error = new Error('Not authenticated');
        error.status = 401;
        throw error;
    }
}

function call(method, url, body, headers, isMultiPart) {

    return baseCall(method, API_BASE + API_VERSION + url, body, headers, isMultiPart);
}

function baseCall(method, url, body, headers, isMultiPart) {

	if (!isMultiPart && method !== HTTP_METHODS.get) {
        if (body === undefined)
			body = '';
		
		body = JSON.stringify(body);
    }

    return fetch(url, {
            method: method,
            accept: "application/json",
            headers: headers,
            body: body
        })
        .then(checkStatus)
        .then(toJson);
}

function checkStatus(response) {

    if (response.status === 401 || response.status === 412 || response.status === 418) {
        Session.clear();
    }
    if (response.status >= 200 && response.status < 300) {
        return response;
    }
    const error = new Error(`HTTP Error ${response.statusText}`);
    error.status = response.status;
    error.statusText = response.statusText;
    error.response = response.json();
    if (response.headers.get('Exception') !== undefined) {
        error.message = response.headers.get('Exception');
	}
	if (response.status === 412) {
		error.message = response.message
	}

    throw error;
}

function toJson(response) {
    return response.json();
}

const ApiClient = {
	authenticate,
	changePassword,
	completeUserData,
	createSecurePassword,
	createUser,
	createUserDemo,
	deleteConsultaEnriquecida,
	deleteUser,
	descargarResultadoConsulta,
	descargarSegmentacion,
	descargarSegmentacionEmpresa,
	filtroBusqueda,
	getAccount,
	getAllClients,
	getClient,
	getClientLogo,
	getCompany,
	getConsultasEnriquecimientos,
	getCredito,
	getCurrentUser,
	getFiltros,
	getFiltrosOption,
	getListBloqueEnriquecimientoByTipo,
	getListUsers,
	getLocalidades,
	getLog,
	getNotifications,
	getPerson,
	getPersonPublic,
	getServiciosByCliente,
	getUsers,
	markNotificationAsRead,
	modifyUser,
	obtenerResumenResultados,
	presupuestarConsulta,
	procesarFile,
	recoverPassword,
	requestExtraInfo,
	searchCarOwners,
	searchCompanies,
	searchPerson,
	searchTelefonos,
	procesarScoreBatch,
	solicitarInformePrevisional,
};


export default ApiClient;
