import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminCategoriesPage extends Component {

    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_ADMIN_CATEGORIES',
        })
    }


    handleFlaggedClick = (event) => {
        this.props.history.push('/admin-flagged-list')
    }

    render() {
        return (
            <>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button Primary>Categories </Button><Button Primary onClick={this.handleFlaggedClick}>Flagged</Button >
                <br />
                <h1>Add or Hide Categories</h1>
                <h1>{JSON.stringify(this.props.store.categoriesReducer)}</h1>
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);
