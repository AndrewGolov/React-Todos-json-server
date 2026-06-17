import { actions } from '../actions/actions';

const initialState = {
	addingValue: '',
	searchingValue: '',
	isAdding: false,
	isSorting: false,
	isOpenSearch: false,
	isSorted: false,
	errorFieldMessage: null,
};

export const uiReducer = (state = initialState, { type, payload }) => {
	switch (type) {
		case actions.ADD_TASK:
			return {
				...state,
				isAdding: payload,
			};
		case actions.ACTION_SORTED: {
			const sorting = !state.isSorted;
			return {
				...state,
				isSorted: sorting,
			};
		}

		default:
			return state;
	}
};
