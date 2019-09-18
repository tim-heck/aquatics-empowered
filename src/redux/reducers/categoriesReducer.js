import { combineReducers } from 'redux';


const categoriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}

const hiddenCategoriesReducer = (state = [], action) => {
    switch (action.type) {
        case 'SET_HIDDEN_CATEGORIES':
            return action.payload;
        default:
            return state;
    }
}



export default combineReducers({
    categoriesReducer,
    hiddenCategoriesReducer
});