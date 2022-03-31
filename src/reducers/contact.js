import { SUBMIT_CONTACT, POST_PROMO } from '../constants/types.js';

const getContactData = (state, action) => {
    switch (action.type) {
        case SUBMIT_CONTACT:
            return {
                contactData: action.contactData
            };
        default:
            return state;
    }
}

const contact = (state = [], action) => {
    switch (action.type) {
        case POST_PROMO:
            return [...state, getContactData(undefined, action)];
        default:
            return state;
    }
};


export default contact;