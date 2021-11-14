import React, { Component } from 'react';

import { MyGameSelectors, MyGameActions } from 'store/my-games';
import { connect } from 'react-redux';
import Constants from 'utils/constants';

import _ from 'lodash';

import {
    Col,
    Card,
    CardImg,
    CardBody,
    CardTitle,
    DropdownItem,
    Row
} from 'reactstrap'

class MyGames extends Component {
    componentWillMount() {
        MyGameActions.getAll();
    }

    loadGames() {
        let games = [];

        _.forEach(this.props.gameList, (game, key) => {
            games.push(
                <Col xs="12" md="3" key={key}>
                    <Card>
                        <CardImg top 
                            width="100%" 
                            src={Constants.mediaUrl.concat(game.display_image_url)}
                            alt={game.name}/>
                        <CardBody>
                            <CardTitle>{game.name}</CardTitle>
                        </CardBody>
                    </Card>
                </Col>
            )
        })

        return games;
    }

    render() {
        return (
            <Col xs='12'>
                <div>
                    <h2>My Library</h2>
                </div>
                <DropdownItem divider></DropdownItem>
                <Row>
                    {this.loadGames()}
                </Row>
            </Col>
        );
    }
}

const mapStateToProps = state => {
    return {
        gameList: MyGameSelectors.list(state.myGames)
    }
}

const ConnectedComponent = connect(mapStateToProps)(MyGames)

export default ConnectedComponent;