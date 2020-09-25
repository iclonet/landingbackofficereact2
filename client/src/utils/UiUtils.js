import EventBus from 'eventing-bus';
import {
	EVENT_KEYS,
	AGD_DOMAIN
} from '../config';

function showProgress(show) {
    EventBus.publish(EVENT_KEYS.BLOCK_UI, show);
}

function navigateTo(url) {
    EventBus.publish(EVENT_KEYS.NAVIGATE_TO, url);
}

function showAlert(title, message) {
    EventBus.publish(EVENT_KEYS.SHOW_ALERT, title, message);
}

function showError(error) {
    let message = error.message;
    if (!error.handled) {
        if (error.status === 402) {
            message = 'Consulte su plan de abono';
        } else if (error.status === 418) {
            message = `Usted ha iniciado sesion en otro equipo con el mismo usuario, o bien no ha cerrado la ultima sesion correctamente.\nPara consultas, comuníquese con atención al cliente al 011-52365371 o soporte@${AGD_DOMAIN}`;
            showProgress(false)
        } else {
            console.log(error);
            message = 'Ocurrió un error inesperado';
        }
    }
    EventBus.publish(EVENT_KEYS.SHOW_ALERT, 'Error', message);
}

function handledError(message) {
    let error = new Error(message);
    error.handled = true;
    return error;
}

function orderByAlf(list, valor) {
    list.sort(function (a, b) {
        if (a[valor] > b[valor]) {
            return 1;
        }
        if (a[valor] < b[valor]) {
            return -1;
        }
        // a must be equal to b
        return 0;
    });
    return list;
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
}

export default {
    showProgress,
    navigateTo,
    showAlert,
    handledError,
    showError,
    orderByAlf,
    capitalizeFirstLetter
}
