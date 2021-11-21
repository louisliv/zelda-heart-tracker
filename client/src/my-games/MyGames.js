import React, {useState, useEffect} from 'react';
import MyGamesApi from "../api/models/my-games/index";
import Constants from "../utils/constants/Constants";

import {
    Col,
    Card,
    Row
} from 'react-bootstrap'

function MyGames() {
    const [games, setGames] = useState([])

    useEffect(() => {
        MyGamesApi.getAll()
            .then(response => {
                console.log(response[0].games)
                setGames(response[0].games)
            })
    }, [])

    return (
        <Col xs='12'>
            <div>
                <h2>My Library</h2>
            </div>
            <hr />
            <Row>
                {games.map(game => (
                    <Col xs="12" md="3" key={game.id}>
                        <Card>
                            <Card.Img top 
                                width="100%" 
                                src={Constants.mediaUrl.concat(game.display_image_url)}
                                alt={game.name}/>
                            <Card.Body>
                                <Card.Title>{game.name}</Card.Title>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Col>
    );
}

export default MyGames;