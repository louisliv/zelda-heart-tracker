import React, { useState } from 'react';
import Constants from '../../../utils/constants/Constants';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

import { Link } from "react-router-dom";

// import { MyGameActions } from 'store/my-games';

import {
    Card,
    Dropdown
} from 'react-bootstrap'

function Game({ game }) {
    const [dropdownOpen, setDropdownOpen] = useState(false);

    // const addToLibrary = () => {
    //     MyGameActions.addGame({id: game.id})
    // }

    const toggle = (e) => {
        e.preventDefault()
        setDropdownOpen(!dropdownOpen)
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

                        <Dropdown isOpen={dropdownOpen} toggle={(e) => toggle(e)}>
                            <Dropdown.Toggle tag="div"
                                data-toggle="dropdown"
                                aria-expanded={dropdownOpen}>
                            </Dropdown.Toggle>
                            <Dropdown.Menu right>
                                <Dropdown.Item>Add Game to Library</Dropdown.Item>
                            </Dropdown.Menu>
                        </Dropdown>

                        <div></div>
                    </div>
                </Card.Body>
            </Card>
        </Link>
        // <UISref to="games.details" params={{gameId:game.id}}>
        // </UISref>
    )
}

export default Game;