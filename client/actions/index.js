import {FETCH, FETCHED} from "./constants";

function fecthing() {
    return {
        type: FETCH,
        payload: null
    }
}

function done() {
    return {
        type: FETCHED,
        payload: null
    }
}

export function fecthed() {
    return dispatch => {

        dispatch(fecthing());
        setTimeout(function(){
            dispatch(done());
        },5000);

    }    
}