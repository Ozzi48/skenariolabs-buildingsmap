import React from 'react'
import { FaBars } from 'react-icons/fa'
import {
    Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu,
    NavItem, NavLinks, LeftContainer, NavBtn, NavBtnLink
} from './NavbarElements';
import { useDispatch, useSelector } from 'react-redux'
import { formIsOpen } from '../../redux/actions'
import { useNavigate } from "react-router-dom";

const Navbar = ({ toggle }) => {
    const dispatch = useDispatch()
    const openform = useSelector(state => state.app.openform)
    const navigate = useNavigate()

    const handleButtonClick = () => {
        dispatch(formIsOpen())
        navigate("/", { replace: true });
    }

    return (
        <Nav>
            <NavbarContainer>
                <LeftContainer>
                    <NavLogo to='/'>
                        <img
                            src="https://www.skenariolabs.com/images/logo.png"
                            alt="new"
                            style={{ width: 100 }}
                        />
                    </NavLogo>
                    <NavMenu>
                        <NavItem>
                            <NavLinks to='/'>Home</NavLinks>
                        </NavItem>
                        <NavItem>
                            <NavLinks to='/buildings'>Your buildings</NavLinks>
                        </NavItem>
                    </NavMenu>
                </LeftContainer>
                <MobileIcon onClick={toggle}>
                    <FaBars />
                </MobileIcon>
                <NavBtn><NavBtnLink onClick={handleButtonClick}>{openform ? 'Close Form' : 'Search Buiding'}</NavBtnLink></NavBtn>
            </NavbarContainer>
        </Nav>
    );
}

export default Navbar