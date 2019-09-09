import { takeEvery, put } from 'redux-saga/effects';
import axios from 'axios';

export default function* csvSaga() {
  
    yield takeEvery('GET_EMAILS', getEmails);
}

// Getting all emails for csv export
function* getEmails(action) {
    try {
        const response = yield axios.get(`/api/categories/emails`);
        // Stores all data received in the emails reducer
        yield put({ type: 'SET_EMAILS', payload: response.data });
    } catch (error) {
        console.log('Error with getting emails', error);
    }
}



