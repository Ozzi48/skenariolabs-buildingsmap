import React, { useState } from 'react'
import { FormLabel, FormInput, DescriptionInput, FormButton, FormContainer } from './FormElements'
import { MainFormContainer } from './AddFormElements'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import promoPicture from '../../media/PromoPicture.svg'
import { connect } from 'react-redux'
import { setBuildingCoordinates, addBuildingInfo } from '../../redux/actions'

const myAPIKey = '8f29ca4faadf42c6aa352315c93dc662';


const AddForm = (props) => {
    const displayValue = null

    const [buildingData, setBuildingData] = useState({
        name: null, street: null, housenumber: null, postcode: null,
        city: null, county: null, country: null, lat: 0, lon: 0, description: null, date: null
    })

    function onPlaceSelect(value, name) {
        setBuildingData({ ...buildingData, [name]: value })
    }

    const changeHandler = (e) => {
        setBuildingData({ ...buildingData, [e.target.name]: e.target.value })
    }

    const createDate = () => {
        var today = new Date();
        var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
        var time = today.toTimeString().split(' ')[0];
        return date + ' ' + time;
    }

    const handleSubmitButtons = async (button) => {
        var checkEmptyKeys = [];
        console.log(buildingData)
        for (var key in buildingData) {
            if (key !== 'lat' && key !== 'lon' && key !== 'description' && key !== 'date')
                if (buildingData[key] == null || buildingData[key] === '') {
                    checkEmptyKeys.push(key)
                }
        }
        if (checkEmptyKeys.length > 0) {
            alert(checkEmptyKeys.toString() + " are empty. Please, fill all fields");
        } else {
            await fetch(`https://api.geoapify.com/v1/geocode/search?name=${buildingData.name}&street=${buildingData.street}
            &housenumber=${buildingData.housenumber}&postcode=${buildingData.postcode}&city=${buildingData.city}&county=${buildingData.county}
            &country=${buildingData.country}&apiKey=${myAPIKey}`)
                .then(response => response.json())
                .then(result => {
                    if (button == 'check') {
                        props.setBuildingCoordinates({ lng: result.features[0].geometry.coordinates[0], lat: result.features[0].geometry.coordinates[1] })
                    }
                    if (button == 'add') {
                           var fullBuildingData = {...buildingData, lon: result.features[0].geometry.coordinates[0],
                            lat: result.features[0].geometry.coordinates[1], date: createDate()}
                        props.addBuildingInfo(fullBuildingData)
                    }
                })
                .catch(e => {
                    console.log(e);
                });
        }
    }

    return (
        <MainFormContainer>
            <FormContainer>
                <img style={{ width: 250, height: '100%', margin: 10 }} src={promoPicture} alt="book your time" />
                <div style={{ display: "flex", flexDirection: 'column' }}>
                    {/* Name or entrance name Input */}
                    <FormLabel>Name of the building</FormLabel>
                    <FormInput type="text" name="name" placeholder='Enter name of the building or entance' onChange={changeHandler} />
                    {/* Street Input */}
                    <FormLabel>Street</FormLabel>
                    <GeoapifyContext apiKey={myAPIKey}>
                        <GeoapifyGeocoderAutocomplete placeholder="Enter street name here"
                            type="street"
                            value={displayValue}
                            placeSelect={(value) => onPlaceSelect(value.properties.address_line1, 'street')}
                        />
                    </GeoapifyContext>
                    {/* House Number Input */}
                    <FormLabel>Street Nr.</FormLabel>
                    <FormInput type="text" name="housenumber" placeholder='Enter house number here' onChange={changeHandler} />
                    {/* Postal code Input */}
                    <FormLabel>Postal code</FormLabel>
                    <FormInput type="text" name="postcode" placeholder='Enter post code here' onChange={changeHandler} />
                    {/* City Input */}
                    <FormLabel>City</FormLabel>
                    <GeoapifyContext apiKey={myAPIKey}>
                        <GeoapifyGeocoderAutocomplete placeholder="Enter city here"
                            type="city"
                            value={displayValue}
                            placeSelect={(value) => onPlaceSelect(value.properties.city, 'city')}
                        />
                    </GeoapifyContext>
                    {/* Municipality Input */}
                    <FormLabel>Municipality</FormLabel>
                    <FormInput type="text" name="county" placeholder='Enter municipality here' onChange={changeHandler} />
                    {/* Country Input */}
                    <FormLabel>Country</FormLabel>
                    <GeoapifyContext apiKey={myAPIKey}>
                        <GeoapifyGeocoderAutocomplete placeholder="Enter country here"
                            type="country"
                            value={displayValue}
                            placeSelect={(value) => onPlaceSelect(value.properties.country, 'country')}
                        />
                    </GeoapifyContext>
                    {/* Description Input */}
                    <FormLabel>Description</FormLabel>
                    <DescriptionInput name="description" placeholder='Enter your description' onChange={changeHandler} />
                    {/* Buttons */}
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", margin: 5 }}>
                        <FormButton onClick={() => handleSubmitButtons('check')} color="#161E54">Check building</FormButton>
                        <FormButton onClick={() => handleSubmitButtons('add')} color="#FF6347">Add building</FormButton>
                    </div>
                </div>
            </FormContainer>
        </MainFormContainer>
    )
}

const mapDispatchToProps = {
    setBuildingCoordinates,
    addBuildingInfo
}

export default connect(null, mapDispatchToProps)(AddForm)
