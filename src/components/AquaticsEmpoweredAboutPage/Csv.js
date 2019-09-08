import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminCategoriesPage extends Component {


    handleEmailsClick = () => {
        console.log('clicked download emails')
        this.props.dispatch({
            type: 'GET_EMAILS' 
        })
    }

    render() {
        return (
            <>
               <button onClick={this.handleEmailsClick}>Download Emails</button> 
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);
