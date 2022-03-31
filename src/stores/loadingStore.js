import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes, { CHANGE_EVENT, SET_LOADING, DISMISS_LOADING } from "../constants/types";

let loadingObject = {};

class LoadingStore extends EventEmitter {
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
    showLoading(lObject) {
        loadingObject = lObject;
    }

    getLoading() {
        return loadingObject;
    }

    dismissLoading() {
        loadingObject = {};
    }

}

const store = new LoadingStore();

Dispatcher.register(action => {
    switch (action.actionType) {
        case SET_LOADING:
            //dispatch to backend?
            store.showLoading(action.loadingObject);
            store.emitChange();
            break;
        case DISMISS_LOADING:
            //dispatch to backend?
            store.dismissLoading();
            store.emitChange();
            break;
        default:
            //do nothing
            break;
    }
});

export default store;