import { combineReducers } from 'redux';
import contact from './contact';
import promo from './promo';
import quote from './quote';

export default combineReducers({
    contact,
    promo,
    quote
});
