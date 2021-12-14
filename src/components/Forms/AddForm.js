import React, { useState } from 'react'
import { FormLabel, FormInput, DescriptionInput, FormButton, FormContainer } from './FormElements'
import { MainFormContainer } from './AddFormElements'
import { GeoapifyGeocoderAutocomplete, GeoapifyContext } from '@geoapify/react-geocoder-autocomplete'
import '@geoapify/geocoder-autocomplete/styles/minimal.css'
import promoPicture from '../../media/PromoPicture.svg'

const myAPIKey = '8f29ca4faadf42c6aa352315c93dc662';


const AddForm = () => {
    const displayValue = null

    const [buildingData, setBuildingData] = useState({
        name: null, street: null, housenumber: null, postcode: null,
        city: null, county: null, country: null, lat: 0, lon: 0, description: null
    })

    function onPlaceSelect(value, name) {
        setBuildingData({ ...buildingData, [name]: value })
    }

    const changeHandler = (e) => {
        setBuildingData({ ...buildingData, [e.target.name]: e.target.value })
    }

    const handleCheckBuilding = async () => {
        var checkEmptyKeys = [];
        console.log(buildingData)
        for (var key in buildingData) {
            if (key !== 'lat' && key !== 'lon' && key !== 'description')
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
                    console.log(result.features[0].geometry.coordinates[0] + " " + result.features[0].geometry.coordinates[1])
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
                    <FormLabel>Name of the building</FormLabel>
                    <FormInput type="text" name="name" placeholder='Enter name of the building' onChange={changeHandler} />
                    <FormLabel>Street</FormLabel>

                    <GeoapifyContext apiKey={myAPIKey}>
                        <GeoapifyGeocoderAutocomplete placeholder="Enter street name here"
                            type="street"
                            value={displayValue}
                            placeSelect={(value) => onPlaceSelect(value.properties.address_line1, 'street')}
                        />
                    </GeoapifyContext>

                    <FormLabel>Street Nr.</FormLabel>
                    <FormInput type="text" name="housenumber" placeholder='Enter house number here' onChange={changeHandler} />
                    <FormLabel>Postal code</FormLabel>

                    <FormInput type="text" name="postcode" placeholder='Enter post code here' onChange={changeHandler} />

                    <FormLabel>City</FormLabel>

                    <GeoapifyContext apiKey={myAPIKey}>
                        <GeoapifyGeocoderAutocomplete placeholder="Enter city here"
                            type="city"
                            value={displayValue}
                            placeSelect={(value) => onPlaceSelect(value.properties.city, 'city')}
                        />
                    </GeoapifyContext>

                    <FormLabel>Municipality</FormLabel>
                    <FormInput type="text" name="county" placeholder='Enter municipality here' onChange={changeHandler} />
                    <FormLabel>Country</FormLabel>

                    <GeoapifyContext apiKey={myAPIKey}>
                        <GeoapifyGeocoderAutocomplete placeholder="Enter address here"
                            type="country"
                            value={displayValue}
                            placeSelect={(value) => onPlaceSelect(value.properties.country, 'country')}
                        />
                    </GeoapifyContext>

                    <FormLabel>Description</FormLabel>
                    <DescriptionInput name="description" placeholder='Enter your description' onChange={changeHandler} />
                    <div style={{ display: "flex", flexDirection: 'row', justifyContent: "space-around", margin: 5 }}>
                        <FormButton onClick={handleCheckBuilding} color="#161E54">Check building</FormButton>
                        <FormButton color="#FF6347">Add building</FormButton>
                    </div>
                </div>
            </FormContainer>
        </MainFormContainer>
    )
}

export default AddForm
