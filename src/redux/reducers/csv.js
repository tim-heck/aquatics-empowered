const Csv = (state = [], action) => {
    switch (action.type) {
        case 'SET_EMAILS':
            return action.payload;
        default:
            return state;
    }
}



export default Csv;