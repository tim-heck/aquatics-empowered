import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* emailsSaga() {
    // Gets all the emails for the csv export
    yield takeEvery('FETCH_EMAILS', fetchEmails);

}

// Sends a GET request to /api/categories to get all emails
function* fetchEmails(action) {
    try {
        const response = yield axios.get(`/api/categories`);
        // Stores all data received in the categories reducer
        yield put({ type: 'SET_EMAILS', payload: response.data });
    } catch (error) {
        console.log('Error with getting emails', error);
    }
}




