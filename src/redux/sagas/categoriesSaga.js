import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* categoriesSaga() {
    // Gets all the categories for the Admin page
    yield takeEvery('FETCH_ADMIN_CATEGORIES', fetchCategories);
    // Adds a new category
    yield takeEvery('ADD_CATEGORY', addCategory);
}

/**
 * Sends a GET request to /api/categories to get all images
 */
function* fetchCategories(action) {
    try {
        const response = yield axios.get(`/api/categories`);
        // Stores all data received in the categories reducer
        yield put({ type: 'SET_CATEGORIES', payload: response.data });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}

function* addCategory(action) {
    try {
        yield axios.post(`api/categories/add`, action.payload);
        yield put ({ type: 'FETCH_ADMIN_CATEGORIES', fetchCategories});
    } catch (error) {
        console.log('Error with adding category');
    }
}