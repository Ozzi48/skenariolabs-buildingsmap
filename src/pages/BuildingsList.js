import React, {useState} from 'react'
import UpdateForm from '../components/Forms/UpdateForm'
import { FormButton } from '../components/Forms/FormElements'

const BuildingsList = ({buildings}) => {
    const [isOpenForm, setIsOpenForm] = useState(false)

    const handleIsOpenForm = () => {
        setIsOpenForm(!isOpenForm)
    }
    if (buildings.length) {
        return (
                <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", position: 'absolute' }}>
                    <UpdateForm isOpen={isOpenForm} handleIsOpen={handleIsOpenForm} />
                    {buildings.map((item, index) =>
                        <div style={{ background: "#fff", marginTop: 40, width: 300, height: 200, margin: 10, borderRadius: 20, display: 'flex', justifyContent: 'center', flexDirection: 'column', boxShadow: "2px 2px 14px -3px rgba(22,30,84,0.79)" }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: "center", flexWrap: 'wrap' }}>
                                <h2 style={{ margin: 5 }}>{item.name}</h2>
                                <p>Entry date: </p>
                            </div>
                            <div style={{ display: "flex", flexDirection: 'row', justifyContent: 'space-around', marginTop: 15 }}>
                                <FormButton color="#161E54">Delete</FormButton>
                                <FormButton color="#FF6347" onClick={handleIsOpenForm}>Update</FormButton>
                            </div>
                        </div>
                    )
                    }
                </div>
        )
    } else {
        return (
        null
        )
    }
}

export default BuildingsList
