import {URL, TYPE} from "../../config"
import 'whatwg-fetch'

const _URL = URL.DATA.DATA_DEFENSE
const _TYPE = TYPE.DATA.DATA_DEFENSE

export function getAllDefense() {
    return dispatch => {
        fetch(_URL.GET_ALL_DEFENSE, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_DEFENSE,
                payload: json
            })
        })
    }
}

export function getAllDefenseStatus() {
    return dispatch => {
        fetch(_URL.GET_ALL_DEFENSE_STATUS, {
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_DEFENSE_STATUS,
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

export function resetDataDefense() {
    return dispatch => {
        dispatch({
            type: _TYPE.RESET
        })
    }
}

export function updateResult(defense, post, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: defense.student.id,
            calendarId: defense.calendar_item.calendar_id,
            actionId: defense.calendar_item.action_id,
            levelId: defense.calendar_item.level_id,
            semesterId: defense.calendar_item.semester_id,
            ownerId: defense.calendar_item.owner_id,
            defenseTypeId: defense.defense_type.action_id,
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

export function updateDefenseComment(defense, comment, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: defense.student.id,
            calendarId: defense.calendar_item.calendar_id,
            actionId: defense.calendar_item.action_id,
            levelId: defense.calendar_item.level_id,
            semesterId: defense.calendar_item.semester_id,
            defenseTypeId: defense.defense_type.action_id,
            comment
        }))
        fetch(_URL.UPDATE_DEFENSE_COMMENT, {
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

export function updateDefenseScore(defense, score, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: defense.student.id,
            calendarId: defense.calendar_item.calendar_id,
            actionId: defense.calendar_item.action_id,
            levelId: defense.calendar_item.level_id,
            semesterId: defense.calendar_item.semester_id,
            defenseTypeId: defense.defense_type.action_id,
            score
        }))
        fetch(_URL.UPDATE_DEFENSE_SCORE, {
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

export function updateDefenseCredit(defense, credit, callback) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify({
            studentId: defense.student.id,
            calendarId: defense.calendar_item.calendar_id,
            actionId: defense.calendar_item.action_id,
            levelId: defense.calendar_item.level_id,
            semesterId: defense.calendar_item.semester_id,
            defenseTypeId: defense.defense_type.action_id,
            credit
        }))
        fetch(_URL.UPDATE_DEFENSE_CREDIT, {
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

export function updateDefense(index, defense) {
    return dispatch => {
        dispatch({
            type: _TYPE.UPDATE_DEFENSE,
            payload: {
                index, defense
            }
        })
    }
}

