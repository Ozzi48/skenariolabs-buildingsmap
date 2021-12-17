import { SET_BUILDING_COORDINATES, FORM_IS_OPEN } from "./types"

const initialState = {
    coordinates: null,
}

export const coordinatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUILDING_COORDINATES:
            return { coordinates: action.payload }
        case FORM_IS_OPEN:
            return { coordinates: null }
        default: return state
    }
}