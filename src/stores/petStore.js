import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes, { ADD_OWNER_PETS, SET_PET_DISPLAY, SET_PET_COMMENTS, ADD_PET_COMMENTS, ADD_DISCOVERY_PETS, UPDATE_DISCOVERY_PETS, UPDATE_SELECTED_PET, UPDATE_OWNER_PETS, CREATE_PET, CHANGE_EVENT, RESET_PET_CREATION, INCREMENT_PET_CREATION_STEP, SET_PET_CREATION_TRUE, UPDATE_PET_CREATION } from "../constants/types";
var moment = require('moment');

let pet = {};
let petCreationActive = false;
let petCreationStep = 1;
//current owner pets
let currentOwnerPets = [];
let ownerPetCount = 0;

let currentDiscoveryPets = [];
let currentSelectedPet = {};

//PET COMMENTS
let currentPetCommentCount = 0;
let currentPetComments = [];

let displayPetComments = false;

class PetStore extends EventEmitter {
    addChangeListener(callback) {
        this.on(CHANGE_EVENT, callback);
    }

    removeChangeListener(callback) {
        this.removeListener(CHANGE_EVENT, callback);
    }

    //emit the change event
    emitChange() {
        this.emit(CHANGE_EVENT);
    }

    //=====OWNER PETS=====
    getPetsByOwner() {
        return currentOwnerPets;
    }

    getOwnerPetCount() {
        return ownerPetCount;
    }

    setPetsByOwner(pets, limit) {
        ownerPetCount = limit;
        for (let pet of pets) {
            pet = this.preparePet(pet);
        }
        currentOwnerPets = pets;
    }

    addPetsByOwner(pets, limit) {
        ownerPetCount = limit;
        for (let pet of pets) {
            pet = this.preparePet(pet);
            if (!this.checkIfPetExistInDiscovery(pet.petID)) {
                currentOwnerPets.push(pet);
            }
        }
    }

    //=====================================================


    //=====DISCOVERY PETS=====
    getDiscoveryPets() {
        return currentDiscoveryPets;
    }

    setDiscoveryPets(pets) {
        for (let pet of pets) {
            pet = this.preparePet(pet);
        }
        currentDiscoveryPets = pets;
    }

    addDiscoveryPets(pets) {
        for (let pet of pets) {
            pet = this.preparePet(pet);
            if (!this.checkIfPetExistInDiscovery(pet.petID)) {
                currentDiscoveryPets.push(pet);
            }
        }
    }

    //=====================================================

    //=====PETS COMMENTS=====
    resetPetComments() {
        currentPetComments = [];
    }

    getPetComments() {
        return currentPetComments;
    }

    setPetComments(comments, count) {
        if (comments == null) {
            return;
        }
        for (let comment of comments) {
            comment = this.prepareComment(comment);

        }
        currentPetComments = comments;
        currentPetCommentCount = count;
    }

    addPetComments(comments) {
        for (let comment of comments) {
            comment = this.prepareComment(pet);
            if (!this.checkIfCommentExist(pet.petID)) {
                currentPetComments.push(comment);
            }
        }
    }

    //=====================================================

    //=====CURRENT SELECTED PET=====
    getSelectedPet() {
        return currentSelectedPet;
    }

    setCurrentSelectedPet(pet) {
        currentSelectedPet = this.preparePet(pet);
    }

    //=====================================================

    //=====For new pet creation
    getPetCreationStatus() {
        return petCreationActive;
    }

    resetCurrentNewPet() {
        pet = {};
        petCreationActive = false;
        petCreationStep = 1;
        localStorage.removeItem('currentPetCreation');
    }

    getCurrentPet() {
        /*if (localStorage.getItem("currentPetCreation") != null) {
            pet = JSON.parse(localStorage.getItem('currentPetCreation'));
            pet.profilePicture = localStorage.getItem('currentPetProfilePicture');
            if (localStorage.getItem("currentPetProfilePictures") != null)
                pet.pictures = localStorage.getItem('currentPetProfilePictures');
        }*/ //#remove load from cache for now!
        return pet;
    }

    setPetCreationActive() {
        petCreationActive = true;
    }

    setCurrentPet(petObject) {
        pet = petObject;
        console.log(pet);
        //put on the cookie
        localStorage.setItem('currentPetCreation', JSON.stringify(pet));
        /*if (pet.profilePicture != null && pet.profilePicture[0] != null) {
            localStorage.setItem('currentPetProfilePicture', pet.profilePicture);
        }
        if (pet.pictures != null && pet.pictures[0] != null) {
            localStorage.setItem('currentPetProfilePictures', pet.pictures);
        }*/
    }

    //Pet creation steps
    incrementPetCreationStep() {
        petCreationStep++;
    }

    getPetCreationStep() {
        return petCreationStep;
    }
    //=====

    //=====PET COMMENTS DISPLAY=====
    getPetCommentsDisplay() {
        return displayPetComments;
    }

    getPetCommentCount() {
        return currentPetCommentCount;
    }

    setPetCommentsDisplay(display) {
        displayPetComments = display;
    }

    //=====================================================

    //=====UTILIES FUNCTIONS

    convertDate(date) {
        return moment(new Date(date)).format("DD MMM YYYY");
    }

    preparePet(pet) {
        let petNew = pet;
        petNew.createdAtParsed = this.convertDate(petNew.createdAt);
        petNew.dateOfDepartureParsed = this.convertDate(petNew.dateOfDeparture);
        let urls = [];
        urls.push(petNew.profilePhoto);
        if (petNew.media != null) {
            for (let media of petNew.media) {
                urls.push(media.url);
            }
        }
        petNew.allMedia = urls;
        return petNew;
    }

    prepareComment(comment) {
        let commentNew = comment;
        commentNew.postedAtParsed = this.convertDate(commentNew.postedAt);
        return commentNew;
    }

    checkIfPetExistInDiscovery(petID) {
        for (let pet of currentDiscoveryPets) {
            if (pet.petID == petID) {
                return true;
            }
        }
        return false;
    }

    checkIfCommentExist(commentID) {
        for (let comment of currentPetComments) {
            if (comment._id == commentID) {
                return true;
            }
        }
        return false;
    }


    //=====================
}

const store = new PetStore();

Dispatcher.register(action => {

    switch (action.actionType) {
        case CREATE_PET:
            //dispatch to backend?
            store.emitChange();
            break;
        case RESET_PET_CREATION:
            store.resetCurrentNewPet();
            //dispatch to backend?
            store.emitChange();
            break;
        case INCREMENT_PET_CREATION_STEP:
            //dispatch to backend?
            store.incrementPetCreationStep();
            store.emitChange();
            break;
        case SET_PET_CREATION_TRUE:
            store.setPetCreationActive();
            store.emitChange();
            break;
        case UPDATE_PET_CREATION:
            store.setCurrentPet(action.petObject);
            store.emitChange();
            break;
        case UPDATE_OWNER_PETS:
            store.setPetsByOwner(action.petsObject, action.dataLimit);
            store.emitChange();
            break;

        case ADD_OWNER_PETS:
            store.addPetsByOwner(action.petsObject, action.dataLimit);
            store.emitChange();
            break;

        case UPDATE_DISCOVERY_PETS:
            store.setDiscoveryPets(action.petsObject);
            store.emitChange();
            break;

        case ADD_DISCOVERY_PETS:
            store.addDiscoveryPets(action.petsObject);
            store.emitChange();
            break;

        case SET_PET_COMMENTS:
            store.setPetComments(action.petComments, action.commentCount);
            store.emitChange();
            break;

        case ADD_PET_COMMENTS:
            store.addPetComments(action.petComments);
            store.emitChange();
            break;

        case UPDATE_SELECTED_PET:
            store.setCurrentSelectedPet(action.petObject);
            store.emitChange();
            break;

        case SET_PET_DISPLAY:
            store.setPetCommentsDisplay(action.petDisplay);
            store.emitChange();
            break;
        default:
            //do nothing
            break;
    }
});

export default store;