import {URL, TYPE} from "../../config"
import 'whatwg-fetch'

const _URL = URL.DATA.DATA_REQUEST
const _TYPE = TYPE.DATA.DATA_REQUEST

export function getAllUserRequest() {
    return dispatch => {
        fetch(_URL.GET_ALL_USER_REQUEST, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_USER_REQUEST,
                payload: json
            })
        })
    }
}

export function getAllPetStatus() {
    return dispatch => {
        fetch(_URL.GET_ALL_PET_STATUS, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_PET_STATUS,
                payload: json
            })
        })
    }
}

export function getAllDocStatus() {
    return dispatch => {
        fetch(_URL.GET_ALL_DOC_STATUS, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_DOC_STATUS,
                payload: json
            })
        })
    }
}


export function getUserRequestDetail(index, userRequest) {
    const calendarItem = userRequest.calendar_item
    return dispatch => {
        fetch(_URL.GET_DETAIL(calendarItem.calendar_id, calendarItem.action_id, calendarItem.level_id, calendarItem.semester_id, userRequest.student.id), {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            const newUserRequest = Object.assign({}, userRequest, {
                detail: json
            })
            dispatch({
                type: _TYPE.UPDATE_USER_REQUEST,
                payload: {
                    index,
                    userRequest: newUserRequest
                }
            })
        })
    }
}

export function getAllAction() {
    return dispatch => {
        fetch(_URL.GET_ALL_ACTION, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_ACTION,
                payload: json
            })
        })
    }
}


export function resetDataRequest() {
    return dispatch => {
        dispatch({
            type: _TYPE.RESET
        })
    }
}
