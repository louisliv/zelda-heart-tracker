import React, { useState, useEffect } from 'react';
import Constants from '../../../utils/constants/Constants';

import { Link } from "react-router-dom";

import MyGameApi from "../../../api/models/my-games/index";

import {
    Card,
    Button
} from 'react-bootstrap'

function Game({ game }) {
    const [myGames, setMyGames] = useState([])

    useEffect(() => {
        MyGameApi.getAll()
            .then(response => {
                setMyGames(response[0].games)
            })
    }, [])

    const addToLibrary = (e) => {
        e.preventDefault();
        MyGameApi.addGame({id: game.id})
            .then(response => {
                console.log(response);
                setMyGames([...myGames, response])
            })
    }

    const inLibrary = (id) => {
        return myGames.filter((game) => {
            return game.id === id;
        }).length > 0
    }

    return (
        <Link to={`/games/${game.id}`}>
            <Card>
                <Card.Img top 
                    width="100%" 
                    src={Constants.mediaUrl.concat(game.display_image_url)}
                    alt={game.name}/>
                <Card.Body>
                    <div className="flex-row justify-content-between">
                        <Card.Title>{game.name}</Card.Title>

                        { inLibrary(game.id) ?
                            <div>In Library</div>:
                            <Button onClick={(e) => addToLibrary(e)}>
                                Add To Library
                            </Button>
                        }

                    </div>
                </Card.Body>
            </Card>
        </Link>
    )
}

export default Game;