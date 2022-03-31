import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes, { CHANGE_EVENT, SHOW_MESSAGE, DISMISS_MESSAGE } from "../constants/types";

let messageObject = {};

class MessageStore extends EventEmitter {
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
    showMessage(mObject) {
        messageObject = mObject;
    }

    getMessage() {
        return messageObject;
    }

    dismissMessage() {
        messageObject = {};
    }

}

const store = new MessageStore();

Dispatcher.register(action => {
    switch (action.actionType) {
        case SHOW_MESSAGE:
            //dispatch to backend?
            store.showMessage(action.messageObject);
            store.emitChange();
            break;
        case DISMISS_MESSAGE:
            //dispatch to backend?
            store.dismissMessage();
            store.emitChange();
            break;
        default:
            //do nothing
            break;
    }
});

export default store;