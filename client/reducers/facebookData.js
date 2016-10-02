import {
    LOADING,
	UPDATE_FB_DATA,
	SELECT_PAGE,
	SELECT_TEMPLATE,
	SET_TEMPLATE_LIST,
	OPEN_LIVE_TEMPLATE
} from "../actions/constants";

import {MODEL_STATE} from "../config";

export function facebookDataReducer(state = MODEL_STATE, action) {

	let finalState = Object.assign({}, state);

	switch (action.type) {
		case LOADING: 

			finalState.isLoading = action.payload;
            return finalState;

		case SET_TEMPLATE_LIST: 

			finalState.templates = action.payload;
            return finalState;

		case SELECT_PAGE: 

			finalState.selectedPageId = action.payload;
            return finalState;

		case OPEN_LIVE_TEMPLATE: 

			finalState.isLiveTemplateOpen = action.payload;
            return finalState;

		case SELECT_TEMPLATE: 
            return Object.assign(finalState, action.payload);

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