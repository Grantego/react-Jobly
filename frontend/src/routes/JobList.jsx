import React, {useState, useEffect} from "react";
import NavBar from "./NavBar";
import {InputGroup, Input, Button, Form, FormGroup, Label} from "reactstrap"
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helper";
import JobCard from "./JobCard";
import JoblyApi from "../api";
import 'bootstrap/dist/css/bootstrap.min.css';

const JobList = () => {
    const [isLoading, setIsLoading] = useState(true)
    const [jobs, setJobs] = useState([])
    const [formData, setFormData] = useState({
        title: ""
    })
    let navigate = useNavigate()

    useEffect(() => {
        async function getJobs() {
            let jobs = await JoblyApi.getJobs(formData)
            setJobs(jobs)
            setIsLoading(false)
        }
        getJobs()
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

        const res = await JoblyApi.getJobs(formData)
        console.log(res)
        setJobs(res)
    }

    if (isLoading) {
        return <p>Loading &hellip;</p>;
      }

      if(!isLoggedIn()) {
        navigate('/')
    }
    return  (
        <>
            <NavBar/>
            <Form onSubmit={handleSubmit}>
                <FormGroup>
                    <InputGroup>
                        <Label for="job-search"></Label>
                        <Input id="job-search" name="title" value={formData.type} placeholder="Search for job" onChange={handleChange}/>
                        <Button color="success">Search</Button>
                    </InputGroup>
                </FormGroup>
            </Form>

            {jobs.map(job => (
                <JobCard key={job.id} job={job}/>
            ))}
            
        </>  
    )
}


export default JobList