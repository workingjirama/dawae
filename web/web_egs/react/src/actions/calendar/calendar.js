import {URL, TYPE} from "../../config"

const _URL = URL.CALENDAR.CALENDAR
const _TYPE = TYPE.CALENDAR.CALENDAR

const ACTIVE_CALENDAR = 1

export function getAllCalendarItem(calendarId) {
    return dispatch => {
        fetch(_URL.GET_ALL_CALENDAR_ITEM(calendarId)).then(function (response) {
            return response.json()
        }).then(function (json) {
            dispatch({
                type: _TYPE.SET_ALL_CALENDAR_ITEM,
                payload: json
            })
        })
    }
}

export function getAllSemester() {
    return dispatch => {
        fetch(_URL.GET_ALL_SEMESTER).then(function (response) {
            return response.json()
        }).then(function (json) {
            dispatch({
                type: _TYPE.SET_ALL_SEMESTER,
                payload: json
            })
        })
    }
}

export function getActiveActionItem() {
    return dispatch => {
        fetch(_URL.GET_ALL_ACTION_ITEM).then(function (response) {
            return response.json()
        }).then(function (json) {
            dispatch({
                type: _TYPE.SET_ALL_ACTION_ITEM,
                payload: json
            })
        })
    }
}

export function updateCalendarItem(idx, calendarItem) {
    return dispatch => {
        const data = new FormData()
        data.append('json', JSON.stringify(calendarItem))
        fetch(_URL.UPDATE_CALENDAR_ITEM, {
            method: 'post',
            body: data
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            if (json === 1)
                dispatch({
                    type: _TYPE.UPDATE_CALENDAR_ITEM,
                    payload: {idx, calendarItem}
                })
        })
    }
}

export function resetCalendarLevel() {
    return dispatch => {
        dispatch({
            type: _TYPE.RESET
        })
    }
}

export function getAllLevel() {
    return function (dispatch) {
        fetch(_URL.GET_ALL_LEVEL).then(function (response) {
            return response.json()
        }).then(function (json) {
            dispatch({
                type: _TYPE.SET_ALL_LEVEL,
                payload: json
            })
        })
    }
}

export function activateCalendar(calendar) {
    return function (dispatch) {
        const data = new FormData()
        data.append('json', JSON.stringify(calendar))
        fetch(_URL.ACTIVATE_CALENDAR, {
            method: 'post',
            body: data,
        }).then(function (response) {
            return response.json()
        }).then(function (json) {
            console.log(json)
            if (json === 1) {
                let _calendar = Object.assign({}, calendar, {calendar_active: ACTIVE_CALENDAR})
                dispatch({
                    type: _TYPE.SET_CALENDAR,
                    payload: _calendar
                })
            }
        })
    }
}

export function getCalendar(calendarId) {
    return function (dispatch) {
        fetch(_URL.GET_CALENDAR(calendarId)).then(function (response) {
            return response.json()
        }).then(function (json) {
            dispatch({
                type: _TYPE.SET_CALENDAR,
                payload: json
            })
        })
    }
}