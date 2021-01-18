import { combineReducers } from 'redux';

import {productsStore} from '../features/products/reducer';

const reducer = combineReducers({
    productsStore
});

export default reducer;
