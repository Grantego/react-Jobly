import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import {InputGroup, Input, Button, Form, FormGroup, Label} from "reactstrap"
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helper";
import CompanyCard from "../CompanyCard";
import JoblyApi from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';

const CompanyList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [companies, setCompanies] = useState([])
    const [formData, setFormData] = useState({
        name: ""
    })
    let navigate = useNavigate()

    useEffect(() => {
        async function getCompanies() {
            let companies = await JoblyApi.getCompanies(formData)
            console.log(companies)
            setCompanies(companies)
            setIsLoading(false)
        }
        getCompanies()
    }, [])

    const handleChange = (e) => {
        const {name, value} = e.target
        setFormData(formData => ({
            ...formData,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        const res = await JoblyApi.getCompanies(formData)
        console.log(res)
        setCompanies(res)
    }
    
    if(!isLoggedIn()) {
        navigate('/')
    }

    if (isLoading) {
        return <p>Loading &hellip;</p>;
      }

    return  (
        <>
            <NavBar/>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <InputGroup>
                        <Label for="company-search"></Label>
                        <Input id="company-search" name="name" value={formData.type} placeholder="Search for company" onChange={handleChange}/>
                        <Button color="success">Search</Button>
                    </InputGroup>
                </FormGroup>
            </Form>

            {companies.map(company => (
                <CompanyCard key={company.handle} company={company}/>
            ))}
            
        </>  
    )
}


export default CompanyList