import React, { useEffect, useState } from 'react';
import GameApi from '../api/models/games/index';

import Game from './_components/game/Game'

import {
    Col,
    Row
} from 'react-bootstrap'

function Games() {
    const [games, setGames] = useState([])

    useEffect(() => {
        GameApi.getAll()
            .then(response => {
                setGames(response)
            })
    }, [])

    return (
        <Col xs='12'>
            <div>
                <h2>Games</h2>
            </div>
            <hr />
            <Row>
                {games.map(game => (
                    <Col xs="12" md="3" key={game.id}>
                        <Game game={game} />
                    </Col>
                ))}
            </Row>
        </Col>
    );
}

export default Games;
