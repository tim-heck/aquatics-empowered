import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* categoriesSaga() {
    // Gets a list of the images
    yield takeEvery('FETCH_ADMIN_CATEGORIES', fetchCategories);
}

/**
 * Sends a GET request to /api/images to get all images
 */
function* fetchCategories(action) {
    try {
        const response = yield axios.get(`/api/images/${action.payload}`);
        // Stores all data received in the stories reducer
        yield put({ type: 'SET_FLAGGED', payload: response.data });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}