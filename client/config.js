export const IS_DEV = /dev/i.test(process.env.NODE_ENV);

export const MODEL_STATE = {
	isLoading: true,
	email: null,
	name: null,
	facebookUserId: null,
	loginStatus: null,
	pages: [],
	templates: [],
	selectedPageId: null,
	selectedPageTemplateUrl: 'http://localhost:3319/templates/myfanpageapp/',
	selectedTemplate: null
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
		signup: domain + "builder/signup",
		getListTemplates: domain + "builder/listtemplates",
		imageTemplates: domain + "imageTemplates",
		templates: domain + "templates/",
		setTemplate: domain + "builder/settemplate"
	}

}

export const FB_LOGIN_CONFIG = {
    appId: "1670457943200950",
	autoLoad: true,
	fields: "id,name,email",
	scope: "email,manage_pages"
};

export const HIDE = {
    visibility: "hidden"
};

export const UNHIDE = {
    visibility: "visible"
};