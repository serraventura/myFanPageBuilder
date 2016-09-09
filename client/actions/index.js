import {
    LOADING, 
    UPDATE_FB_DATA, 
    SELECT_PAGE,
    FANPAGE_LIST_STEP,
    SET_TEMPLATE_LIST
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

export function setFanPageListStep(status) {
    return dispatch => {
        dispatch({
            type: FANPAGE_LIST_STEP,
            payload: status
        });
    };
}

export function selectPage(page) {
    return dispatch => {
        dispatch({
            type: SELECT_PAGE,
            payload: page
        });
    };
}

export function getListTemplates() {

    return dispatch => {

        let defaultHttpParams = Object.assign({}, DEFAULT_HTTP_PARAMS);

        defaultHttpParams.headers['auth-token'] = window.sessionStorage.getItem('fb-auth-token');

        fetch( API().getListTemplates, defaultHttpParams ).then( res => res.json() ).then(data => {

            dispatch({
                type: SET_TEMPLATE_LIST,
                payload: data.response
            });

        }).catch(err => {
            console.error('Action getListTemplates() Error: ', err);
        });;

    };

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