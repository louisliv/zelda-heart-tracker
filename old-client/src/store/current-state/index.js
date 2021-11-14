import {store} from 'index';

const ACTION_CONSTANTS = {
    SET_CURRENT_STATE: 'SET_CURRENT_STATE'
}

let CurrentStateActions = {
    set: (currentState) => {
        return store.dispatch({
            type: ACTION_CONSTANTS.SET_CURRENT_STATE,
            payload: currentState
        });
    }
}

var initialState = {};

function currentStateReducer(state = initialState, action) {
    switch (action.type) {
        case ACTION_CONSTANTS.SET_CURRENT_STATE:
            return Object.assign({}, state, action.payload)
        default:
            return state;
    }
}

let CurrentStateSelectors = {
    get: (currentState) => {
        return currentState
    },
};

export {
    ACTION_CONSTANTS,
    CurrentStateActions,
    currentStateReducer,
    CurrentStateSelectors
}