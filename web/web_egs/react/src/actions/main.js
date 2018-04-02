import {URL, TYPE} from "./../config"

export function setHeader(header) {
    return function (dispatch) {
        dispatch({
            type: TYPE.MAIN.SET_HEADER,
            payload: header
        })
    }
}

export function setContainer(container) {
    return function (dispatch) {
        dispatch({
            type: TYPE.MAIN.SET_CONTAINER,
            payload: container
        })
    }
}

export function getCurrntUser() {
    return function (dispatch) {
        fetch(URL.MAIN.GET_CURRENT_USER, {
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            dispatch({
                type: TYPE.MAIN.SET_CURRENT_USER,
                payload: json
            })
        })
    }
}
