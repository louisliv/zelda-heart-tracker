import _ from 'lodash';

import AuthApi from 'api/models/auth';

import {store} from 'index';

const ACTION_CONSTANTS = {
    SET_CURRENT: 'SET_CURRENT',
    SET_CURRENT_FAIL: 'SET_CURRENT_FAIL',
    CLEAR_CURRENT: 'CLEAR_CURRENT',
    CLEAR_CURRENT_FAIL: 'CLEAR_CURRENT_FAIL',

    LOGIN_SUCCESS: 'LOGIN_SUCCESS',
    LOGIN_FAIL: 'LOGIN_FAIL',

    LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
    LOGOUT_FAIL: 'LOGOUT_FAIL'
}

let AuthActions = {
    setCurrent() {
        let currentState = store.getState();

        if (!_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SET_CURRENT,
                    payload: currentState.currentUser
                })
            })
        }

        return AuthApi.current()
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SET_CURRENT,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.SET_CURRENT_FAIL
                })
            })
    },

    clearCurrent(){
        let currentState = store.getState();

        if (_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.CLEAR_CURRENT,
                })
            })
        }

        return AuthApi.current()
            .then(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.CLEAR_CURRENT
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.CLEAR_CURRENT_FAIL
                })
            })
    },

    login(creds) {
        let currentState = store.getState();

        if (!_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.LOGIN_SUCCESS,
                    payload: currentState.currentUser
                })
            })
        }

        return AuthApi.login(creds)
            .then((response) => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.LOGIN_SUCCESS,
                    payload: response
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.LOGIN_FAIL
                })
            })
    },

    logout(){
        let currentState = store.getState();

        if (_.isEmpty(currentState.currentUser)) {
            return new Promise(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.LOGOUT_SUCCESS,
                })
            })
        }

        return AuthApi.logout()
            .then(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.LOGOUT_SUCCESS
                })
            })
            .catch(() => {
                return store.dispatch({
                    type: ACTION_CONSTANTS.LOGOUT_FAIL
                })
            })
    },
}

var initialState = {};

function authReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_CONSTANTS.SET_CURRENT:
        case ACTION_CONSTANTS.LOGIN_SUCCESS:
            return Object.assign({}, state, action.payload);
        case ACTION_CONSTANTS.CLEAR_CURRENT:
        case ACTION_CONSTANTS.LOGOUT_SUCCESS:
            return initialState;
        default:
            return state;
    }
}

let AuthSelectors = {
    current: (currentUser) => {
        return currentUser
    },
};

export {
    ACTION_CONSTANTS,
    AuthActions,
    authReducer,
    AuthSelectors
}