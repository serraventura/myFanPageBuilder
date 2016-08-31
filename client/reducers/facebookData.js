import {
    FETCH
} from "../actions/constants";

export function facebookDataReducer(state = null, action) {

	switch (action.type) {
		case FETCH: 
            console.log('FETCH: ', action.payload);
            return action.payload || [];

		default: return state;

	}
}