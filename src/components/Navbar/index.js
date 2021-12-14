import React from 'react'
import { FaBars } from 'react-icons/fa'
import {
    Nav, NavbarContainer, NavLogo, MobileIcon, NavMenu,
    NavItem, NavLinks, LeftContainer
} from './NavbarElements';

const Navbar = ({ toggle }) => {
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
            </NavbarContainer>
        </Nav>
    );
}

export default Navbar