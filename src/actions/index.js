import { SUBMIT_CONTACT, POST_PROMO, GET_QUOTE, LOGIN_MANUAL } from '../constants/types.js';

export const submitContact = (contactData) => {
    return {
        type: SUBMIT_CONTACT,
        contactData
    };
};

export const loginManually = (loginDetails) => {
    return {
        type: LOGIN_MANUAL,
        loginDetails
    };
};

export const postPromo = (promoData) => {
    return {
        type: POST_PROMO,
        promoData
    };
};

export const getQuote = (quoteData) => {
    return {
        type: GET_QUOTE,
        quoteData
    };
};


