import {TYPE} from '../../config'

const _TYPE = TYPE.CALENDAR.CALENDAR_LIST

const init = {
    all: null,
    active: {btnAddCalendar: true},
    post: {
        calendar: {
            year: null
        }
    }
}

export default function reducer(state = init, action) {
    switch (action.type) {
        case _TYPE.SET_ALL:
            return {
                ...state,
                all: action.payload
            }
        case _TYPE.SET_POST:
            return {
                ...state,
                post: action.payload
            }
        case _TYPE.SET_BTN_ACTIVE:
            return {
                ...state,
                active: {
                    ...state.active,
                    btnAddCalendar: !state.active.btnAddCalendar
                }
            }
        case _TYPE.RESET:
            return init
    }
    return state
}