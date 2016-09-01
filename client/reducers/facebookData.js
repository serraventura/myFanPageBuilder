import {
    FETCH
} from "../actions/constants";

let defaultState = {
	fecthing: false
};

export function facebookDataReducer(state = defaultState, action) {

	switch (action.type) {
		case FETCH: 
			let finalState = Object.assign({}, state);
			finalState.fecthing = true;
            return finalState;

		default: return state;

	}
}