import {
    LOADING, 
    UPDATE_FB_DATA, 
    SELECT_PAGE,
    FANPAGE_LIST_STEP
} from "./constants";

export function getFacebookData(facebookData) {

    return dispatch => {

        dispatch( loading(true) );

        Promise.all([getPageInfos(), getLoginStatus()]).then(arrResponse => { 

            let pageData = arrResponse[0];
            let loginStatus = arrResponse[1];

            facebookData.pages = pageData.data;
            facebookData.loginStatus = loginStatus.status;

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