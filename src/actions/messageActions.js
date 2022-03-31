import dispatcher from "../appDispatcher";
import actionTypes, { SHOW_MESSAGE, DISMISS_MESSAGE } from "../constants/types";



// ===== SHOW MESSAGE =====
export function showMessage(_messageObject) {
    dispatcher.dispatch({
        actionType: SHOW_MESSAGE,
        messageObject: _messageObject
    });
}

export function dismissMessage() {
    dispatcher.dispatch({
        actionType: DISMISS_MESSAGE
    });
}

export function showMessageFull(_header, _message, _callbackFun) {
    let messageObject = {
        header: _header,
        message: _message,
        callbackFunc: _callbackFun
    }
    dispatcher.dispatch({
        actionType: SHOW_MESSAGE,
        messageObject: messageObject
    });
}

//=====