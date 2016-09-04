import {
    LOADING,
	UPDATE_FB_DATA
} from "../actions/constants";

import {MODEL_STATE} from "../config";

export function facebookDataReducer(state = MODEL_STATE, action) {

	let finalState;

	switch (action.type) {
		case LOADING: 
			finalState = Object.assign({}, state);
			finalState.isLoading = action.payload;
            return finalState;

		case UPDATE_FB_DATA: 

			let facebookData = action.payload;

			finalState = Object.assign({}, state);
			finalState.email = facebookData.email;
			finalState.name = facebookData.name;
			finalState.facebookUserId = facebookData.userID;
			finalState.loginStatus = facebookData.loginStatus;
			finalState.pages = facebookData.pages;
            return finalState;

		default: return state;

	}
}