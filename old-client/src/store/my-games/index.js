import _ from 'lodash';

import MyGameApi from 'api/models/my-games';

import {store} from 'index';

const ACTION_CONSTANTS = {
    MY_GAMES_GET_ALL_SUCCESS: 'MY_GAMES_GET_ALL_SUCCESS',
    MY_GAMES_GET_ALL_FAIL: 'MY_GAMES_GET_ALL_FAIL',

    MY_GAMES_ADD_GAME_SUCCESS: 'MY_GAMES_ADD_GAME_SUCCESS',
    MY_GAMES_ADD_GAME_FAIL: 'MY_GAMES_ADD_GAME_FAIL'
}

let MyGameActions = {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.myGames.listHasFetched) {
            return store.dispatch({
                type: ACTION_CONSTANTS.MY_GAMES_GET_ALL_SUCCESS,
                payload: currentStore.myGames.raw
            })
        }

        return MyGameApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.MY_GAMES_GET_ALL_SUCCESS,
                    payload: response[0].games
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.MY_GAMES_GET_ALL_FAIL
                })
            })
    },
    addGame: (data) => {
        return MyGameApi.addGame(data)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.MY_GAMES_ADD_GAME_SUCCESS,
                    payload: response.games
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.MY_GAMES_ADD_GAME_FAIL
                })
            })
    },
}

var initialState = {
    raw: [],
    listHasFetched: false,
};

function myGameReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_CONSTANTS.MY_GAMES_GET_ALL_SUCCESS:
        case ACTION_CONSTANTS.MY_GAMES_ADD_GAME_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                listHasFetched: true,
            })
        default:
            return state;
    }
}

let MyGameSelectors = {
    list: (myGames) => {
        return myGames.raw
    },
};

export {
    ACTION_CONSTANTS,
    MyGameActions,
    myGameReducer,
    MyGameSelectors
}