import { ADD_BUILDING_INFO } from "./types"

const initialState = {
    buildings: []
}

export const buildingReducer = (state = initialState, action) => {
    switch(action.type){
        case ADD_BUILDING_INFO:
            return {...state, buildings: state.buildings.concat(action.payload)}
        default: return state
    }
}