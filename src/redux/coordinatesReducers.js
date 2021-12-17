import { SET_BUILDING_COORDINATES } from "./types"

const initialState = {
    coordinates: null,
}

export const coordinatesReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BUILDING_COORDINATES:
            return { coordinates: action.payload }
        default: return state
    }
}