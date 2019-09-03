import { takeEvery } from 'redux-saga/effects';
import Axios from 'axios';

export default function* addStorySaga(){
    yield takeEvery('ADD_STORY', addStory)
}

function* addStory(action) {
    try {
        yield Axios.post('/api/share', action.payload);
    } catch (error) {
        console.log('Error with addStory saga', error);
    }
}

