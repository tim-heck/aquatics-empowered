import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid, Form } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';
import './AdminPages.css';

class AdminCategoriesPage extends Component {

    state = {
        category: '',
    }

    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_HIDDEN_CATEGORIES'
        })
        this.props.dispatch({
            type: 'FETCH_VISIBLE_CATEGORIES'
        })
    }

    handleAddClick = () => {
        console.log('clicked add')
        this.props.dispatch({
            type: 'ADD_CATEGORY',
            payload: this.state,
        })
        this.setState({
            category: '',
        })
    }

    handleChange = (event) => {
        this.setState({
            category: event.target.value,
        })
    }

    handleFlaggedClick = (event) => {
        this.props.history.push('/admin-flagged-list')
    }

    handleHideClick = (category) => {
        this.props.dispatch({
            type: 'HIDE_CATEGORY',
            payload: category.id
        })
    }

    handleUnhideClick = (category) => {
        console.log(category)
        this.props.dispatch({
            type: 'UNHIDE_CATEGORY',
            payload: category.id
        })
    }

    render() {
        return (
            <div className="form-container">
                <h1>Administration</h1>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button Primary>Categories</Button><Button Primary onClick={this.handleFlaggedClick}>Flagged</Button >
                <br />
                <h1>Add a Category</h1>
                <p>Adding a category will add it to the category list that users select from when sharing a story.</p>
                <Form>
                    <Form.Group>
                        <Form.Input onChange={this.handleChange} value={this.state.category} />
                        <Button basic onClick={this.handleAddClick}>Add</Button>
                    </Form.Group>
                </Form>
                <h1>Currently Visible Categories</h1>
                <ul className="categories-list">
                    {this.props.store.categories.categoriesReducer.map(category =>
                        <li key={category.id}>
                            <h3>{category.category}</h3>
                            <Button basic onClick={() => { this.handleHideClick(category) }}>Hide</Button>
                        </li>
                    )}
                </ul>
                <h1>Currently Hidden Categories</h1>
                <ul className="categories-list">
                    {this.props.store.categories.hiddenCategoriesReducer.map(category =>
                        <li key={category.id}>
                            <h3>{category.category}</h3>
                            <Button basic onClick={() => { this.handleUnhideClick(category) }}>Unhide</Button>
                        </li>
                    )}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);