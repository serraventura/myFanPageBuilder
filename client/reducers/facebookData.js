import {
    FETCH,
	FETCHED
} from "../actions/constants";

let defaultState = {
	fecthing: false
};

export function facebookDataReducer(state = defaultState, action) {

	let finalState;

	switch (action.type) {
		case FETCH: 
			finalState = Object.assign({}, state);
			finalState.fecthing = true;
            return finalState;

		case FETCHED: 
			finalState = Object.assign({}, state);
			finalState.fecthing = false;
			finalState.xxx = 'xxxxx';
            return finalState;

		default: return state;

	}
}