import React, { useState } from 'react'
import UpdateForm from '../components/Forms/UpdateForm'
import { FormButton } from '../components/Forms/FormElements'
import { MainContainer, BuildingCard, TextContainer, BuildingName, ButtonsContainer } from '../components/BuildingsListElemens'

const BuildingsList = ({ buildings }) => {
    const [isOpenForm, setIsOpenForm] = useState(false)

    const handleIsOpenForm = () => {
        setIsOpenForm(!isOpenForm)
    }
    if (buildings.length) {
        return (
            <MainContainer>
                <UpdateForm isOpen={isOpenForm} handleIsOpen={handleIsOpenForm} />
                {buildings.map((item, index) =>
                    <BuildingCard>
                        <TextContainer>
                            <BuildingName>{item.name}</BuildingName>
                            <p>Entry date: </p>
                        </TextContainer>
                        <ButtonsContainer>
                            <FormButton color="#161E54">Delete</FormButton>
                            <FormButton color="#FF6347" onClick={handleIsOpenForm}>Update</FormButton>
                        </ButtonsContainer>
                    </BuildingCard>
                )
                }
            </MainContainer>
        )
    } else {
        return (
            null
        )
    }
}

export default BuildingsList
