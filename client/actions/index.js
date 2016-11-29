import {
    LOADING, 
    UPDATE_FB_DATA, 
    SELECT_PAGE,
    SELECT_TEMPLATE,
    SET_TEMPLATE_LIST,
    OPEN_LIVE_TEMPLATE,
    SET_TEMPLATE_CONFIG_MENU_ITEM,
    CHANGE_TEMPLATE_CONFIG_MENU_ITEM,
    // PREVIEW_PAGE,
    TEMPLATE_MODIFIED
} from "./constants";

import {
    API,
    DEFAULT_HTTP_PARAMS
} from "../config";

import {getPageName} from "../util";

export function getFacebookData(facebookData) {

    return dispatch => {

        dispatch( loading(true) );

        Promise.all([getPageInfos(), getLoginStatus()]).then(arrResponse => { 

            let pageData = arrResponse[0];
            let loginStatus = arrResponse[1];

            facebookData.pages = pageData.data;
            facebookData.loginStatus = loginStatus.status;

            window.sessionStorage.setItem('fb-auth-token', loginStatus.authResponse.accessToken);

            dispatch({
                type: UPDATE_FB_DATA,
                payload: facebookData
            });

            if (loginStatus.status === 'connected') {
                dispatch(signUp());
            }

            dispatch( loading(false) );

        });

    }    
}

export function selectPage(page) {

    return dispatch => {

        dispatch({
            type: SELECT_PAGE,
            payload: page
        });
    };
}

export function setTemplateConfigMenuItem(item) {

    return dispatch => {

        dispatch({
            type: SET_TEMPLATE_CONFIG_MENU_ITEM,
            payload: item
        });
    };
}

export function changeTemplateConfigMenuItem(item, subItem, newValue) {

    return (dispatch, getState) => {

        const {facebookData} = getState();

        facebookData.templateConfig.menu[item][subItem] = newValue;

        dispatch({
            type: CHANGE_TEMPLATE_CONFIG_MENU_ITEM,
            payload: facebookData.templateConfig.menu
        });
    };
}

export function previewPage() {

    return (dispatch, getState) => {

        const {facebookData} = getState();
        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);

        defaultHttpParams.method = "POST";
        defaultHttpParams.headers['auth-token'] = window.sessionStorage.getItem('fb-auth-token');

        let page = getPageName(facebookData.pages, facebookData.selectedPageId);

        try {
            defaultHttpParams.body = JSON.stringify({
                templateConfig: facebookData.templateConfig,
                pageName: page,
                templateName: facebookData.selectedTemplate
            });
        } catch(err) {
            console.error('Action previewPage() stringify Error: ', err);
        };

        dispatch( loading(true) );

        fetch( API().previewPage, defaultHttpParams ).then( res => res.json() ).then(data => {

            try {

                if(data.statusCode !== 200) {
                    throw new Error(data.customMessage || data.message);
                } else {

                    let selectedPageTemplateUrl = API().templates + data.response.pageName + '?_=' + Math.random();
                    getTemplateContent(selectedPageTemplateUrl).then(templateContent => {

                        dispatch({
                            type: TEMPLATE_MODIFIED,
                            payload: {
                                selectedTemplateContent: templateContent,
                                selectedPageTemplateUrl: selectedPageTemplateUrl,
                                templateModified: new Date()
                            }
                        });

                        dispatch( loading(false) );

                    }).catch(err => {
                        dispatch( loading(false) );
                        console.error('Action getTemplateContent() Error: ', err);
                    });

                }

            } catch(err) {
                dispatch( loading(false) );
                console.error('Action previewPage() status code Error: ', err);
            }

        }).catch(err => {
            dispatch( loading(false) );
            console.error('Action previewPage() Error: ', err);
        });

    };
}

export function selectTemplate(template) {

    return (dispatch, getState) => {

        const {facebookData} = getState();
        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);

        // let page = facebookData.pages.filter(item => item.id === facebookData.selectedPageId);
        // if(page.length>0) page = page[0].link.match(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/)[1];

        let page = getPageName(facebookData.pages, facebookData.selectedPageId);

        defaultHttpParams.method = "POST";
        defaultHttpParams.headers['auth-token'] = window.sessionStorage.getItem('fb-auth-token');

        try {
            defaultHttpParams.body = JSON.stringify({
                templateName: template,
                pageName: page
            });
        } catch(err) {
            console.error('Action signUp() stringify state Error: ', err);
        };

        dispatch( loading(true) );

        fetch( API().setTemplate, defaultHttpParams ).then( res => res.json() ).then(data => {

            try {

                if(data.statusCode !== 200) {
                    throw new Error(data.customMessage || data.message);
                } else {

                    let selectedPageTemplateUrl = API().templates + page;

                    getTemplateContent(selectedPageTemplateUrl).then(templateContent => {

                        dispatch({
                            type: SELECT_TEMPLATE,
                            payload: {
                                selectedTemplateContent: templateContent,
                                selectedPageTemplateUrl: selectedPageTemplateUrl,
                                selectedTemplate: data.response.details.templateName,
                                templateConfig: JSON.parse(data.response.templateConfig)
                            }
                        });

                        dispatch( openLiveTemplate(true) );

                        dispatch( loading(false) );

                    }).catch(err => {
                        dispatch( loading(false) );
                        console.error('Action getTemplateContent() Error: ', err);
                    });

                }

            } catch(err) {
                dispatch( loading(false) );
                console.error('Action selectTemplate()/setTemplate() Error: ', err);
            }

        }).catch(err => {
            dispatch( loading(false) );
            console.error('Action selectTemplate() Error: ', err);
        });

    };
}

function getTemplateContent(url) {
    let p = new Promise( (resolve, reject) => fetch(url).then( res => res.html() ).then(data => resolve(data)).catch(err => reject(err)));
    return p;
}

export function signUp() {

    return (dispatch, getState) => {

        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);
        const {facebookData} = getState();

        defaultHttpParams.method = "POST";
        defaultHttpParams.headers['auth-token'] = window.sessionStorage.getItem('fb-auth-token');

        try {
            defaultHttpParams.body = JSON.stringify(facebookData);

        } catch(err) {
            console.error('Action signUp() stringify state Error: ', err);
        };

        dispatch( loading(true) );

        fetch( API().signup, defaultHttpParams ).then( res => res.json() ).then(data => {

            try {

                if(data.statusCode !== 200) {
                    throw new Error(data.customMessage || data.message);
                } else {

                    // getListTemplates().then(data => {
                    //     dispatch(data);
                    //     dispatch( loading(false) );
                    // });
                    console.log('User created successfully.');
                    dispatch( loading(false) );

                }

            } catch(err) {
                dispatch( loading(false) );
                console.error('Action signUp()/getListTemplates() Error: ', err);
            }

        }).catch(err => {
            dispatch( loading(false) );
            console.error('Action signUp() Error: ', err);
        });

    };
}

export function getListTemplates() {

    return (dispatch, getState) => {
    // let p = new Promise( (resolve, reject) => {

        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);

        defaultHttpParams.headers['auth-token'] = window.sessionStorage.getItem('fb-auth-token');

        fetch( API().getListTemplates, defaultHttpParams ).then( res => res.json() ).then(data => {

            dispatch({
                type: SET_TEMPLATE_LIST,
                payload: data.response
            });

        }).catch(err => {
            console.error('Action getListTemplates() Error: ', err);
            // reject(err);
        });

    // });
    };

    // return p;

}

export function createUserSpace() {

    let p = new Promise( (resolve, reject) => {

        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);

        defaultHttpParams.headers['auth-token'] = window.sessionStorage.getItem('fb-auth-token');

        fetch( API().createUserSpace, defaultHttpParams ).then( res => res.json() ).then(data => {

            resolve({
                type: SET_TEMPLATE_LIST,
                payload: data.response
            });

        }).catch(err => {
            console.error('Action createUserSpace() Error: ', err);
            reject(err);
        });

    });

    return p;

}

export function closeLiveTemplate() {
    return (dispatch) => {
        dispatch( openLiveTemplate(false) );
    }
}

export function openLiveTemplate(open) {
    return {
        type: OPEN_LIVE_TEMPLATE,
        payload: open
    }
}

function loading(isLoading) {
    return {
        type: LOADING,
        payload: isLoading
    }
}

function getPageInfos() {

    let p = new Promise( (resolve, reject) => {

        window.FB.api('/me/accounts?fields=link,about,name,category', function(response) {
            resolve(response);
        });

    });

    return p;

}

function getLoginStatus() {

    let p = new Promise( (resolve, reject) => {

        window.FB.getLoginStatus(response => {
            resolve(response);
        });

    });

    return p;

}