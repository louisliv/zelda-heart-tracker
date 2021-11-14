import React from 'react';
import { UIView } from '@uirouter/react';
import MyGames from './my-games';

const myGames = {
    parent: 'app',
    name: 'myGames',
    url: '/my-games',
    component: () => <div><UIView/></div>
}

const myGameList = {
    name: 'myGames.list',
    url: '/',
    component: MyGames,
}

export {myGames};
export {myGameList}; 

export default MyGames;