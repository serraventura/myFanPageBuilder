import {
    LOADING, 
    UPDATE_FB_DATA, 
    SELECT_PAGE,
    SELECT_TEMPLATE,
    SET_TEMPLATE_LIST,
    OPEN_LIVE_TEMPLATE,
    SET_TEMPLATE_CONFIG_MENU_ITEM
} from "./constants";

import {
    API,
    DEFAULT_HTTP_PARAMS
} from "../config";

export function getFacebookData(facebookData) {

    return dispatch => {

        dispatch( loading(true) );

        Promise.all([getPageInfos(), getLoginStatus()]).then(arrResponse => { 

            let pageData = arrResponse[0];
            let loginStatus = arrResponse[1];

            facebookData.pages = pageData.data;
            facebookData.loginStatus = loginStatus.status;

            window.sessionStorage.setItem('fb-auth-token', loginStatus.authResponse.accessToken);

            dispatch( loading(false) );

            dispatch({
                type: UPDATE_FB_DATA,
                payload: facebookData
            });

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

export function selectTemplate(template) {

    return (dispatch, getState) => {

        const {facebookData} = getState();
        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);

        let page = facebookData.pages.filter(item => item.id === facebookData.selectedPageId);
        if(page.length>0) page = page[0].link.match(/^http[s]?:\/\/.*?\/([a-zA-Z-_]+).*$/)[1];

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

                    dispatch({
                        type: SELECT_TEMPLATE,
                        payload: {
                            selectedPageTemplateUrl: API().templates + page,
                            selectedTemplate: data.response.details.templateName,
                            templateConfig: JSON.parse(data.response.templateConfig)
                        }
                    });

                    dispatch( openLiveTemplate(true) );

                    dispatch( loading(false) );

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

                    getListTemplates().then(data => {
                        dispatch(data);
                        dispatch( loading(false) );
                    });

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

    let p = new Promise( (resolve, reject) => {

        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);

        defaultHttpParams.headers['auth-token'] = window.sessionStorage.getItem('fb-auth-token');

        fetch( API().getListTemplates, defaultHttpParams ).then( res => res.json() ).then(data => {

            resolve({
                type: SET_TEMPLATE_LIST,
                payload: data.response
            });

        }).catch(err => {
            console.error('Action getListTemplates() Error: ', err);
            reject(err);
        });

    });

    return p;

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