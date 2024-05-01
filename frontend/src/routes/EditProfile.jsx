import React, {useState} from "react";
import JoblyApi from "../api";
import NavBar from "./NavBar";
import { useLoaderData, useNavigate } from "react-router-dom";
import {Form, FormGroup, Label, Input, Button} from "reactstrap"

export async function loader() {
    let username = localStorage.getItem('username')
    const user = JoblyApi.getUser(username)
    console.log(user)
    return { user }
}

const EditProfile = () => {
    const {user} = useLoaderData()
    const [formData, setFormData] = useState({
        username: user.username,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email
    })
    const [formErrors, setFormErrors] = useState([])
    const navigate = useNavigate()

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name] : value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const dataCopy = {...formData}
            delete dataCopy.username
            const res = await JoblyApi.editProfile(dataCopy, formData.username)
            navigate('/')
        } catch(e) {
            setFormErrors(e)
        }   


    }
    return (
        <>
        <NavBar/>
        <Form onSubmit={handleSubmit}>
            <FormGroup>
                <Label htmlFor="username">Username:</Label>
                <Input
                    type="text"
                    name="username"
                    id="username"
                    value={formData.username}
                    onChange={handleChange}
                    readonly/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="password">Password:</Label>
                <Input
                    type="password" 
                    name="password" 
                    id="password" 
                    value={formData.password}
                    onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="firstName">First Name:</Label>
                <Input 
                    type="text" 
                    name="firstName" 
                    id="firstName" 
                    value={formData.firstName}
                    onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="lastName">Last Name:</Label>
                <Input 
                    type="text"
                    name="lastName"
                    id="lastName"
                    value={formData.lastName}
                    onChange={handleChange}/>
            </FormGroup>
            <FormGroup>
                <Label htmlFor="email">Email:</Label>
                <Input 
                    type="text"
                    name="email" 
                    id="email" 
                    value={formData.email}
                    onChange={handleChange}/>
            </FormGroup>
            {formErrors.length ? formErrors.map(err => {
                <Alert color="danger">{err}</Alert>
            }) : null}
            <Button type="button" onClick={() => navigate(-1)}>Cancel</Button>
            <Button>Edit</Button>
        </Form>
    </>
    )
}

export default EditProfile