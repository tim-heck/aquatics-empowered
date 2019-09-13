import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function* storiesSaga() {
    // Gets a list of the stories
    yield takeEvery('FETCH_STORIES', fetchStories);
    // Deletes a specific story
    yield takeEvery('DELETE_STORY', deleteStory);
    // Flaggs story for review
    yield takeEvery('FLAG_STORY', flagStory);
    // Adds a story
    yield takeEvery('ADD_STORY', addStory);
    // Filters stories by users parameters
    yield takeEvery('FILTER_STORIES', filterStories);
    // Gets flagged stories for admin page
    yield takeEvery('FETCH_FLAGGED_STORIES', fetchFlaggedStories)
    // Updates specific story
    yield takeEvery('UPDATE_STORY', updateStory);
    // Sends Search Query
    yield takeEvery('SEARCH', searchStories);
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

function* filterStories(action) {
    const categoriesForFilter = Object.entries(action.payload);
    console.log(categoriesForFilter);
    try {
        for (let i = 0; i < categoriesForFilter.length; i++) {
            console.log(categoriesForFilter[i][1]);
            if (categoriesForFilter[i][1]) {
                console.log(categoriesForFilter[i][0]);
                // objectToSend
                const response = yield axios.get(`/api/stories/filter/${categoriesForFilter[i][0]}`);
                console.log('response.data', response.data);
                if (response.data.length !== 0) {
                    yield put({ type: 'ADD_FILTER', payload: response.data });
                }
            }
        }
        // Stores all data received in the stories reducer
        // yield put({ type: 'SET_STORIES', payload: response.data });
    } catch (error) {
        console.log('Error with getting stories', error);
    }
}

// Sends a GET request to /api/stories/flagged to get all flagged stories
function* fetchFlaggedStories() {
    try {
        const response = yield axios.get('/api/stories/flagged');
        yield put ({ type: 'SET_FLAGGED_STORIES', payload: response.data })
    } catch (error) {
        console.log('Error getting flagged posts', error);
    }
}

/**
 * Sends a DELETE request to /api/stories/:id to delete a story
 * @param {object} action contains a payload of the story to be deleted
 */
function* deleteStory(action) {
    try {
        yield axios.delete(`/api/stories/${action.payload.id}`);
        Swal.fire({
            title: 'Story Deleted',
            text: 'Story successfully deleted',
            type: 'success',
            confirmButtonText: 'Ok'
        });
        // Gets updated list of stories
        yield put({ type: 'FETCH_STORIES' });
    } catch (error) {
        console.log('Error with deleting story', error);
        Swal.fire({
            title: 'Oh no!',
            text: error,
            type: 'error',
            confirmButtonText: 'Ok'
        });
    }
}

/**
 * Sends a PUT request to /api/stories/flag/:id to flad a story
 * @param {object} action story to be flagged
 */
function* flagStory(action) {
    try {
        yield axios.put(`/api/stories/flag/${action.payload.id}`, action.payload);
        Swal.fire({
            title: 'Success',
            text: 'This story has been flagged for moderation',
            type: 'success',
            confirmButtontext: 'Ok'
        })
        // Gets updated list of stories
        yield put({ type: 'FETCH_STORIES' });
    } catch (error) {
        console.log('Error with flagging story', error);
        Swal.fire({
            title: 'Oh no!',
            text: error,
            type: 'error',
            confirmButtontext: 'Ok'
        })
    }
}

// Sets a POST request to /api/share to add a story
function* addStory(action) {
    try {
        yield axios.post('/api/stories/share', action.payload);
    } catch (error) {
        console.log('Error with addStory saga', error);
    }
}

function* updateStory(action) {
    try {
        yield axios.put(`/api/stories/update/${action.payload.id}`, action.payload);
        Swal.fire({
            title: 'Success',
            text: 'The story has been updated!',
            type: 'success',
            confirmButtontext: 'Ok'
        })
        yield put({ type: 'FETCH_STORIES' });
        yield put({ type: 'FETCH_FLAGGED_STORIES' });
    } catch (error) {
        console.log('Error with updating story', error);
        Swal.fire({
            title: 'Oh no!',
            text: error,
            type: 'error',
            confirmButtontext: 'Ok'
        })
    }
}

function* searchStories(action) {
    try{
        let array = action.payload.split(' ');
        let searchString = '';
        for (let i = 0; i < array.length; i++) {
            searchString += 'q' + i + '=' + array[i] + '&';
        }
        const response = yield axios.get(`/api/stories/search?${searchString}`)
        yield put({
            type:'SET_STORIES', 
            payload: response.data});
    } catch(error) {
        console.log('error search database', error);
    }
}