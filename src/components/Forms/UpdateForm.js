import React from 'react'
import { UpdateFormMainContainer, UpdateFormContainer } from './FormElements'
import Form from './Form'

const UpdateForm = ({ isOpen, handleIsOpen, item }) => {
    //if open is true show form else show nothing
    if (isOpen) {
        return (
            <UpdateFormMainContainer>
                <UpdateFormContainer>
                    <Form handleIsOpen={handleIsOpen} item={item} formButtons='Update' />
                </UpdateFormContainer>
            </UpdateFormMainContainer>
        )
    } else {
        return null
    }
}

export default UpdateForm