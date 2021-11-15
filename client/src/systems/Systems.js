import React, {useEffect, useState} from 'react';
import SystemsApi from '../api/models/systems/index';

import {
    Col, 
    Card,
    Row
} from 'react-bootstrap'

function Systems() {
    const [systems, setSystems] = useState([])

    useEffect(() => {
        SystemsApi.getAll()
            .then(response => {
                setSystems(response)
            })
    },[])

    return (
        <Col xs='12'>
            <div>
                <h2>Systems</h2>
            </div>
            <hr />
            <Row>
                {systems.map(system => (
                    <Col xs="12" md="3" key={system.id}>
                        <Card>
                            <Card.Body>
                                <Card.Title>{system.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Col>
    );
}

export default Systems;
