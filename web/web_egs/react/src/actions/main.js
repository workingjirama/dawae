import {TYPE} from "./../config"

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
