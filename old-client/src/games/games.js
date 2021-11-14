import React, { Component } from 'react';
import {GameSelectors, GameActions} from 'store/games';
import { connect } from 'react-redux';

import Game from './_components/game'

import _ from 'lodash';

import {
    Col, 
    DropdownItem,
    Row
} from 'reactstrap'

class Games extends Component {
    componentWillMount() {
        GameActions.getAll();
    }

    loadGames() {
        let games = [];

        _.forEach(this.props.games, (game, key) => {
            games.push(
                <Col xs="12" md="3" key={key}>
                    <Game game={game} />
                </Col>
            )
        })

        return games;
    }

    render() {
        return (
            <Col xs='12'>
                <div>
                    <h2>Games</h2>
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
        games: GameSelectors.list(state.games)
    }
}

const ConnectedComponent = connect(mapStateToProps)(Games)

export default ConnectedComponent;
