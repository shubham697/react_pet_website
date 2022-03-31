import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes, { CHANGE_FB_LOGIN, CHANGE_EVENT, ASSIGN_OWNER, LOGOUT_OWNER } from "../constants/types";

let currentOwner = {};
let isFacebookLogin = false;
let isRegistration = false;

class OwnerStore extends EventEmitter {
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

    //=====For new owner registration
    assignOwnerObject(owner) {
        if (owner != null) {
            currentOwner = owner;
            localStorage.setItem('currentOwner', JSON.stringify(owner));
        } else {
            currentOwner = {};
        }
    }

    getOwnerObject() {
        if (currentOwner.jwt == null) {
            if (localStorage.getItem("currentOwner") != null) {
                currentOwner = JSON.parse(localStorage.getItem('currentOwner'));
            }
        }
        return currentOwner;
    }

    //===== LOGOUT
    logoutOwner() {
        currentOwner = {};
        localStorage.removeItem("currentOwner");
    }

    //===== LOGIN
    switchLoginFBStatus(lStatus, fStatus) {
        isFacebookLogin = fStatus;
        localStorage.setItem('isFacebookLogin', fStatus);
        isRegistration = lStatus;
        localStorage.setItem('isRegistration', lStatus);
    }

    getCurrentRegistrationStatus() {
        if (localStorage.getItem("isRegistration") != null) {
            isRegistration = JSON.parse(localStorage.getItem('isRegistration'));
        }
        return isRegistration;
    }

    getCurrentFacebookStatus() {
        if (localStorage.getItem("isFacebookLogin") != null) {
            isFacebookLogin = JSON.parse(localStorage.getItem('isFacebookLogin'));
        }
        return isFacebookLogin;
    }

}

const store = new OwnerStore();

Dispatcher.register(action => {
    switch (action.actionType) {
        case ASSIGN_OWNER:
            //dispatch to backend?
            store.assignOwnerObject(action.ownerObject);
            store.emitChange();
            break;

        case LOGOUT_OWNER:
            store.logoutOwner();
            store.emitChange();
            break;

        case CHANGE_FB_LOGIN:
            store.switchLoginFBStatus(action.loginStatus, action.facebookStatus)
            store.emitChange();
        default:
            //do nothing
            break;
    }
});

export default store;