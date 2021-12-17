import { ADD_BUILDING_INFO, UPDATE_BUILDING_INFO, REMOVE_BUILDING_INFO } from "./types"

const initialState = {
    buildings: []
}

export const buildingReducer = (state = initialState, action) => {
    switch (action.type) {
        //Add
        case ADD_BUILDING_INFO:
            return { ...state, buildings: state.buildings.concat(action.payload) }
        //Update
        case UPDATE_BUILDING_INFO:
            const index = state.buildings.findIndex(building => building.date === action.payload.date); //finding index of the item
            const newArray = [...state.buildings]; //making a new array
            Object.keys(newArray[index]).map((key) => {
                newArray[index] = { ...newArray[index], [key]: action.payload[key] }
                return null
            })
            return {
                ...state, //copying the orignal state
                buildings: newArray,
            }
        //Delete
        case REMOVE_BUILDING_INFO:
            const filteredBuildings = state.buildings.filter(building => building.date !== action.payload)
            return {
                ...state,
                buildings: filteredBuildings
            }
        default: return state
    }
}