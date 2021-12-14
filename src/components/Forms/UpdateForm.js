import React from 'react'
import { FormLabel, FormInput, DescriptionInput, FormButton, FormContainer } from './FormElements'
import promoPicture from '../../media/PromoPicture.svg'
import { UpdateFormMainContainer, UpdateFormContainer } from './UpdateFormElements'

const UpdateForm = ({ isOpen, handleIsOpen }) => {
    if (isOpen) {
        return (
            <UpdateFormMainContainer>
                <UpdateFormContainer>

                    <FormContainer>
                        <img style={{ width: 250, height: '100%', margin: 10 }} src={promoPicture} alt="book your time" />
                        <div style={{ display: "flex", flexDirection: 'column' }}>
                            <FormLabel>Name of the building</FormLabel>
                            <FormInput type="text" name="name" />
                            <FormLabel>Street</FormLabel>
                            <FormInput type="text" name="street" />
                            <FormLabel>Street Nr.</FormLabel>
                            <FormInput type="text" name="housenumber" />
                            <FormLabel>Postal code</FormLabel>
                            <FormInput type="text" name="postcode" />
                            <FormLabel>City</FormLabel>
                            <FormInput type="text" name="city" />
                            <FormLabel>Municipality</FormLabel>
                            <FormInput type="text" name="county" />
                            <FormLabel>Country</FormLabel>
                            <FormInput type="text" name="country" />
                            <FormLabel>Description</FormLabel>
                            <DescriptionInput name="description" placeholder='Type your description' />
                            <div style={{ display: "flex", flexDirection: "row", justifyContent: 'space-around' }}>
                                <FormButton color="#161E54" style={{ marginTop: 10 }}>Update building Info</FormButton>
                                <FormButton onClick={handleIsOpen} color="#161E54" style={{ marginTop: 10 }}>Cancel</FormButton>
                            </div>
                        </div>
                    </FormContainer>

                </UpdateFormContainer>
            </UpdateFormMainContainer>
        )
    } else {
        return null
    }
}

export default UpdateForm