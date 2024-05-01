import React from "react";
import {useLoaderData} from "react-router-dom"
import JoblyApi from "../api";
import NavBar from "./NavBar";
import JobCard from "./JobCard";
import { useNavigate } from "react-router-dom";
import { isLoggedIn } from "../helper";
import 'bootstrap/dist/css/bootstrap.min.css';

export async function loader({params}) {
    const company = await JoblyApi.getCompany(params.handle)
    return { company };
  }

const CompanyDetails = () => {
    const {company} = useLoaderData()
    let navigate = useNavigate()

    if(!isLoggedIn()) {
        navigate('/')
    }
    return (
        <>
            <NavBar/>
            <h1>{company.name}</h1>
            <p>{company.description}</p>

            {company.jobs.map((job) => (
                <JobCard key={job.id} job={job}/>
            ))}
        </>
    )
}


export default CompanyDetails