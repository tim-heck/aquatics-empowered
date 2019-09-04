import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminCategoriesPage extends Component {


    state = {
        category: '',
    }


    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_ADMIN_CATEGORIES',
        })
    }

    handleChange = (event) => {
        this.setState({
            category: event.target.value,
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

    handleFlaggedClick = (event) => {
        this.props.history.push('/admin-flagged-list')
    }

    render() {
        return (
            <>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button Primary>Categories </Button><Button Primary onClick={this.handleFlaggedClick}>Flagged</Button >
                <br />
                <h1>Add a Category</h1>
                {JSON.stringify(this.state)}
                <p>Adding a category will add it to the category list that users select from when sharing a story. 
                </p>
                <input onChange={this.handleChange} value={this.state.category}></input>
                <button onClick={this.handleAddClick}>Add</button>
                <h1>Hide a Category</h1>
                <p>Conversely, hiding a story will hide that category from the list.</p>
                <ul>
                    {this.props.store.categoriesReducer.map(category => {
                    return <li key={category.id}>
                    <h3>{category.category}</h3>
                    <button>HIDE</button>
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
