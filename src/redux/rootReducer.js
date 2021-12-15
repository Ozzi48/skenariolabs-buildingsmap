import { combineReducers } from "redux";
import { coordinatesReducer } from "./coordinatesReducers"
import { buildingReducer } from "./buildingReducers"
import { appReducer } from "./appReducers"

export const rootReducer = combineReducers({
    coordinates: coordinatesReducer,
    buildings: buildingReducer,
    app: appReducer
})