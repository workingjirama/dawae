import {TYPE} from '../../config'

const _TYPE = TYPE.DATA.DATA_DEFENSE

const init = {
    defenses: null,
    actions: null,
    defenseStatuses: null,
    docStatuses: null,
    postDefDocStatuses: null
}

export default function reducer(state = init, action) {
    switch (action.type) {
        case _TYPE.SET_ALL_DEFENSE:
            return {
                ...state,
                defenses: action.payload
            }
        case _TYPE.SET_ALL_ACTION:
            return {
                ...state,
                actions: action.payload
            }
        case _TYPE.SET_ALL_DOC_STATUS:
            return {
                ...state,
                docStatuses: action.payload
            }
        case _TYPE.SET_ALL_DEFENSE_STATUS:
            return {
                ...state,
                defenseStatuses: action.payload
            }
        case _TYPE.SET_ALL_POST_DEFENSE_DOCUMENT_STATUS:
            return {
                ...state,
                postDefDocStatuses: action.payload
            }
        case _TYPE.UPDATE_DEFENSE:
            return {
                ...state,
                defenses: [
                    ...state.defenses.slice(0, action.payload.index),
                    action.payload.defense,
                    ...state.defenses.slice(action.payload.index + 1)
                ]
            }
        case _TYPE.RESET:
            return init
    }
    return state
}