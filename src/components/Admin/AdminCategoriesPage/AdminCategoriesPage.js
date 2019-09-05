import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Grid } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminCategoriesPage extends Component {


    state = {
        category: '',
    }


    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_VISIBLE_CATEGORIES',
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

    checkHidden = (product) => {
        const { classes } = this.props;
        if (product.hide) {
            return (
                <Button variant="contained" className={classes.button} onClick={() => this.handleClick('hide', product)}>Unhide</Button>
            );
        } else {
            return (
                <Button variant="contained" className={classes.button} onClick={() => this.handleClick('hide', product)}>Hide</Button>
            );
        }
    }

    render() {
        return (
            <>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button Primary>Categories </Button><Button Primary onClick={this.handleFlaggedClick}>Flagged</Button >
                <br />
                <h1>Add a Category</h1>
                <p>Adding a category will add it to the category list that users select from when sharing a story. 
                </p>
                <input onChange={this.handleChange} value={this.state.category}></input>
                <button onClick={this.handleAddClick}>Add</button>
                <h1>Currently Visible Categories</h1>
                <ul>
                    {this.props.store.categoriesReducer.map(category => {
                    return <li key={category.id}>
                    <h3>{category.category}</h3>
                    <button onClick={()=> {this.handleHideClick(category)}}>HIDE</button>
                    </li>   
                    })}
                </ul>
                <h1>Currently Hidden Categories</h1>
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);
