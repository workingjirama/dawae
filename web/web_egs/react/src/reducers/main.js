import {TYPE} from './../config'

const init = {
    header: "HOME",
    container: null,
    currentUser: null
}
export default function reducer(state = init, action) {
    switch (action.type) {
        case TYPE.MAIN.SET_HEADER:
            return {
                ...state,
                header: action.payload
            }
        case TYPE.MAIN.SET_CONTAINER:
            return {
                ...state,
                container: action.payload
            }
        case TYPE.MAIN.SET_CURRENT_USER:
            return {
                ...state,
                currentUser: action.payload
            }
    }
    return state
}