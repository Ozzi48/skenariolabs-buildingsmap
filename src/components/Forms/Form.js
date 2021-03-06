import React, { useState, useEffect } from 'react'
import { FormLabel, FormInput, DescriptionInput, FormButton, FormContainer, ButtonContainer, Icon, CloseIcon } from './FormElements'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import promoPicture from '../../media/PromoPicture.svg'
import { connect } from 'react-redux'
import { setBuildingCoordinates, addBuildingInfo, showLoading, hideLoading, updateBuildingInfo, formIsOpen } from '../../redux/actions'
import Loader from '../Loader'
import { useToasts } from "react-toast-notifications"
const myAPIKey = '8f29ca4faadf42c6aa352315c93dc662';
const notMandatoryFields = ["lat", "lon", "description", "date"];

const Form = (props) => {
    const { addToast } = useToasts()
    const [buildingData, setBuildingData] = useState({
        name: '', street: '', housenumber: '', postcode: '',
        city: '', county: '', country: '', lat: 0, lon: 0, description: '', date: ''
    })

    useEffect(() => {
        //if selected item exists set item values to building data object
        if (props.item != null) {
            setBuildingData({
                name: props.item.name, street: props.item.street, housenumber: props.item.housenumber, postcode: props.item.postcode,
                city: props.item.city, county: props.item.county, country: props.item.country, lat: props.item.lat, lon: props.item.lon,
                description: props.item.description, date: props.item.date
            })
        }

    }, [props.item])

    //set building data from autocomplete input fields
    function onPlaceSelect(value, name) {
            setBuildingData({ ...buildingData, [name]: value })
    }

    //set building data from inputs
    const changeHandler = (e) => {
        setBuildingData({ ...buildingData, [e.target.name]: e.target.value })
    }

    //create date fro added building
    const createDate = () => {
        let today = new Date();
        let date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        let time = today.toTimeString().split(' ')[0];
        return date + ' ' + time;
    }

    //on add building press
    const handleSubmitButtons = async (button) => {
        props.showLoading() //set loading to true
        let checkEmptyKeys = [] //array to store keys
        let message = ""
        let fullBuildingData = {};
        //check empty fields
        checkEmptyKeys = Object.keys(buildingData)
            .filter(key => !notMandatoryFields.includes(key))
            .filter(key => buildingData[key] == null || buildingData[key] === '');
        //if array of keys are not empty show toast with info and set loading to false
        if (checkEmptyKeys.length > 0) {
            message = checkEmptyKeys.toString() + " are empty. Please, fill all fields"
            props.hideLoading()
            addToast(message, {
                appearance: 'info',
                autoDismiss: true,
            })
        } else {
            //if array empty call api to get coordinates
            await fetch(`https://api.geoapify.com/v1/geocode/search?name=${buildingData.name}&street=${buildingData.street}
            &housenumber=${buildingData.housenumber}&postcode=${buildingData.postcode}&city=${buildingData.city}&county=${buildingData.county}
            &country=${buildingData.country}&apiKey=${myAPIKey}`)
                .then(response => response.json())
                .then(result => {
                    if (button === 'check') {
                        //if press check button, just set coordinates to redux and show on the map this building
                        props.setBuildingCoordinates({
                            lng: result.features[0].geometry.coordinates[0],
                            lat: result.features[0].geometry.coordinates[1]
                        })
                    }
                    if (button === 'add') {
                        //if press add button, set building coordinates and create date
                        fullBuildingData = {
                            ...buildingData, lon: result.features[0].geometry.coordinates[0],
                            lat: result.features[0].geometry.coordinates[1], date: createDate()
                        }
                        props.addBuildingInfo(fullBuildingData) //add building to list of buildings in redux
                        //setBuilding to empty keys, set message and show toast
                        setBuildingData({
                            name: '', street: '', housenumber: '', postcode: '',
                            city: '', county: '', country: '', lat: 0, lon: 0, description: '', date: ''
                        })
                        props.formIsOpen()
                        message = "Success. You have added building"
                        addToast(message, {
                            appearance: 'info',
                            autoDismiss: true,
                        })
                    }
                    if (button === 'update') {
                        //set coordinates to object 
                        fullBuildingData = {
                            ...buildingData, lon: result.features[0].geometry.coordinates[0],
                            lat: result.features[0].geometry.coordinates[1],
                        }
                        //update building data in redux and set message 
                        props.updateBuildingInfo(fullBuildingData)
                        message = "Success. You have updated building"
                        addToast(message, {
                            appearance: 'info',
                            autoDismiss: true,
                        })
                    }
                }).finally(() => {
                    props.hideLoading() //set loading to false
                })
                .catch(e => {
                    //if error, set message, show toast and setloading to false
                    message = "Something went wrong. Try again!"
                    props.hideLoading()
                    addToast(message, {
                        appearance: 'info',
                        autoDismiss: true,
                    })
                });
        }
    }
    return (
        <FormContainer>
            {props.Xicon ?
            <Icon>
                <CloseIcon onClick={() => props.formIsOpen()}/>
            </Icon>
            :
            null
            }
            {props.loading
                ?
                <Loader />
                :
                <img
                    style={{ width: 250, height: '100%', margin: 10 }}
                    src={promoPicture}
                    alt="Add your building" />
            }
            <div style={{ display: "flex", flexDirection: 'column' }}>
                {/* Name or entrance name Input */}
                <FormLabel>Name of the building</FormLabel>
                <FormInput
                    type="text"
                    name="name"
                    placeholder='Enter name of the building or entance'
                    value={buildingData.name}
                    onChange={changeHandler} />
                {/* Street Input */}
                <FormLabel>Street</FormLabel>
                <GeoapifyContext apiKey={myAPIKey}>
                    <GeoapifyGeocoderAutocomplete
                        placeholder="Enter street name here"
                        type="street"
                        value={buildingData.street}
                        placeSelect={(value) => onPlaceSelect(value?.properties.address_line1, 'street')}
                    />
                </GeoapifyContext>
                {/* House Number Input */}
                <FormLabel>Street Nr.</FormLabel>
                <FormInput
                    type="text"
                    name="housenumber"
                    placeholder='Enter house number here'
                    value={buildingData.housenumber}
                    onChange={changeHandler} />
                {/* Postal code Input */}
                <FormLabel>Postal code</FormLabel>
                <FormInput
                    type="text"
                    name="postcode"
                    placeholder='Enter post code here'
                    value={buildingData.postcode}
                    onChange={changeHandler} />
                {/* City Input */}
                <FormLabel>City</FormLabel>
                <GeoapifyContext apiKey={myAPIKey}>
                    <GeoapifyGeocoderAutocomplete
                        placeholder="Enter city here"
                        type="city"
                        value={buildingData.city}
                        placeSelect={(value) => onPlaceSelect(value?.properties.city, 'city')}
                    />
                </GeoapifyContext>
                {/* Municipality Input */}
                <FormLabel>Municipality</FormLabel>
                <FormInput
                    type="text"
                    name="county"
                    placeholder='Enter municipality here'
                    value={buildingData.county}
                    onChange={changeHandler} />
                {/* Country Input */}
                <FormLabel>Country</FormLabel>
                <GeoapifyContext apiKey={myAPIKey}>
                    <GeoapifyGeocoderAutocomplete
                        placeholder="Enter country here"
                        type="country"
                        value={buildingData.country}
                        placeSelect={(value) => onPlaceSelect(value?.properties.country, 'country')}
                    />
                </GeoapifyContext>
                {/* Description Input */}
                <FormLabel>Description</FormLabel>
                <DescriptionInput
                    name="description"
                    placeholder='Enter your description'
                    value={buildingData.description}
                    onChange={changeHandler} />
                {/* Buttons */}
                {props.formButtons === 'Add' ?
                    <ButtonContainer>
                        <FormButton
                            onClick={() => handleSubmitButtons('check')}
                            disabled={props.loading}
                            color="#161E54">
                            Check building
                        </FormButton>
                        <FormButton
                            onClick={() => handleSubmitButtons('add')}
                            disabled={props.loading}
                            color="#FF6347">
                            Add building
                        </FormButton>
                    </ButtonContainer>
                    :
                    <ButtonContainer>
                        <FormButton
                            onClick={() => handleSubmitButtons('update')}
                            color="#161E54"
                            style={{ marginTop: 10 }}
                            disabled={props.loading}>
                            Update building Info
                    </FormButton>
                        <FormButton
                            onClick={props.handleIsOpen}
                            color="#161E54"
                            style={{ marginTop: 10 }}
                            disabled={props.loading}>
                            Cancel
                    </FormButton>
                    </ButtonContainer>
                }
            </div>
        </FormContainer>
    )
}

const mapDispatchToProps = {
    setBuildingCoordinates,
    addBuildingInfo,
    updateBuildingInfo,
    showLoading,
    hideLoading, 
    formIsOpen
}

const mapStateToProps = state => {
    return {
        loading: state.app.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Form)
