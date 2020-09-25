import moment from 'moment';
import {
	STORAGE_KEYS,
	REPORTES_DOMAIN
} from '../config';

const Session = {
    getUser: getUser,
    setUser: setUser,
    isAuthenticated: isAuthenticated,
    getExpireDate: getExpireDate,
    getToken: getToken,
    setToken: setToken,
    clear: clear,
    isMainSite: isMainSite,
    getAccount: getAccount,
    setAccount: setAccount,
    getLogo: getLogo,
    setLogo: setLogo,
    getCompanyName: getCompanyName,
    getAccessTimes: getAccessTimes,
    incAccessTimes: incAccessTimes
};

function isAuthenticated() {
    return getToken() !== "" && getExpireDate().isAfter(moment());
}

function getToken() {
    var token = localStorage.getItem(STORAGE_KEYS.token);
    if (token === null) {
        token = "";
    }
    return token;
}

function getExpireDate() {
    var expireDate = localStorage.getItem(STORAGE_KEYS.expireDate);
    if (expireDate === null) {
        return moment();
    }
    return moment(expireDate);
}

function setToken(token, expire) {
    localStorage.setItem(STORAGE_KEYS.token, token);
    localStorage.setItem(STORAGE_KEYS.expireDate, moment().add(expire, 's').format());
}

function clear() {
    localStorage.removeItem(STORAGE_KEYS.token);
    localStorage.removeItem(STORAGE_KEYS.user);
    localStorage.removeItem(STORAGE_KEYS.expireDate);
}

function getUser() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.user));
}

function setUser(user) {
    localStorage.setItem(STORAGE_KEYS.user, JSON.stringify(user));
}

function getAccount() {
    return JSON.parse(localStorage.getItem(STORAGE_KEYS.account));
}

function setAccount(account) {
    localStorage.setItem(STORAGE_KEYS.account, JSON.stringify(account));
}

function getLogo() {
    const logoJSON = JSON.parse(localStorage.getItem(STORAGE_KEYS.logo));
    var binary = '';
    var bytes = new Uint8Array(logoJSON);
    var len = bytes.byteLength;
    for (var i = 0; i < len; i++) {
        binary += String.fromCharCode(bytes[i]);
    }
    return `data:image/JPEG;base64,${window.btoa(binary)}`;
}

function setLogo(logo) {
    localStorage.setItem(STORAGE_KEYS.logo, JSON.stringify(logo));
}

function isMainSite() {
    return window.location.host.startsWith(REPORTES_DOMAIN);
}

function getCompanyName() {
    if (!isMainSite()) {
        let account = getAccount();
        if (account != null) {
            return getAccount().cliente;
        } else {
            return "";
        }
    } else {
        return "Agil Data";
    }
}

function getAccessTimes() {
    return parseInt(localStorage.getItem(STORAGE_KEYS.accessTimes), 10) || 0;
}

function incAccessTimes() {
    let value = getAccessTimes() + 1;
    localStorage.setItem(STORAGE_KEYS.accessTimes, value);

    return value;
}


export default Session;
