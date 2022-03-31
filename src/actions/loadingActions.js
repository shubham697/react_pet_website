import dispatcher from "../appDispatcher";
import actionTypes, { SET_LOADING, DISMISS_LOADING } from "../constants/types";



// ===== SHOW MESSAGE =====
export function setLoading(_message) {
    let _loadingObject = { message: _message };
    dispatcher.dispatch({
        actionType: SET_LOADING,
        loadingObject: _loadingObject
    });
}

export function dismissLoading() {
    dispatcher.dispatch({
        actionType: DISMISS_LOADING
    });
}

//=====