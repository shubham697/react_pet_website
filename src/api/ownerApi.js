import { handleResponse, handleError } from "./apiUtils";
import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';
import ownerStore from "../stores/ownerStore";
import sha256 from 'crypto-js/sha256';
const baseUrl = process.env.REACT_APP_API_URL + "v1/owner/";



export function createOwner(ownerObject) {
   
    let formData = new FormData();
    for (const name in ownerObject) {
        formData.append(name, ownerObject[name]);
    }
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));

    return fetch(baseUrl + "create", {
        method: "POST",
        headers: headers,
        body: formData
    })
        .then(handleResponse)
        .catch(handleError);
}

export function loginOwner(ownerObject) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));
    headers.set('content-type', 'application/json');

    return fetch(baseUrl + "login", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(ownerObject)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function loginOwnerSocialMedia(ownerObject) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));
    headers.set('content-type', 'application/json');

    return fetch(baseUrl + "loginsocialmedia", {
        method: "POST",
        headers: headers,
        body: JSON.stringify(ownerObject)
    })
        .then(handleResponse)
        .catch(handleError);
}

export function verifyEmail(token) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));

    return fetch(baseUrl + "verify/" + token, {
        method: "GET",
        headers: headers,
    })
        .then(handleResponse)
        .catch(handleError);
}

export function resetPassword(_email) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));
    headers.set('content-type', 'application/json');

    return fetch(baseUrl + "resetpw", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ email: _email })
    })
        .then(handleResponse)
        .catch(handleError);
}

export function verifyPasswordResetToken(token) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));

    return fetch(baseUrl + "resetpw/verify/" + token, {
        method: "GET",
        headers: headers
    })
        .then(handleResponse)
        .catch(handleError);
}

export function resetPasswordProper(_token, _password) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));
    headers.set('content-type', 'application/json');

    return fetch(baseUrl + "changepwtoken", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ token: _token, password: _password })
    })
        .then(handleResponse)
        .catch(handleError);
}

export function changePassword(_oldPassword, _newPassword) {

    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);
    headers.set('content-type', 'application/json');

    return fetch(baseUrl + "changepwjwt", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ oldPassword: sha256(process.env.REACT_APP_PASSWORD_SALT + _oldPassword).toString(), newPassword: sha256(process.env.REACT_APP_PASSWORD_SALT + _newPassword).toString() })
    })
        .then(handleResponse)
        .catch(handleError);
}