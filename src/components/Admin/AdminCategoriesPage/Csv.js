import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CSVLink } from "react-csv";

class AdminCategoriesPage extends Component {

    componentDidMount () {
        this.props.dispatch({
            type: 'GET_EMAILS'
        }) 
    }

    // This will get emails for the csv downloaded file from the database
    handleEmailsClick = () => {
        console.log('clicked download emails')
        this.props.dispatch({
            type: 'GET_EMAILS' 
        })
    }

    render() {
        return (
            <>
                <CSVLink onClick={this.handleEmailsClick} data={this.props.store.csv}>Download Emails</CSVLink> 
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);
