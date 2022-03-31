import dispatcher from "../appDispatcher";
import * as notificationApi from "../api/notificationApi";
import actionTypes, { APPEND_NOTIFICATIONS, GET_NOTIFICATIONS, SET_ALL_READ_NOTIFICATIONS } from "../constants/types";

export function loadOwnerNotifications(offset, limit) {
    return notificationApi.loadOwnerNotifications(offset, limit).then(response => {
        dispatcher.dispatch({
            actionType: GET_NOTIFICATIONS,//(offset == 0 ? GET_NOTIFICATIONS : APPEND_NOTIFICATIONS),
            notificationObject: response.data,
            notificationNew: response.data_new,
            notificationLimit: response.data_limit
        });
        return response;
    })
}

export function setAllNotificationsRead() {
    return notificationApi.setAllNotificationsRead().then(response => {
        dispatcher.dispatch({
            actionType: SET_ALL_READ_NOTIFICATIONS
        });
        return response;
    })
}