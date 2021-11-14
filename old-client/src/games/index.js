import React from 'react';
import { UIView } from '@uirouter/react';
import GamesList from './games';
import GameDetail from './detail';

const games = {
    parent: 'app',
    name: 'games',
    url: '/games',
    component: () => <div><UIView/></div>
}

const gameList = {
    name: 'games.list',
    url: '/',
    component: GamesList,
}

const gameDetail = {
    name: 'games.details',
    url: '/:gameId',
    component: GameDetail,
}

export {games};
export {gameList};
export {gameDetail};