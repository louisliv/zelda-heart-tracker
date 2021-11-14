import _ from 'lodash';

import GameApi from 'api/models/games';

import {store} from 'index';
import { transformToObject } from "store/utils";

const ACTION_CONSTANTS = {
    GAMES_GET_ALL_SUCCESS: 'GAMES_GET_ALL_SUCCESS',
    GAMES_GET_ALL_FAIL: 'GAMES_GET_ALL_FAIL',

    GAMES_GET_SUCCESS: 'GAMES_GET_SUCCESS',
    GAMES_GET_FAIL: 'GAMES_GET_FAIL',
}

let GameActions = {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.games.listHasFetched) {
            return store.dispatch({
                type: ACTION_CONSTANTS.GAMES_GET_ALL_SUCCESS,
                payload: currentStore.games.raw
            })
        }

        return GameApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.GAMES_GET_ALL_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.GAMES_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.games.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.GAMES_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return GameApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.GAMES_GET_SUCCESS,
                    payload: response
                })
            })
            .catch((message) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.GAMES_GET_FAIL
                })
            })
    },
}

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
};

function gameReducer(state = initialState, action) {
    let newById;
    switch (action.type) {
        case ACTION_CONSTANTS.GAMES_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true,
            })
        case ACTION_CONSTANTS.GAMES_GET_SUCCESS:
            if (state.listHasFetched && state.byId[action.payload]) {
                return state
            }

            newById = _.clone(state.byId);
            newById[action.payload.id] = action.payload;

            return Object.assign({}, state, {
                raw: [...state.raw, action.payload],
                byId: newById,
                listHasFetched: state.listHasFetched,
            })
        default:
            return state;
    }
}

let GameSelectors = {
    one: (games, id) => {
        return games.byId[id] ? games.byId[id] : {}
    },
    list: (games) => {
        return games.raw
    },
};

export {
    ACTION_CONSTANTS,
    GameActions,
    gameReducer,
    GameSelectors
}