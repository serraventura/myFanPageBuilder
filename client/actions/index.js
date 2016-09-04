import {LOADING, UPDATE_FB_DATA} from "./constants";

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