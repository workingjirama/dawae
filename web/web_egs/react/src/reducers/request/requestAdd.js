import {TYPE} from '../../config'

const _TYPE = TYPE.REQUEST.REQUEST_ADD

const init = {
    calendarItem: null,
    teachers: null,
    positions: null,
    rooms: null,
    post: {
        teachers: [],
        defenses: []
    }
}

export default function reducer(state = init, action) {
    switch (action.type) {
        case _TYPE.SET_CALENDAR_ITEM:
            return {
                ...state,
                calendarItem: action.payload
            }
        case _TYPE.SET_ALL_TEACHER:
            return {
                ...state,
                teachers: action.payload
            }
        case _TYPE.SET_ALL_POSITION:
            return {
                ...state,
                positions: action.payload
            }
        case _TYPE.SET_POST:
            return {
                ...state,
                post: action.payload
            }
        case _TYPE.SET_ALL_ROOM:
            return {
                ...state,
                rooms: action.payload
            }
        case _TYPE.RESET:
            return init
    }
    return state
}