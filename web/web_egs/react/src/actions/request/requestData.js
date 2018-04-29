import {URL, TYPE} from "../../config"
import 'whatwg-fetch'

const _URL = URL.REQUEST.REQUEST_DATA
const _TYPE = TYPE.REQUEST.REQUEST_DATA

export function getStep(actionId) {
    return dispatch => {
        fetch(_URL.GET_STEP(actionId), {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(response => {
            dispatch({
                type: _TYPE.SET_STEP,
                payload: response
            })
        })
    }
}

export function updateResult(userRequest, defense, post, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: userRequest.student.id,
            calendarId: userRequest.calendar_item.calendar_id,
            actionId: userRequest.calendar_item.action_id,
            levelId: userRequest.calendar_item.level_id,
            semesterId: userRequest.calendar_item.semester_id,
            ownerId: userRequest.calendar_item.owner_id,
            defenseTypeId: defense.defense_type.action_id,
            cond: post.cond,
            score: post.score,
            credit: post.credit,
            comment: post.comment
        }))
        fetch(_URL.UPDATE_RESULT, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            callback(json)
        })
    }
}

export function getDefenseStatus() {
    return dispatch => {
        fetch(_URL.GET_STATUS, {
            method: 'post',
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_STATUS,
                payload: json
            })
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

export function toggledefenseDocument(file, userRequest, defenseDocument, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: userRequest.student.id,
            calendarId: userRequest.calendar_item.calendar_id,
            actionId: userRequest.calendar_item.action_id,
            levelId: userRequest.calendar_item.level_id,
            semesterId: userRequest.calendar_item.semester_id,
            documentId: defenseDocument.document.document_id,
            ownerId: userRequest.calendar_item.owner_id,
            defenseTypeId: userRequest.defenses[0].defense_type.action_id
        }))
        data.append('paper', file)
        fetch(_URL.UPDATE_DEFENSE_DOCUMENT, {
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

export function unmount(index, userRequest) {
    return dispatch => {
        dispatch({
            type: _TYPE.SET_UNMOUNT
        })
    }
}