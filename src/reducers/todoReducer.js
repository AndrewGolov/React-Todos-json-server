import { actions } from '../actions/actions';

const initialState = {
	dataTodos: [],
	isLoadingData: false,
	error: null,
};

export const todoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_NEW_TASK_FULLFIELD:
			return {
				...state,
				dataTodos: [...state.dataTodos, payload],
				isLoadingData: false,
			};
		case actions.GET_DATA_PENDING:
			return {
				...state,
				error: null,
				isLoadingData: true,
			};

		case actions.GET_DATA_FULFIELD:
			return {
				...state,
				dataTodos: payload,
				isLoadingData: false,
			};
		case actions.UPDATE_TASK_FULFIELD:
			return {
				...state,
				dataTodos: state.dataTodos.map((todo) => (todo.id === payload.id ? { ...todo, ...payload } : todo)),
				isLoadingData: false,
			};
		case actions.DELETE_TASK_FULFIELD:
			return { ...state, dataTodos: state.dataTodos.filter((todo) => todo.id !== payload), isLoadingData: false };

		case actions.GET_DATA_REJECTED:
			return {
				...state,
				error: payload,
				isLoadingData: false,
			};
		default:
			return state;
	}
};
