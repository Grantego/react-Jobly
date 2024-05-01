import React, {useState, useEffect } from "react";
import JoblyApi from "../api";
import { isLoggedIn } from "../helper";
import { useNavigate } from "react-router-dom";
import { Form, FormGroup, Label, Input, Button, Alert } from "reactstrap"
import NavBar from "./NavBar";
import useLocalStorageState from "../hooks/useLocalStorageState";
import 'bootstrap/dist/css/bootstrap.min.css';

const LoginForm = () => {
    const [token, setToken] = useLocalStorageState('token', "")
    const [username, setUsername] = useLocalStorageState('username', "")
    const [formData, setFormData] = useState({
        username: "",
        password: "",
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
            console.log('logging in...')
            const res = await JoblyApi.login(formData)
            console.log(res.token)
            console.log(formData.username)
            setToken(res.token)
            setUsername(formData.username)
            navigate('/')
        } catch(e) {
            setFormErrors(e)
        }
    }

    useEffect(() => {
        JoblyApi.token = token;
        console.log("updating token", JoblyApi.token)
      }, [token]);
    

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
                {formErrors.length !==0 && formErrors.map(err => (
                    <Alert color="danger">{err}</Alert>
                ))}
                <Button>Login</Button>
            </Form>
        </>
    )
}

export default LoginForm