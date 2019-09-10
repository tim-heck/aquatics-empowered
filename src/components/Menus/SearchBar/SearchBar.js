import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Form } from 'semantic-ui-react'
import './SearchBar.css'

class SearchBar extends Component {

    state = {
        searchInput: ''
    }

    search = () => {
        this.props.dispatch({
            type: 'SEARCH',
            payload: this.state.searchInput
        })
    }

    handleChange = (event) => {
        this.setState({
            searchInput: event.target.value
        })
        
    }

    // Want to check on setting state to parsed search query and how to go about doing that.
    // add this function into handleChange? just the contents? what to do? what to do? what do?

    // searchParse = (searchInput) => {

    //     let array = searchInput.split('');

    //     let query = '';

    //     for (let i = 0; i < array.length; i++) {
    //         query += 'q' + i + '=' + array[i];
    //     }

    //     this.setState({
    //         searchInput: query
    //     })

    // }
    
//     let array = searchQuery.split('');

// let values = '';

// for (let i = 0; i < array.length; i++) {
//     values += 'q' + i + '=' + values[i];
// }
    
    render() {
        console.log(this.state);
        
        return (
            <>
                <Form id="search-bar" className="search-bar">
                    <div>
                        <input className="search-element" placeholder="Search"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.searchInput}></input>
                        <Button className="search-element" type='submit' onClick={this.search}>Search</Button>
                    </div>
                </Form>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(SearchBar);
