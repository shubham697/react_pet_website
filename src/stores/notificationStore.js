import { EventEmitter } from "events";
import Dispatcher from "../appDispatcher";
import actionTypes, { CHANGE_EVENT, GET_NOTIFICATIONS, APPEND_NOTIFICATIONS, SET_ALL_READ_NOTIFICATIONS } from "../constants/types";
import { convertDate } from "../utils/dateConvertor";

let notificationList = [];
let newNotificationCount = 0;
let totalNotificationCount = 0;

class NotificationStore extends EventEmitter {
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
    getNotificationList() {
        return notificationList;
    }

    getNotificationListLength() {
        return notificationList.length;
    }

    getNewNotificationCount() {
        return newNotificationCount;
    }

    getTotalNotificationCount() {
        return totalNotificationCount;
    }

    setNotifications(_notificationList, newCount, totalCount) {
        newNotificationCount = newCount;
        totalNotificationCount = totalCount;
        if (_notificationList == null || _notificationList.length == null) {
            return
        }
        for (let note of _notificationList) {
            this.prepareNotification(note);
        }
        notificationList = _notificationList;
    }

    addNotifications(_notificationList, newCount, totalCount) {
        newNotificationCount = newCount;
        totalNotificationCount = totalCount;
        if (_notificationList == null || _notificationList.length == null) {
            return
        }
        for (let note of _notificationList) {
            if (this.checkIfNotificationExist(note)) {
                notificationList.push(this.prepareNotification(note));
            }
        }

    }

    setNewNotification(number) {
        newNotificationCount = 0;
    }

    checkIfNotificationExist(newNotification) {
        for (var i = 0; i < notificationList.length; i++) {
            if (notificationList[i]._id == newNotification._id) {
                return true;
            }
        }
        return false;
    }

    prepareNotification(newNotification) {
        let _newNote = newNotification;
        _newNote.createdAtParsed = convertDate(_newNote.createdAt);
        return _newNote;
    }

}

const store = new NotificationStore();

Dispatcher.register(action => {

    switch (action.actionType) {
        case GET_NOTIFICATIONS:
            //dispatch to backend?
            store.setNotifications(action.notificationObject, action.notificationNew, action.notificationLimit);
            store.emitChange();
            break;
        case APPEND_NOTIFICATIONS:
            store.addNotifications(action.notificationObject, action.notificationNew, action.notificationLimit);
            //dispatch to backend?
            store.emitChange();
            break;
        case SET_ALL_READ_NOTIFICATIONS:
            store.setNewNotification(0);
            store.emitChange();
            break;
        default:
            //do nothing
            break;
    }
});

export default store;