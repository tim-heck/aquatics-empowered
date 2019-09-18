// setting the emails taken from the stories table in the database
const Csv = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMAILS':
            return action.payload;
        default:
            return state;
    }
}

export default Csv;