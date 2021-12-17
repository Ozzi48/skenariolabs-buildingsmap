import { HIDE_LOADING, SHOW_LOADING, FORM_IS_OPEN } from "./types"

const initialState = {
    loading: false,
    openform: false
}

export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_LOADING:
            return { ...state, loading: true }
        case HIDE_LOADING:
            return { ...state, loading: false }
        case FORM_IS_OPEN:
            return { ...state, openform: !state.openform }
        default: return state
    }
}