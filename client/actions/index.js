import {LOADING, FETCHED} from "./constants";

function loading(isLoading) {
    return {
        type: LOADING,
        payload: isLoading
    }
}

export function fecthed() {
    return dispatch => {

        dispatch( loading(true) );
        setTimeout(function(){
            dispatch( loading(false) );
        },5000);

    }    
}