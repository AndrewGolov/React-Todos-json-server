import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { todoReducer } from './reducers/todoReducer.js';
const reducer = combineReducers({
	todos: todoReducer,
});
export const store = legacy_createStore(reducer, applyMiddleware(thunk));
