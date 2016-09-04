import {LOADING, UPDATE_FB_DATA} from "./constants";

export function getFacebookData(facebookData) {
    return dispatch => {

        dispatch( loading(true) );

        getPageInfos().then(pageData => {

            facebookData.pages = pageData.data;

            dispatch( loading(false) );

            return {
                type: UPDATE_FB_DATA,
                payload: facebookData
            };

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