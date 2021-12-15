import React, { useState, useEffect } from 'react'
import UpdateForm from '../components/Forms/UpdateForm'
import { FormButton } from '../components/Forms/FormElements'
import { MainContainer, BuildingCard, TextContainer, BuildingName, ButtonsContainer } from '../components/BuildingsListElemens'
import { connect } from 'react-redux'
import { removeBuildingInfo } from '../redux/actions'

const BuildingsList = ({ buildings, removeBuildingInfo }) => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [buildingData, setBuildingData] = useState([])
    const [buildingsInfo, setBuildingsInfo] = useState([])
    const [loading, setLoading] = useState(false)

    const handleIsOpenForm = (item) => {
        setBuildingData(item)
        setIsOpenForm(!isOpenForm)
    }
    useEffect(() => {
        setLoading(true)
        setBuildingsInfo(buildings)
        setLoading(false)
    }, [buildings])

    if (buildingsInfo.length > 0 && loading === false) {
        return (
            <div style={{display: "flex", justifyContent: "center"}}>
            <MainContainer>
                {buildingsInfo.map((item, index) =>
                    <BuildingCard key={item.date}>
                        <TextContainer>
                            <BuildingName>{item.name}</BuildingName>
                            <p style={{ margin: 5, fontWeight: 'bold' }}>Entry Date: <span style={{ margin: 5, fontWeight: 'normal' }}>{item.date}</span></p>
                            <p style={{ margin: 5, fontWeight: 'bold' }}>Coordinates: <span style={{ margin: 5, fontWeight: 'normal' }}>Lat: {item.lat.toFixed(2)} Lng: {item.lon.toFixed(2)}</span></p>
                        </TextContainer>
                        <ButtonsContainer>
                            <FormButton color="#161E54" onClick={() => removeBuildingInfo(item.date)}>Delete</FormButton>
                            <FormButton color="#FF6347" onClick={() => handleIsOpenForm(item)}>Update</FormButton>
                        </ButtonsContainer>
                    </BuildingCard>
                )
                }
            </MainContainer>
            <UpdateForm isOpen={isOpenForm} handleIsOpen={handleIsOpenForm} item={buildingData}/>
            </div>
        )
    } else {
        return (
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <p>Buildings list is empty. Please, add some :)</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        buildings: state.buildings.buildings
    }
}

const mapDispatchToProps = {
    removeBuildingInfo
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsList)
