import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* storiesSaga() {
    // Gets a list of the stories
    yield takeEvery('FETCH_STORIES', fetchStories);
}

/**
 * Sends a GET request to /api/stories to get all stories
 */
function* fetchStories() {
    try {
        const response = yield axios.get('/api/stories');
        // Stores all data received in the stories reducer
        yield put({ type: 'SET_STORIES', payload: response.data });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}