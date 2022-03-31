import { handleResponse, handleError } from "./apiUtils";
import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';
const baseUrl = process.env.REACT_APP_API_URL + "v1/admin/";


export function getSpecies() {
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));

    return fetch(baseUrl + "species", {
        method: "GET",
        headers: headers
    })
        .then(handleResponse)
        .catch(handleError);
}

export function getBreed(species) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD)));
    headers.set('content-type', 'application/json');

    return fetch(baseUrl + "breed/byname/" + species, {
        method: "GET",
        headers: headers
    })
        .then(handleResponse)
        .catch(handleError);
}