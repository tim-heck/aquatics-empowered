import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminCategoriesPage extends Component {

    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_FLAGGED_STORIES',
        })
    }



    handleCategoriesClick = (event) => {
        this.props.history.push('/admin-categories')
    }


    render() {
        return (
            <>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button Primary onClick={this.handleCategoriesClick}>Categories </Button><Button Primary>Flagged</Button >
                <br />
                <h1> FLAAAAG </h1>      
            </>
        )
    }
}

export default connect()(AdminCategoriesPage);
