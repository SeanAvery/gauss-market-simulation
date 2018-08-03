import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';

import { price } from './reducers/index'

const reducer = combineReducers({ price, })

export default createStore(reducer, applyMiddleware(thunk))
