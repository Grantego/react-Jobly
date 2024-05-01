import React, {useState} from "react";
import JoblyApi from "../api";
import {  useNavigate } from "react-router-dom";
import {Form, FormGroup, Label, Input, Button} from "reactstrap"
import NavBar from "./NavBar";
import useLocalStorageState from "../hooks/useLocalStorageState";
import 'bootstrap/dist/css/bootstrap.min.css';

const SignupForm = () => {
    const [token, setToken] = useLocalStorageState('token', "")
    const [username, setUsername] = useLocalStorageState('username', "")
    const [formData, setFormData] = useState({
        username: "",
        password: "",
        firstName: "",
        lastName: "",
        email: ""
    })
    const [formErrors, setFormErrors] = useState([])

    let navigate = useNavigate()

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
            const res = await JoblyApi.register(formData)
            console.log(res)
            setToken(res.token)
            setUsername(res.username)
            JoblyApi.token = token
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
                        onChange={handleChange}/>
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
                <Button>Register</Button>
            </Form>
        </>
    )
}

export default SignupForm