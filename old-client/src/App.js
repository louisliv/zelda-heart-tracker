import React, { Component } from 'react';

import { UIView } from '@uirouter/react';

import { connect } from 'react-redux';

import {CurrentStateSelectors} from 'store/current-state';
import MainNavbar from 'navbar';

import {Container, Row, Col} from 'reactstrap';

class App extends Component {
    render() {
        return (
            <Container fluid className='full-height'>
                <Row className="main-row full-height">
                    <Col xs="2" className="no-padding">
                        <MainNavbar />
                    </Col>
                    <Col xs="10" className="no-padding">
                        <Container fluid>
                            <UIView />
                        </Container>
                    </Col>
                </Row>
            </Container>
        );
    }
}

const mapStateToProps = (state, ownProps) => {
    return {
        currentState: CurrentStateSelectors.get(state.currentState)
    }
}

const ConnectedComponent = connect(mapStateToProps)(App)
export default ConnectedComponent;