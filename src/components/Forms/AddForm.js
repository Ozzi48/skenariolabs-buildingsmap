import React from 'react'
import { MainFormContainer } from './FormElements'
import { useSelector } from 'react-redux'
import Form from './Form'

const AddForm = () => {
    const openform = useSelector(state => state.app.openform)
    if (openform) {
        return (
            <MainFormContainer>
                <Form item={null} formButtons='Add' Xicon={true}/>
            </MainFormContainer>
        )
    } else {
        return null
    }
}


export default AddForm
