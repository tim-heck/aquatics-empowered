import React, { Component } from 'react';
import { connect } from 'react-redux';

class AdminEditStoryView extends Component {
    
// Incorporate Sweet Alerts

state = {

    id: this.props.reduxStore.storiesReducer.id,
    name: this.props.reduxStore.storiesReducer.name,
    location: '',
    title: '',
    aquatic_therapist: '',
    message: '',
    email: '',
    category_id: '',
    flagged: '', 

}

        handleChangeFor =( event, propertyToChange )=> {
            
            this.setState({
                [propertyToChange]: event.target.value
            })

        console.log(`Typing in ${event.target.value} and adding new ${propertyToChange}`);
        
        }   

        handleStoryEditSubmit = ( ) => {
            
            console.log(`  'Clicked submit edited details to db'  `);

            window.confirm("Are you sure you wish to submit these edited details for this item?");

            this.props.dispatch({ 
                    type: 'EDIT_DETAILS', 
                    payload: this.state 
            });

        }

        backButton = () => {

            window.confirm("Leave without editing story?");

            alert('Headed back to the stories!');

            this.props.history.push('/gallery');

        }

    render() {
            return(
                <>

                </>
            )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(AdminEditStoryView);
