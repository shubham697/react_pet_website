import dispatcher from "../appDispatcher";
import * as ownerApi from "../api/ownerApi";
import actionTypes, { CHANGE_FB_LOGIN, CREATE_OWNER, ASSIGN_OWNER, LOGOUT_OWNER } from "../constants/types";



// ===== OWNER CREATION =====
export function startOwnerCreation(oObject) {

    return ownerApi.createOwner(oObject).then(response => {
        dispatcher.dispatch({
            actionType: ASSIGN_OWNER,
            ownerObject: response.data
        })
        return response;
    })
}


// ====== OWNER LOGIN =====
export function startOwnerLogin(oObject) {
    return ownerApi.loginOwner(oObject).then(response => {
        dispatcher.dispatch({
            actionType: ASSIGN_OWNER,
            ownerObject: response.data
        })
        return response;
    })
}

export function loginOwnerSocialMedia(oObject) {
    return ownerApi.loginOwnerSocialMedia(oObject).then(response => {
        dispatcher.dispatch({
            actionType: ASSIGN_OWNER,
            ownerObject: response.data
        })
        return response;
    })
}

//===== REFRESH OWNER =====
export function logoutOwner() {
    dispatcher.dispatch({
        actionType: LOGOUT_OWNER
    });
}

//===== VERIFY OWNER =====
export function verifyOwnerEmail(token) {
    return ownerApi.verifyEmail(token).then(response => {
        if (response.success == true) {
            dispatcher.dispatch({
                actionType: ASSIGN_OWNER,
                ownerObject: response.data
            })
        }
        return response;
    })
}

//===== RESET PASSWORD =====
export function resetPassword(email) {
    return ownerApi.resetPassword(email).then(response => {
        return response;
    })
}

//===== VERIFY PASSWORD RESET TOKEN =====
export function verifyPasswordResetToken(token) {
    return ownerApi.verifyPasswordResetToken(token).then(response => {
        return response;
    })
}

//===== PASSWORD SET =====
export function resetPasswordProper(token, hashedPassword) {
    return ownerApi.resetPasswordProper(token, hashedPassword).then(response => {
        return response;
    })
}

//===== CHAGNE PASSWORD =====
export function changePassword(oldPassword, newPassword) {
    return ownerApi.changePassword(oldPassword, newPassword).then(response => {
        return response;
    })
}

//===== SET ISFACEBOOK REGISTRATION =====
export function changeFacebookRegistration(lStatus, fStatus) {
    dispatcher.dispatch({
        actionType: CHANGE_FB_LOGIN,
        loginStatus: lStatus,
        facebookStatus: fStatus
    });
};