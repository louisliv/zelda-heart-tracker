import React, { useState, useEffect } from 'react';
import Constants from '../../utils/constants/Constants';


import GameApi from '../../api/models/games/index';

import {
    Col,
    Row
} from 'react-bootstrap'

import { useParams } from "react-router-dom";

function GameDetail() {
    let params = useParams();
    const [game, setGame] = useState()

    useEffect(() => {
        GameApi.get(params.gameId)
            .then(response => {
                setGame(response)
            })
    }, [params])

    return (
        <Row>
            { game ?
                <Col xs="12">
                    <img width="100%" 
                        src={Constants.mediaUrl.concat(game.display_image_url)} 
                        alt={game}/>
                    <h2>{game.name}</h2>
                    <hr />
                    <div><strong>Description:</strong> {game.description}</div>
                    <div><strong>Release Date:</strong> {game.date_released}</div>
                </Col> :
                <></>
            }
        </Row>
    )
}

export default GameDetail;