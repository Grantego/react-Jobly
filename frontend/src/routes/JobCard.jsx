import React from "react";
import {Card, CardBody,CardTitle, CardText} from "reactstrap"

const JobCard = ({job}) => {

    const formattedSalary = job.salary !== null ? job.salary.toLocaleString() : job.salary

    return (
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    {job.title}
                </CardTitle>
                <CardText>
                   Salary: {formattedSalary}
                </CardText>
                <CardText>
                   Equity: {job.equity}
                </CardText>
            </CardBody>
        </Card>
    )
}


export default JobCard