import { combineReducers, legacy_createStore, applyMiddleware } from 'redux';
import { thunk } from 'redux-thunk';
import { todoReducer } from './reducers/todoReducer.js';
import { uiReducer } from './reducers/uiReducer.js';
const reducer = combineReducers({
	todos: todoReducer,
	ui: uiReducer,
});
export const store = legacy_createStore(reducer, applyMiddleware(thunk));
