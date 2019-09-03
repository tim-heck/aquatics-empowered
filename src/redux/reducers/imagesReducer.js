import { combineReducers } from 'redux';

/**
 * Images Reducer
 * Keeps track of the current images avaiable per story
 * @param {array} state stores all the images per story
 * @param {object} action images available
 */
const imagesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_IMAGES':
            return action.payload;
        default:
            return state;
    }
}

/**
 * One object that has all images
 * On the redux state at:
 * state.images.imagesReducer
 */
export default combineReducers({
    imagesReducer,
});