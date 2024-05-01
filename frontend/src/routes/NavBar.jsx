import React from "react";
import "./NavBar.css"
import {NavLink, redirect} from 'react-router-dom'
import JoblyApi from "../api";
import {Navbar, Nav, NavItem} from "reactstrap"

const logout = () => {
    console.log('running')
    JoblyApi.logout()
}
const NavBar = () => {
    let token = localStorage.getItem("token")

    if (token) {
        return (
            <>
            <Navbar expand="md">
                    <NavLink exact to="/" className="navbar-brand">
                        Jobly
                    </NavLink>
                <Nav className="ml-auto" justified>
                    <NavItem>
                        <NavLink to="/companies">Companies</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/jobs">Jobs</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/profile">Profile</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/" onClick={logout}>Logout</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            </>
        )
    } else {
        return (
            <>
            <Navbar expand="md">
                    <NavLink exact to="/" className="navbar-brand">
                        Jobly
                    </NavLink>
                <Nav className="ml-auto" justified>
                    <NavItem>
                        <NavLink to="/signup">Sign Up</NavLink>
                    </NavItem>
                    <NavItem>
                        <NavLink to="/login">Login</NavLink>
                    </NavItem>
                </Nav>
            </Navbar>
            </>
        )  
    }
}

export default NavBar