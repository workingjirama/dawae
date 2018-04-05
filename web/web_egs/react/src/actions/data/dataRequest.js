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

export function getAllPostReqDocStatus() {
    return dispatch => {
        fetch(_URL.GET_ALL_POST_REQUEST_DOCUMENT_STATUS, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_POST_REQUEST_DOCUMENT_STATUS,
                payload: json
            })
        })
    }
}


export function getAllPetStatus() {
    return dispatch => {
        fetch(_URL.GET_ALL_REQUEST_DOCUMENT_STATUS, {
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

export function getAllFeeStatus() {
    return dispatch => {
        fetch(_URL.GET_ALL_FEE_STATUS, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_FEE_STATUS,
                payload: json
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

export function updateUserRequest(index, userRequest) {
    return dispatch => {
        dispatch({
            type: _TYPE.UPDATE_USER_REQUEST,
            payload: {
                index, userRequest
            }
        })
    }
}

export function toggleFee(checked, userRequest, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: userRequest.student.id,
            calendarId: userRequest.calendar_item.calendar_id,
            actionId: userRequest.calendar_item.action_id,
            levelId: userRequest.calendar_item.level_id,
            semesterId: userRequest.calendar_item.semester_id,
            owner_id: userRequest.calendar_item.owner_id,
            paid: checked
        }))
        fetch(_URL.UPDATE_REQUEST_FEE, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json()
        }).then(function (response) {
            callback(response)
        })
    }
}

export function togglePetition(checked, userRequest, requestDocument, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: userRequest.student.id,
            calendarId: userRequest.calendar_item.calendar_id,
            actionId: userRequest.calendar_item.action_id,
            levelId: userRequest.calendar_item.level_id,
            semesterId: userRequest.calendar_item.semester_id,
            documentId: requestDocument.document.document_id,
            ownerId: userRequest.calendar_item.owner_id,
            requestDocumentId: checked ? 1 : null
        }))
        fetch(_URL.UPDATE_REQUEST_DOCUMENT, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(function (response) {
            return response.json()
        }).then(function (response) {
            callback(response)
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
