import dispatcher from "../appDispatcher";
import * as petApi from "../api/petApi";
import actionTypes, { ADD_OWNER_PETS, SET_PET_DISPLAY, SET_PET_COMMENTS, ADD_PET_COMMENTS, ADD_DISCOVERY_PETS, UPDATE_DISCOVERY_PETS, UPDATE_SELECTED_PET, UPDATE_OWNER_PETS, RESET_PET_CREATION, CREATE_PET, INCREMENT_PET_CREATION_STEP, SET_PET_CREATION_TRUE, UPDATE_PET_CREATION } from "../constants/types";

export function generatePetBurialCert(petObject) {
    return petApi.generatePetBurialCert(petObject).then(_petObject => {
        return _petObject;
    })
}

export function createPet(petObject) {
    return petApi.createPet(petObject).then(_petObject => {
        dispatcher.dispatch({
            actionType: CREATE_PET,
            petObject: _petObject.data
        })
        return _petObject;
    })
}

// ===== PET CREATION =====
export function startPetCreation() {

    dispatcher.dispatch({
        actionType: SET_PET_CREATION_TRUE
    })
}

export function resetPetFunction() {

    dispatcher.dispatch({
        actionType: RESET_PET_CREATION
    })
}

export function incrementPetCreationStep() {
    dispatcher.dispatch({
        actionType: INCREMENT_PET_CREATION_STEP
    })
}

export function updatePetCreation(PObject) {
    dispatcher.dispatch({
        actionType: UPDATE_PET_CREATION,
        petObject: PObject
    })
}

export function updateOwnerPets(offset, limit) {

    return petApi.loadOwnerPets(offset, limit).then(_petsObject => {
        dispatcher.dispatch({
            actionType: (offset == 0 ? UPDATE_OWNER_PETS : ADD_OWNER_PETS),
            petsObject: _petsObject.data,
            dataLimit: _petsObject.data_limit
        });
        return _petsObject;
    });
}

export function loadCurrentPet(id) {

    return petApi.loadSelectedPet(id).then(_petObject => {
        console.log(_petObject)
        dispatcher.dispatch({
            actionType: UPDATE_SELECTED_PET,
            petObject: _petObject.data
        });
        return _petObject;
    });
}

export function updateDiscoveryPets(offset, limit) {

    return petApi.loadDiscoveryPets(offset, limit).then(_petsObject => {
        dispatcher.dispatch({
            actionType: (offset == 0 ? UPDATE_DISCOVERY_PETS : ADD_DISCOVERY_PETS),
            petsObject: _petsObject.data
        });
        return _petsObject;
    });
}

export function loadPetComments(offset, limit, petID) {

    return petApi.loadPetComments(offset, limit, petID).then(_petsObject => {
        dispatcher.dispatch({
            actionType: SET_PET_COMMENTS,
            petComments: _petsObject.data,
            commentCount: _petsObject.data_limit
        });
        return _petsObject;
    });
}

export function setPetDisplay(display) {
    dispatcher.dispatch({
        actionType: SET_PET_DISPLAY,
        petDisplay: display
    });
}

export function postPetComment(commentObject) {
    return petApi.postComment(commentObject).then(_petsObject => {
        return _petsObject;
    });
}

export function postPetCommentGuest(commentObject) {
    return petApi.postCommentGuest(commentObject).then(_petsObject => {
        return _petsObject;
    });
}

export function updatePet(petObject) {
    return petApi.updatePet(petObject).then(_petObject => {
        return _petObject;
    })
}

export function removePetMedia(petID, media) {
    return petApi.removePetMedia(petID, media).then(_petObject => {
        return _petObject;
    })
}

export function addPetMedia(petID, media) {
    return petApi.addPetMedia(petID, media).then(_petObject => {
        return _petObject;
    })
}

//=====