import {TYPE} from '../../config'

const _TYPE = TYPE.DATA.DATA_REQUEST

const init = {
    userRequests: null,
    actions: null,
    petStatuses: null,
    feeStatuses: null,
    postReqDocStatuses: null
}

export default function reducer(state = init, action) {
    switch (action.type) {
        case _TYPE.SET_ALL_USER_REQUEST:
            return {
                ...state,
                userRequests: action.payload
            }
        case _TYPE.SET_ALL_ACTION:
            return {
                ...state,
                actions: action.payload
            }
        case _TYPE.SET_ALL_POST_REQUEST_DOCUMENT_STATUS:
            return {
                ...state,
                postReqDocStatuses: action.payload
            }
        case _TYPE.SET_ALL_PET_STATUS:
            return {
                ...state,
                petStatuses: action.payload
            }
        case _TYPE.SET_ALL_FEE_STATUS:
            return {
                ...state,
                feeStatuses: action.payload
            }
        case _TYPE.UPDATE_USER_REQUEST:
            return {
                ...state,
                userRequests: [
                    ...state.userRequests.slice(0, action.payload.index),
                    action.payload.userRequest,
                    ...state.userRequests.slice(action.payload.index + 1)
                ]
            }
        case _TYPE.RESET:
            return init
    }
    return state
}