export const IS_DEV = /dev/i.test(process.env.NODE_ENV);

export const MODEL_STATE = {
	isLoading: true,
	email: null,
	name: null,
	facebookUserId: null,
	loginStatus: null,
	pages: [],
	templates: [],
	selectedPage: null,
	fanPageListStepDone: false,
	templateListStepDone: false,
	templateConfigPanelDone: false
};

export const DEFAULT_HTTP_PARAMS = {
	method: "GET",
	headers: {
		"auth-token": null,
		"Accept": "application/json",
		"Content-Type": "application/json"
	},
	body: null
}

export function API() {

	let domain = 'http://localhost:3319/';

	return {
		domain: domain,
		getListTemplates: domain + "builder/listtemplates"
	}

}

export const HIDE = {
    visibility: "hidden"
};

export const UNHIDE = {
    visibility: "visible"
};