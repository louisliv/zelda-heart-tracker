import _ from 'lodash';

import SystemApi from 'api/models/systems';

import {store} from 'index';
import { transformToObject } from "store/utils";

const ACTION_CONSTANTS = {
    SYSTEMS_GET_ALL_SUCCESS: 'SYSTEMS_GET_ALL_SUCCESS',
    SYSTEMS_GET_ALL_FAIL: 'SYSTEMS_GET_ALL_FAIL',

    SYSTEMS_GET_SUCCESS: 'SYSTEMS_GET_SUCCESS',
    SYSTEMS_GET_FAIL: 'SYSTEMS_GET_FAIL',
}

let SystemActions = {
    getAll: () => {
        let currentStore = store.getState();

        if (currentStore.systems.listHasFetched) {
            return store.dispatch({
                type: ACTION_CONSTANTS.SYSTEMS_GET_ALL_SUCCESS,
                payload: currentStore.systems.raw
            })
        }

        return SystemApi.getAll()
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SYSTEMS_GET_ALL_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SYSTEMS_GET_ALL_FAIL
                })
            })
    },
    get: (id) => {
        let currentState = store.getState();
        if (currentState.systems.listHasFetched) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SYSTEMS_GET_SUCCESS,
                    payload: id
                })
            })
        }
        return SystemApi.get(id)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SYSTEMS_GET_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SYSTEMS_GET_FAIL
                })
            })
    },
}

var initialState = {
    raw: [],
    byId: {},
    listHasFetched: false,
};

function systemReducer(state = initialState, action) {
    let newById;
    switch (action.type) {
        case ACTION_CONSTANTS.SYSTEMS_GET_ALL_SUCCESS:
            return Object.assign({}, state, {
                raw: _.clone(action.payload),
                byId: transformToObject(action.payload),
                listHasFetched: true,
            })
        case ACTION_CONSTANTS.SYSTEMS_GET_SUCCESS:
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

let SystemSelectors = {
    one: (systems, id) => {
        return systems.byId[id] ? systems.byId[id] : {}
    },
    list: (systems) => {
        return systems.raw
    },
};

export {
    ACTION_CONSTANTS,
    SystemActions,
    systemReducer,
    SystemSelectors
}