import {
    LOADING,
	UPDATE_FB_DATA,
	SELECT_PAGE,
	SELECT_TEMPLATE,
	SET_TEMPLATE_LIST,
	OPEN_LIVE_TEMPLATE,
	SET_TEMPLATE_CONFIG_MENU_ITEM,
	CHANGE_TEMPLATE_CONFIG_MENU_ITEM,
	TEMPLATE_MODIFIED
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

		case CHANGE_TEMPLATE_CONFIG_MENU_ITEM: 

			finalState.templateConfig.menu = action.payload;
            return finalState;

		case SET_TEMPLATE_CONFIG_MENU_ITEM: 

			finalState.templateConfig.menuItemSelected = action.payload;
            return finalState;

		case OPEN_LIVE_TEMPLATE: 

			finalState.isLiveTemplateOpen = action.payload;
            return finalState;

		case SELECT_TEMPLATE: 
            return Object.assign(finalState, action.payload);

		case TEMPLATE_MODIFIED: 
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