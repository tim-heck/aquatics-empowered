import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminCategoriesPage extends Component {

    handleFlaggedClick = (event) => {
        this.props.history.push('/admin-flagged-list')
    }


    render() {
        return (
            <>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button Primary>Categories </Button><Button Primary onClick={this.handleFlaggedClick}>Flagged</Button >
                <br />
                <h1> CAAAAAT </h1>      
            </>
        )
    }
}

export default connect()(AdminCategoriesPage);
