import { SET_BUILDING_COORDINATES, ADD_BUILDING_INFO, UPDATE_BUILDING_INFO, REMOVE_BUILDING_INFO } from "./types";

export function setBuildingCoordinates(coordinates) {
    return {
        type: SET_BUILDING_COORDINATES,
        payload: coordinates
    }
}

export function addBuildingInfo(building) {
    return {
        type: ADD_BUILDING_INFO,
        payload: building
    }
}

export function updateBuildingInfo(building) {
    return {
        type: UPDATE_BUILDING_INFO,
        payload: building
    }
}

export function removeBuildingInfo(date) {
    return {
        type: REMOVE_BUILDING_INFO,
        payload: date
    }
}