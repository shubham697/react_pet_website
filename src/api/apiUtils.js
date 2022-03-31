import base64 from 'crypto-js/enc-base64';
import utf8 from 'crypto-js/enc-utf8';

export const basicAuth = base64.stringify(utf8.parse(process.env.REACT_APP_BASIC_ACCESS_TOKEN_USER + ":" + process.env.REACT_APP_BASIC_ACCESS_TOKEN_PASSWORD));

export async function handleResponse(response) {
    if (response.ok) return response.json();
    if (response.status === 409 || response.status === 401 || response.status === 404 || response.status === 403) return response.json();
    if (response.status === 400) {
        const error = await response.json();
        return error;
        //throw new Error(error);
    }
    throw new Error("Network response was not ok");
}

export function handleError(error) {
    console.error("API Call Failed. " + error);
    throw error;
}