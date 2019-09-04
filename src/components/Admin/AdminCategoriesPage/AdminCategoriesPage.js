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
                <ul>
                    {this.props.store.categoriesReducer.map(category => {
                    return <li key={category.id}>
                    <h3>{category.category}</h3>
                    </li>   
                    })}
                </ul>
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);
