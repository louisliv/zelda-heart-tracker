import React, { Component } from 'react';

import {Row} from 'reactstrap';

import MyGames from 'my-games';

class Home extends Component {
    render() {
        return (
            <Row>
                <MyGames />
            </Row>
        );
    }
}

export default Home;