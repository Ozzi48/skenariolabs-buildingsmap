import { SET_BUILDING_COORDINATES } from "./types"

const initialState = {
    coordinates: {lng: 24.940594677145064, lat: 60.171545300000005},
}

export const coordinatesReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_BUILDING_COORDINATES:
            return {coordinates: action.payload}
        default: return state
    }
}