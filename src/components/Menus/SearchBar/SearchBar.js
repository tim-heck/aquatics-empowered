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
    
    render() {
        
        return (
            <>
                <Form id="search-bar" className="search-bar">
                    <div>
                        <input className="search-element" placeholder="Search"
                            onChange={(event) => this.handleChange(event)}
                            value={this.state.searchInput}></input>
                        <Button primary className="search-element" type='submit' onClick={this.search}>Search</Button>
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
