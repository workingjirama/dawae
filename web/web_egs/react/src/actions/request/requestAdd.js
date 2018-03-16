import {URL, TYPE} from "../../config"
import 'whatwg-fetch'

const _URL = URL.REQUEST.REQUEST_ADD
const _TYPE = TYPE.REQUEST.REQUEST_ADD

export function getCalendarItem(calendarId, semesterId, actionId, callback) {
    return dispatch => {
        fetch(_URL.GET_CALENDAR_ITEM(calendarId, semesterId, actionId), {credentials: 'same-origin'}).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_CALENDAR_ITEM,
                payload: json
            })
            callback(json)
        })
    }
}

export function getAllTeacher() {
    return dispatch => {
        fetch(_URL.GET_ALL_TEACHER).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_TEACHER,
                payload: json
            })
        })
    }
}

export function getAllPosition(actionId) {
    return dispatch => {
        fetch(_URL.GET_ALL_POSITION(actionId)).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_POSITION,
                payload: json
            })
        })
    }
}

export function getAllRoom() {
    return dispatch => {
        fetch(_URL.GET_ALL_ROOM).then(resp => {
            return resp.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_ROOM,
                payload: json
            })
        })
    }
}

export function setPost(post) {
    return dispatch => {
        dispatch({
            type: _TYPE.SET_POST,
            payload: post
        })
    }
}

export function insertUserRequest(post, calendarItem) {
    return dispatch => {
        const data = new FormData()
        post = {
            ...post,
            isDefense: calendarItem.action.is_defense,
            calendarItem: {
                calendarId: calendarItem.calendar.calendar_id,
                actionId: calendarItem.action.action_id,
                levelId: calendarItem.level.level_id,
                semesterId: calendarItem.semester.semester_id,
            }
        }
        data.append('json', JSON.stringify(post))
        fetch(_URL.INSERT_USER_REQUEST, {
            method: 'post',
            body: data,
            credentials: 'same-origin'
        }).then(response => {
            return response.json()
        }).then(json => {
            console.log(json)
        })
    }
}

export function resetRequestAdd() {
    return dispatch => {
        dispatch({
            type: _TYPE.RESET
        })

    }
}