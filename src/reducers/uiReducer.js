import { actions } from '../actions/actions';

const initialState = {
	isAdding: false,
	isSorting: false,
	isOpenSearch: false,
	isSorted: false,
};

export const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADDING_MODE:
			return {
				...state,
				isAdding: !state.isAdding || payload,
			};

		case actions.ACTION_SORTED:
			return {
				...state,
				isSorted: !state.isSorted,
			};

		default:
			return state;
	}
};
