import { actions } from '../actions/actions';

const initialState = {
	dataTodos: [],
	isLoadingData: true,
	error: null,
};

export const todoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_NEW_TASK:
			return {
				...state,
				dataTodos: [...state.dataTodos, payload],
			};

		case actions.GET_DATA_TODOS:
			return {
				...state,
				dataTodos: payload,
				isLoadingData: false,
			};
		case actions.UPDATE_TASK:
			console.log(payload);

			return {};

		case actions.ERROR_REQUEST:
			return {
				...state,
				isLoadingData: false,
				error: payload,
			};
		default:
			return state;
	}
};
