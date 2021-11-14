import React, { Component } from 'react';
import {SystemSelectors, SystemActions} from 'store/systems';
import { connect } from 'react-redux';

import _ from 'lodash';

import {
    Col, 
    Card,
    CardBody,
    CardTitle,
    DropdownItem,
    Row
} from 'reactstrap'

class Systems extends Component {
    componentWillMount() {
        SystemActions.getAll();
    }

    loadSystems() {
        let systems = [];

        _.forEach(this.props.systems, (system, key) => {
            systems.push(
                <Col xs="12" md="3" key={key}>
                    <Card>
                        <CardBody>
                            <CardTitle>{system.name}</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            )
        })

        return systems;
    }

    render() {
        return (
            <Col xs='12'>
                <div>
                    <h2>Systems</h2>
                </div>
                <DropdownItem divider></DropdownItem>
                <Row>
                    {this.loadSystems()}
                </Row>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        systems: SystemSelectors.list(state.systems)
    }
}

const ConnectedComponent = connect(mapStateToProps)(Systems)

export default ConnectedComponent;
