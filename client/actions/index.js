import {LOADING, FETCHED} from "./constants";

function loading(isLoading) {
    return {
        type: LOADING,
        payload: isLoading
    }
}

export function userData() {
    return dispatch => {

        dispatch( loading(true) );
        setTimeout(function(){
            dispatch( loading(false) );
        },5000);

    }    
}

export function getPageInfos() {
    return dispatch => {

        dispatch( loading(true) );
        setTimeout(function(){
            dispatch( loading(false) );
        },5000);

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