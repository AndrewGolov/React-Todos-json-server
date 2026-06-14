const initialState = {
	dataTodos: [],
	isLoadingData: true,
	error: null,
};

export const todoReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case 'GET_DATA_TODOS':
			return {
				...state,
				dataTodos: payload,
				isLoadingData: false,
			};
		case 'ERROR_REQUEST':
			return {
				...state,
				isLoadingData: false,
				error: payload,
			};
		default:
			return state;
	}
};
