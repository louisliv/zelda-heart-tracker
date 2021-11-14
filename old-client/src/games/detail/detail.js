import React, { Component } from 'react';
import Constants from 'utils/constants';

import { connect } from 'react-redux';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

import { GameActions, GameSelectors } from 'store/games';
import { MyGameActions, MyGameSelectors } from 'store/my-games';

import {
    DropdownItem,
    Col,
    Row
} from 'reactstrap'

class GameDetail extends Component {
    componentWillMount() {
        GameActions.get(this.props.$stateParams.gameId);
        MyGameActions.getAll();
    }

    constructor(props) {
        super(props);
    
        this.addToLibrary = this.addToLibrary.bind(this);
    }

    addToLibrary() {
        MyGameActions.addGame({id: this.props.game.id})
    }

    render() {
        return (
            <Row>
                <Col xs="12">
                    <img width="100%" 
                        src={Constants.mediaUrl.concat(this.props.game.display_image_url)} />
                    <h2>{this.props.game.name}</h2>
                    <DropdownItem divider />
                    <div><strong>Description:</strong> {this.props.game.description}</div>
                    <div><strong>Release Date:</strong> {this.props.game.date_released}</div>
                </Col>
            </Row>
        )
    }
}
const mapStateToProps = (state, ownProps) => {
    return {
        game: GameSelectors.one(state.games, ownProps.$stateParams.gameId),
        myGameList: MyGameSelectors.list(state.myGames)
    }
}

const ConnectedComponent = connect(mapStateToProps)(GameDetail)
export default ConnectedComponent;