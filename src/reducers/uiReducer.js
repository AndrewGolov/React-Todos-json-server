import { actions } from '../actions/actions';

const initialState = {
	isAdding: false,
	isSorting: false,
	isOpenSearch: false,
	isSorted: false,
	searchPhrase: '',
};

export const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADDING_MODE:
			return {
				...state,
				isAdding: !state.isAdding || payload,
				isOpenSearch: false,
			};
		case actions.OPEN_SEARCH_MODE:
			return {
				...state,
				isOpenSearch: !state.isOpenSearch,
				isAdding: false,
			};
		case actions.SET_SEARCH_PHRASE:
			return {
				...state,
				searchPhrase: payload,
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
