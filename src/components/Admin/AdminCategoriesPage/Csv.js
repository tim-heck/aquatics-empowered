import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import { CSVLink, CSVDownload } from "react-csv";

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
     
        let emails = []

        this.props.store.csv.map((email, i) => {
            emails.push(email)
        });
        console.log(emails);

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
