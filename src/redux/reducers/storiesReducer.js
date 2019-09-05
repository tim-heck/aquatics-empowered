import { combineReducers } from 'redux';

/**
 * Stories Reducer
 * Keeps track of the current stories avaiable to the user
 * @param {array} state stores all the stories
 * @param {object} action stories available
 */
const storiesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_STORIES':
            return action.payload;
        case 'ADD_FILTER':
            for (let i = 0; i < action.payload.length; i++) {
                state = [...state, action.payload[i]]
            }
            return state;
        default:
            return state;
    }
}

// const filterReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'ADD_FILTER':
//             return [...state, action.payload];
//         default:
//             return state;
//     }
// }

/**
 * One object that has all stories
 * On the redux state at:
 * state.stories.storiesReducer
 */
export default combineReducers({
    storiesReducer,
    // filterReducer,
});