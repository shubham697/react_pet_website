import { handleResponse, handleError, basicAuth } from "./apiUtils";
import ownerStore from "../stores/ownerStore";
const baseUrl = process.env.REACT_APP_API_URL + "v1/owner/notifications/";

export function loadOwnerNotifications(offset, limit) {

    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);

    return fetch(baseUrl + "" + offset + "/" + limit, {
        method: "GET",
        headers: headers
    })
        .then(handleResponse)
        .catch(handleError);
}


export function setAllNotificationsRead(offset, limit) {

    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);

    return fetch(baseUrl + "readall", {
        method: "PUT",
        headers: headers
    })
        .then(handleResponse)
        .catch(handleError);
}
