import React, { useState } from 'react'
import UpdateForm from '../components/Forms/UpdateForm'
import { FormButton } from '../components/Forms/FormElements'
import { MainContainer, BuildingCard, TextContainer, BuildingName, ButtonsContainer } from '../components/BuildingsListElemens'
import { connect } from 'react-redux'

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
                <p style={{margin: 5, fontWeight: 'bold'}}>Entry Date: <span style={{margin: 5, fontWeight: 'normal'}}>{item.date}</span></p>
                            <p style={{margin: 5, fontWeight: 'bold'}}>Coordinates: <span style={{margin: 5, fontWeight: 'normal'}}>Lat: {item.lat.toFixed(2)} Lng: {item.lon.toFixed(2)}</span></p>
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
            <div style={{display: "flex", justifyContent: 'center'}}>
                <p>Buildings list is empty. Please, add some :)</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    console.log(state)
    return {
        buildings: state.buildings.buildings
    }
}

export default connect(mapStateToProps, null)(BuildingsList)
