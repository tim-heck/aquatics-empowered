import Axios from 'axios';

function* addStory(action) {
    try {
        yield Axios.post('/api/share', action.payload);
    } catch (error) {
        console.log('Error with addStory saga', error);
    }
}

export default addStory;