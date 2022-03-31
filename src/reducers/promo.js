import { POST_PROMO } from '../constants/types.js';

const getPromo = (state, action) => {
    switch (action.type) {
        case POST_PROMO:
            return {
                promoData: action.promoData
            };
        default:
            return state;
    }
}

const promo = (state = [], action) => {
    switch (action.type) {
        case POST_PROMO:
            return [...state, getPromo(undefined, action)];
        default:
            return state;
    }
};


export default promo;