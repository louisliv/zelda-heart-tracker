import React, { useState, useEffect } from 'react';
import Constants from '../../utils/constants/Constants';
import _ from "lodash";

import GameProfilesApi from "../../api/models/game-profiles/index";
import GameApi from '../../api/models/games/index';
import CollectibleApi from "../../api/models/collectibles/index";

import {
    Col,
    Row
} from 'react-bootstrap'

import { useParams } from "react-router-dom";
import CollectibleCategoryList from '../_components/CollectibleCategoryList';

function GameDetail() {
    let params = useParams();
    const [game, setGame] = useState()
    const [gameProfile, setGameProfile] = useState()
    const [collectibleCategories, setCollectibleCategories] = useState([])

    useEffect(() => {
        GameApi.get(params.gameId)
            .then(response => {
                setGame(response)
            })

        CollectibleApi.byCategory(params.gameId)
            .then(response => {
                setCollectibleCategories(response)
            })

        GameProfilesApi.byGame(params.gameId)
            .then(response => {
                setGameProfile(response)
            })
    }, [params])

    const toggleCompletion = (collectibleId) => {
        if (gameProfile) {
            var isCompleted = checkForCompletion(collectibleId);

            var method_to_exec = isCompleted ? 
                GameProfilesApi.removeCollectible :
                GameProfilesApi.addCollectible;

            method_to_exec(gameProfile.id, collectibleId)
                .then(response => {
                    setGameProfile({
                        ...gameProfile,
                        collectibles: response.collectibles
                    })
                })
        }
    }

    const checkForCompletion = (collectibleId) => {
        if (gameProfile) {
            var inList = _.find(
                gameProfile.collectibles,
                (collectible) => {
                    return collectible.id === collectibleId
                }
            )
            
            return inList ? true: false;
        }

        return false;
    }

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
            { collectibleCategories ? 
                <CollectibleCategoryList 
                    collectibleCategories={collectibleCategories} 
                    checkForCompletion={checkForCompletion}
                    toggleCompletion={toggleCompletion}/> :
                <></>
            }
        </Row>
    )
}

export default GameDetail;