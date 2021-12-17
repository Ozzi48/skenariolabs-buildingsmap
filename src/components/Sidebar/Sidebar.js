import React from 'react'
import {
    SidebarContainer, Icon, CloseIcon, SidebarLink, SidebarWrapper, SidebarRoute, SideBtnWrap
} from './SidebarElements'
import { useDispatch, useSelector } from 'react-redux'
import { formIsOpen } from '../../redux/actions'
import { useNavigate } from "react-router-dom";

const Sidebar = ({ isOpen, toggle }) => {
    const dispatch = useDispatch()
    const openform = useSelector(state => state.app.openform)
    const navigate = useNavigate()

    const handleButtonClick = () => {
        dispatch(formIsOpen())
        navigate("/", { replace: true });
        toggle()
    }

    return (
        <SidebarContainer isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarLink to='/' onClick={toggle}>Home</SidebarLink>
                <SidebarLink to='/buildings' onClick={toggle}>Your buildings</SidebarLink>
            </SidebarWrapper>
            <SideBtnWrap><SidebarRoute onClick={handleButtonClick}>{openform ? 'Close Form' : 'Search Buiding'}</SidebarRoute></SideBtnWrap>
        </SidebarContainer>
    );
}

export default Sidebar;