import {URL, TYPE} from "../../config"
import 'whatwg-fetch'

const _URL = URL.DATA.DATA_DEFENSE
const _TYPE = TYPE.DATA.DATA_DEFENSE

export function getAllDefense() {
    return dispatch => {
        fetch(_URL.GET_ALL_DEFENSE).then(response => {
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
        fetch(_URL.GET_ALL_DEFENSE_STATUS).then(response => {
            return response.json()
        }).then(json => {
            dispatch({
                type: _TYPE.SET_ALL_DEFENSE_STATUS,
                payload: json
            })
        })
    }
}

export function getDefenseDetail(index, defense) {
    const calendarItem = defense.calendar_item
    return dispatch => {
        fetch(_URL.GET_DETAIL(calendarItem.calendar_id, calendarItem.action_id, calendarItem.level_id, calendarItem.semester_id, defense.defense_type.action_id)).then(response => {
            return response.json()
        }).then(json => {
            const newDefense = Object.assign({}, defense, {
                detail: json
            })
            dispatch({
                type: _TYPE.UPDATE_DEFENSE,
                payload: {
                    index,
                    defense: newDefense
                }
            })
        })
    }
}

export function getAllAction() {
    return dispatch => {
        fetch(_URL.GET_ALL_ACTION).then(response => {
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
