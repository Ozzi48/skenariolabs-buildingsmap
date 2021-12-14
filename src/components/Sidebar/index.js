import React from 'react'
import {
    SidebarContainer, Icon, CloseIcon, SidebarLink, SidebarWrapper
} from './SidebarElements'

const Sidebar = ({ isOpen, toggle }) => {
    return (
        <SidebarContainer isOpen={isOpen}>
            <Icon onClick={toggle}>
                <CloseIcon />
            </Icon>
            <SidebarWrapper>
                <SidebarLink to='/' onClick={toggle}>Home</SidebarLink>
                <SidebarLink to='/buildings' onClick={toggle}>Your buildings</SidebarLink>
            </SidebarWrapper>
        </SidebarContainer>
    );
}

export default Sidebar;