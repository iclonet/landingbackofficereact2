import { some } from 'lodash';

function email(value) {
    let tester = /^[-!#$%&'*+\/0-9=?A-Z^_a-z{|}~](\.?[-!#$%&'*+\/0-9=?A-Z^_a-z`{|}~])*@[a-zA-Z0-9](-?\.?[a-zA-Z0-9])*\.[a-zA-Z](-?[a-zA-Z0-9])+$/; //eslint-disable-line no-useless-escape

    if (!value)
        return false;

    if (value.length > 254)
        return false;

    var valid = tester.test(value);
    if (!valid)
        return false;

    // Further checking of some things regex can't handle
    var parts = value.split("@");
    if (parts[0].length > 64)
        return false;

    var domainParts = parts[1].split(".");
    if (domainParts.some(function (part) { return part.length > 63; }))
        return false;

    return true;
}

function password(value) {
    let score = 0;

    if (!value)
        return false;

    if (value.length >= 8 && value.length <= 15)
        score++;

    if (/[A-Z]/.test(value)) //eslint-disable-line no-useless-escape
        score++;

    if (/[0-9]/.test(value)) //eslint-disable-line no-useless-escape
        score++;

    if (/[@#\$%^&+=]/.test(value)) //eslint-disable-line no-useless-escape
        score++;

    return score;
}

function userIsAdmin(roles) {
    return some(roles, (x) => (x === 'ROLE_ADMIN' || x === 'ROLE_SUPERADMIN'));
}

export default {
    email,
    password,
    userIsAdmin
}