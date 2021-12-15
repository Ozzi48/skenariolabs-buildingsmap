import { ADD_BUILDING_INFO, UPDATE_BUILDING_INFO, REMOVE_BUILDING_INFO } from "./types"

const initialState = {
    buildings: []
}

export const buildingReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_BUILDING_INFO:
            return { ...state, buildings: state.buildings.concat(action.payload) }
        case UPDATE_BUILDING_INFO:
            const index = state.buildings.findIndex(building => building.date === action.payload.date); //finding index of the item
            console.log(index)
            const newArray = [...state.buildings]; //making a new array
            console.log('New', newArray[index])
            console.log('Payload', action.payload)
            var key = '';
            for (key in newArray[index]) {
                console.log('Payload', action.payload[key])
                console.log('New', newArray[index][key])
                if (key !== 'date')
                    newArray[index] = { ...newArray[index], [key]: action.payload[key] }
            }
            return {
                ...state, //copying the orignal state
                buildings: newArray, //reassingning todos to new array
            }
        case REMOVE_BUILDING_INFO:
            const filteredBuildings = state.buildings.filter(building => building.date !== action.payload)
            return {
                ...state,
                buildings: filteredBuildings
            }
        default: return state
    }
}