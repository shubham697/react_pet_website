import { GET_QUOTE } from '../constants/types.js';

const getQuoteData = (state, action) => {
    switch (action.type) {
        case GET_QUOTE:
            return {
                quoteData: action.quoteData
            };
        default:
            return state;
    }
}

const quote = (state = [], action) => {
    switch (action.type) {
        case GET_QUOTE:
            return [...state, getQuoteData(undefined, action)];
        default:
            return state;
    }
};


export default quote;