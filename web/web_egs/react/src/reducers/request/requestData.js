import {TYPE} from '../../config'

const _TYPE = TYPE.REQUEST.REQUEST_DATA

const init = {
    steps: null,
    status: null
}

export default function reducer(state = init, action) {
    switch (action.type) {
        case _TYPE.SET_STEP:
            return {
                ...state,
                steps: action.payload
            }
        case _TYPE.SET_STATUS:
            return {
                ...state,
                status: action.payload
            }
        case _TYPE.SET_UNMOUNT:
            return {
                ...state,
                steps: null
            }
    }
    return state
}