import {
    LOADING,
	UPDATE_FB_DATA,
	SELECT_PAGE,
	FANPAGE_LIST_STEP
} from "../actions/constants";

import {MODEL_STATE} from "../config";

export function facebookDataReducer(state = MODEL_STATE, action) {

	let finalState = Object.assign({}, state);

	switch (action.type) {
		case LOADING: 

			finalState.isLoading = action.payload;
            return finalState;

		case FANPAGE_LIST_STEP: 

			finalState.fanPageListStepDone = action.payload;
            return finalState;

		case SELECT_PAGE: 

			finalState.selectedPage = action.payload;
            return finalState;

		case UPDATE_FB_DATA: 

			let facebookData = action.payload;

			finalState.email = facebookData.email;
			finalState.name = facebookData.name;
			finalState.facebookUserId = facebookData.userID;
			finalState.loginStatus = facebookData.loginStatus;
			finalState.pages = facebookData.pages;
            return finalState;

		default: return state;

	}
}