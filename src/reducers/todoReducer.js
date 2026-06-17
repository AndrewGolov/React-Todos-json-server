import { actions } from '../actions/actions';

const initialState = {
	dataTodos: [],
	isLoadingData: true,
	error: null,
};

export const todoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.GET_DATA_TODOS:
			return {
				...state,
				dataTodos: payload,
				isLoadingData: false,
			};
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
