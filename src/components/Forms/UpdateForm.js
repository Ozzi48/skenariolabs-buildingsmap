import React, { useState, useEffect } from 'react'
import { FormLabel, FormInput, DescriptionInput, FormButton, FormContainer, ButtonContainer } from './FormElements'
import promoPicture from '../../media/PromoPicture.svg'
import { UpdateFormMainContainer, UpdateFormContainer } from './UpdateFormElements'
import { connect } from 'react-redux'
import { updateBuildingInfo, showLoading, hideLoading } from '../../redux/actions'
import Loader from '../Loader'
import { useToasts } from "react-toast-notifications"

const myAPIKey = '8f29ca4faadf42c6aa352315c93dc662';

const UpdateForm = ({ isOpen, handleIsOpen, item, updateBuildingInfo, showLoading, hideLoading, loading }) => {
    const { addToast } = useToasts()
    const [buildingData, setBuildingData] = useState({
        name: null, street: null, housenumber: null, postcode: null,
        city: null, county: null, country: null, lat: null, lon: null, description: null, date: null
    })

    useEffect(() => {
        if (item !== undefined) {
            setBuildingData({
                name: item.name, street: item.street, housenumber: item.housenumber, postcode: item.postcode,
                city: item.city, county: item.county, country: item.country, lat: item.lat, lon: item.lon, description: item.description, date: item.date
            })
        }

    }, [item])

    const changeHandler = (e) => {
        setBuildingData({ ...buildingData, [e.target.name]: e.target.value })
    }

    const handleUpdate = () => {
        showLoading()
        var checkEmptyKeys = []
        var message = ""
        console.log(buildingData)
        for (var key in buildingData) {
            if (key !== 'lat' && key !== 'lon' && key !== 'description' && key !== 'date')
                if (buildingData[key] == null || buildingData[key] === '') {
                    checkEmptyKeys.push(key)
                }
        }
        if (checkEmptyKeys.length > 0) {
            message = checkEmptyKeys.toString() + " are empty. Please, fill all fields"
            hideLoading()
            addToast(message, {
                appearance: 'info',
                autoDismiss: true,
            })
        } else {
            fetch(`https://api.geoapify.com/v1/geocode/search?name=${buildingData.name}&street=${buildingData.street}
            &housenumber=${buildingData.housenumber}&postcode=${buildingData.postcode}&city=${buildingData.city}&county=${buildingData.county}
            &country=${buildingData.country}&apiKey=${myAPIKey}`)
                .then(response => response.json())
                .then(result => {
                    var fullBuildingData = {
                        ...buildingData, lon: result.features[0].geometry.coordinates[0],
                        lat: result.features[0].geometry.coordinates[1],
                    }
                    updateBuildingInfo(fullBuildingData)
                    message = "Success. You have updated building"
                }).finally(() => {
                    hideLoading()
                    addToast(message, {
                        appearance: 'info',
                        autoDismiss: true,
                    })
                    handleIsOpen()
                }
                )
                .catch(e => {
                    message = "Something went wrong. Try again!"
                    hideLoading()
                    addToast(message, {
                        appearance: 'info',
                        autoDismiss: true,
                    })
                });
        }
    }

    if (isOpen) {
        return (
            <UpdateFormMainContainer>
                <UpdateFormContainer>

                    <FormContainer>
                        {loading ? <Loader /> :
                            <img style={{ width: 250, height: '100%', margin: 10 }} src={promoPicture} alt="Add your building" />
                        }
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                            <FormLabel>Name of the building</FormLabel>
                            <FormInput type="text" name="name" defaultValue={buildingData.name} onChange={changeHandler} />
                            <FormLabel>Street</FormLabel>
                            <FormInput type="text" name="street" defaultValue={buildingData.street} onChange={changeHandler} />
                            <FormLabel>Street Nr.</FormLabel>
                            <FormInput type="text" name="housenumber" defaultValue={buildingData.housenumber} onChange={changeHandler} />
                            <FormLabel>Postal code</FormLabel>
                            <FormInput type="text" name="postcode" defaultValue={buildingData.postcode} onChange={changeHandler} />
                            <FormLabel>City</FormLabel>
                            <FormInput type="text" name="city" defaultValue={buildingData.city} onChange={changeHandler} />
                            <FormLabel>Municipality</FormLabel>
                            <FormInput type="text" name="county" defaultValue={buildingData.county} onChange={changeHandler} />
                            <FormLabel>Country</FormLabel>
                            <FormInput type="text" name="country" defaultValue={buildingData.country} onChange={changeHandler} />
                            <FormLabel>Description</FormLabel>
                            <DescriptionInput name="description" placeholder='Type your description' defaultValue={buildingData.description} onChange={changeHandler} />
                            <ButtonContainer>
                                <FormButton onClick={handleUpdate} color="#161E54" style={{ marginTop: 10 }} disabled={loading}>Update building Info</FormButton>
                                <FormButton onClick={handleIsOpen} color="#161E54" style={{ marginTop: 10 }} disabled={loading}>Cancel</FormButton>
                            </ButtonContainer>
                        </div>
                    </FormContainer>

                </UpdateFormContainer>
            </UpdateFormMainContainer>
        )
    } else {
        return null
    }
}

const mapDispatchToProps = {
    updateBuildingInfo,
    showLoading,
    hideLoading
}

const mapStateToProps = state => {
    return {
        loading: state.app.loading,
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UpdateForm)