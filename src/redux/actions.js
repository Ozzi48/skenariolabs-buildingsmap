import { SET_BUILDING_COORDINATES, ADD_BUILDING_INFO, UPDATE_BUILDING_INFO, REMOVE_BUILDING_INFO, SHOW_LOADING, HIDE_LOADING, FORM_IS_OPEN } from "./types";


//all functions for redux
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

export function showLoading() {
    return {
        type: SHOW_LOADING
    }
}

export function hideLoading() {
    return {
        type: HIDE_LOADING
    }
}

export function formIsOpen() {
    return {
        type: FORM_IS_OPEN
    }
}
