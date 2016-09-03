import {
    LOADING,
	FETCHED
} from "../actions/constants";

let defaultState = {
	isLoading: false
};

export function facebookDataReducer(state = defaultState, action) {

	let finalState;

	switch (action.type) {
		case LOADING: 
			finalState = Object.assign({}, state);
			finalState.isLoading = action.payload;
            return finalState;

		case FETCHED: 
			finalState = Object.assign({}, state);
			finalState.fecthing = false;
			finalState.xxx = 'xxxxx';
            return finalState;

		default: return state;

	}
}