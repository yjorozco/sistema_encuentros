import React from 'react'
import { Alert, Col } from 'reactstrap';

export default function AlertSuccess({success}) {
    return (
        <Col>
            {success !== "" && (
            <Alert color="success">
                {success}
            </Alert>)}
        </Col>
    );
}
