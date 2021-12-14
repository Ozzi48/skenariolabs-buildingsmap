import { combineReducers } from "redux";
import { coordinatesReducer } from "./coordinatesReducers";
import { buildingReducer } from "./buildingReducers";

export const rootReducer = combineReducers({
    coordinates: coordinatesReducer,
    buildings: buildingReducer
})