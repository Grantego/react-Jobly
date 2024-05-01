import React from "react";
import {Card, CardBody,CardTitle, CardText} from "reactstrap"

const CompanyCard = ({company}) => {
    return (
        <a href={`/companies/${company.handle}`}>
        <Card>
            <CardBody>
                <CardTitle tag="h5">
                    {company.name}
                </CardTitle>
                <CardText>
                    {company.description}
                </CardText>
            </CardBody>
        </Card>
        </a>
    )
}


export default CompanyCard