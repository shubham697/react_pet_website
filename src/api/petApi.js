import { handleResponse, handleError, basicAuth } from "./apiUtils";
import ownerStore from "../stores/ownerStore";
const baseUrl = process.env.REACT_APP_API_URL + "v1/pet/";

export function generatePetBurialCert(petObject) {
    let formData = new FormData();
    for (const name in petObject) {
        formData.append(name, petObject[name]);
    }

    //set headers
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);

    return fetch(baseUrl + "deathcert", {
        method: "POST",
        headers: headers,
        body: formData
    })
        .then(handleResponse)
        .catch(handleError);
}

export function createPet(petObject) {
    let formData = new FormData();
    for (const name in petObject) {
        if (name == "media") {
            var i;
            for (i = 0; i < petObject[name].length; i++) {
                formData.append("media", petObject[name][i]);
            }
            continue;
        }
        formData.append(name, petObject[name]);
    }

    //set headers
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);

    return fetch(baseUrl + "create", {
        method: "POST",
        headers: headers,
        body: formData
    })
        .then(handleResponse)
        .catch(handleError);
}

export function loadOwnerPets(_offset, _limit) {

    let headers = new Headers();
    headers.set('content-type', 'application/json');
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);

    return fetch(baseUrl + "getbyownerid", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ offset: _offset, count: _limit, petSpecies: "All", petBreed: "All" })
    })
        .then(handleResponse)
        .catch(handleError);
}

export function loadSelectedPet(id) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + basicAuth);

    return fetch(baseUrl + "view/" + id, {
        method: "GET",
        headers: headers
    })
        .then(handleResponse)
        .catch(handleError);
}

export function loadDiscoveryPets(_offset, _limit) {

    let headers = new Headers();
    headers.set('content-type', 'application/json');
    if (ownerStore.getOwnerObject().jwt == null) {
        headers.set('Authorization', 'Basic ' + basicAuth);
    } else {
        headers.set('Authorization', 'Basic ' + basicAuth);
        //headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);
    }

    return fetch(baseUrl + "discover", {
        method: "PUT",
        headers: headers,
        body: JSON.stringify({ offset: _offset, count: _limit, petSpecies: "All", petBreed: "All" })
    })
        .then(handleResponse)
        .catch(handleError);
}

export function loadPetComments(offset, limit, petID) {
    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + basicAuth);

    return fetch(baseUrl + "comment/" + petID + "/" + offset + "/" + limit, {
        method: "GET",
        headers: headers
    })
        .then(handleResponse)
        .catch(handleError);
}

export function postComment(commentObject) {

    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);
    let formData = new FormData();
    for (const name in commentObject) {
        if (name == "media") {
            var i;
            for (i = 0; i < commentObject[name].length; i++) {
                formData.append("media", commentObject[name][i]);
            }
            continue;
        }
        formData.append(name, commentObject[name]);
    }

    return fetch(baseUrl + "comment", {
        method: "POST",
        headers: headers,
        body: formData

    })
        .then(handleResponse)
        .catch(handleError);
}

export function postCommentGuest(commentObject) {

    let headers = new Headers();
    headers.set('Authorization', 'Basic ' + basicAuth);
    let formData = new FormData();
    for (const name in commentObject) {
        if (name == "media") {
            var i;
            for (i = 0; i < commentObject[name].length; i++) {
                formData.append("media", commentObject[name][i]);
            }
            continue;
        }
        formData.append(name, commentObject[name]);
    }

    return fetch(baseUrl + "comment/guest", {
        method: "POST",
        headers: headers,
        body: formData

    })
        .then(handleResponse)
        .catch(handleError);
}

export function updatePet(petObject) {
    let formData = new FormData();
    for (const name in petObject) {
        formData.append(name, petObject[name]);
    }

    //set headers
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);

    return fetch(baseUrl + "" + petObject.petID, {
        method: "PUT",
        headers: headers,
        body: formData
    })
        .then(handleResponse)
        .catch(handleError);
}


export function removePetMedia(petID, _media) {

    //set headers
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);
    headers.set('content-type', 'application/json');

    return fetch(baseUrl + "" + petID + "/removemedia", {
        method: "POST",
        headers: headers,
        body: JSON.stringify({ media: _media })
    })
        .then(handleResponse)
        .catch(handleError);
}

export function addPetMedia(petID, _media) {

    //set headers
    let headers = new Headers();
    headers.set('Authorization', 'Bearer ' + ownerStore.getOwnerObject().jwt);

    let formData = new FormData();
    var i;
    for (i = 0; i < _media.length; i++) {
        formData.append("media", _media[i]);
    }

    return fetch(baseUrl + "" + petID + "/addmedia", {
        method: "PUT",
        headers: headers,
        body: formData
    })
        .then(handleResponse)
        .catch(handleError);
}