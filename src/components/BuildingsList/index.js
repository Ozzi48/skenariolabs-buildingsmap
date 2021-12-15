import React, { useState, useEffect } from 'react'
import UpdateForm from '../Forms/UpdateForm'
import { FormButton } from '../Forms/FormElements'
import { MainContainer, BuildingCard, TextContainer, BuildingName, ButtonsContainer, BuildingTitle } from './BuildingsListElemens'
import { connect } from 'react-redux'
import { removeBuildingInfo } from '../../redux/actions'

const BuildingsList = ({ buildings, removeBuildingInfo}) => {
    const [isOpenForm, setIsOpenForm] = useState(false)
    const [buildingData, setBuildingData] = useState([])
    const [buildingsInfo, setBuildingsInfo] = useState([])

    //on press update open set building data and open form
    const handleIsOpenForm = (item) => {
        setBuildingData(item)
        setIsOpenForm(!isOpenForm)
    }

    //fecth all buildings from redux
    useEffect(() => {
        setBuildingsInfo(buildings)
    }, [buildings])

    //if buildings are not empty create cards and show buildings
    if (buildingsInfo.length > 0 ) {
        return (
            <div style={{ display: "flex", justifyContent: "center" }}>
                <MainContainer>
                    {buildingsInfo.map((item, index) =>
                        <BuildingCard key={item.date}>
                            <TextContainer>
                                <BuildingName>{item.name}</BuildingName>
                                <BuildingTitle>
                                    Entry Date:
                                    <span style={{ margin: 5, fontWeight: 'normal' }}>
                                        {item.date}</span>
                                </BuildingTitle>
                                <BuildingTitle>
                                    Coordinates:
                                    <span style={{ margin: 5, fontWeight: 'normal' }}>
                                        Lat: {item.lat.toFixed(2)} Lng: {item.lon.toFixed(2)}
                                    </span>
                                </BuildingTitle>
                            </TextContainer>
                            <ButtonsContainer>
                                <FormButton color="#161E54" onClick={() => removeBuildingInfo(item.date)}>Delete</FormButton>
                                <FormButton color="#FF6347" onClick={() => handleIsOpenForm(item)}>Update</FormButton>
                            </ButtonsContainer>
                        </BuildingCard>
                    )
                    }
                </MainContainer>
                <UpdateForm isOpen={isOpenForm} handleIsOpen={handleIsOpenForm} item={buildingData} />
            </div>
        )
    }
    //if buildings list are empty 
    else {
        return (
            <div style={{ display: "flex", justifyContent: 'center' }}>
                <p>Buildings list is empty. Please, add some :)</p>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        buildings: state.buildings.buildings,
    }
}

const mapDispatchToProps = {
    removeBuildingInfo,
}

export default connect(mapStateToProps, mapDispatchToProps)(BuildingsList)