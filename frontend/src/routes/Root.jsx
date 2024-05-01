import React from "react";
import NavBar from "./NavBar";


const Root = () => {
 return (
    <>
        <NavBar/>
        {localStorage.getItem('token') ?
        <h1>{`Welcome back, ${localStorage.getItem('username')}`}</h1> :
        <h1>Welcome to Jobly!</h1>}
    </>
 )
}

export default Root