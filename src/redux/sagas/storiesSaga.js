import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* storiesSaga() {
    // Gets a list of the stories
    yield takeEvery('FETCH_STORIES', fetchStories);
    // Deletes a specific story
    yield takeEvery('DELETE_STORY', deleteStory);
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

/**
 * Sends a DELETE request to /api/stories/:id to delete a story
 * @param {object} action story to be deleted
 */
function* deleteStory(action) {
    try {
        yield axios.delete(`/api/stories/${action.payload.id}`);
        // Gets updated list of stories
        yield put({ type: 'FETCH_STORIES' });
    } catch (error) {
        console.log('Error with deleting story', error);
    }
}