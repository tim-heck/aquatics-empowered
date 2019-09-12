import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'
import './FilterMenu.css'

class FilterMenu extends Component {

    state = {
        
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_VISIBLE_CATEGORIES' })
    }

    handleChange = (e, propToAdd) => {
        this.setState({
            // from the event, e, the checked value can be found navigating through
            // the nativeEvent to find the element being targeted by the event
            // which happens to be the label and it's sibling is the input (checkbox)
            [propToAdd]: !e.nativeEvent.target.parentElement.children[0].checked
        })
    }

    filterStories = () => {
        this.props.dispatch({ type: 'FILTER_STORIES', payload: this.state });
        this.props.close();
    }

    clearFilters = () => {
        // grabs each checkbox and stores in an array
        const checkboxes = document.getElementsByClassName('checkbox');
        // loops through each checkbox, finds inpput child and changes checked value to false
        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].children[0].checked = false;
        }
    }

    render() {
        return (
            <>
                <Form id="filter-menu" className="filter-menu">
                    <h2>Filter by Category<Icon name="x" onClick={this.props.filterNone} /></h2>
                    {this.props.reduxStore.categories.categoriesReducer.map(item =>
                        <Form.Field key={item.id} onClick={(e) => this.handleChange(e, item.category.replace(/ /g, '_').toLowerCase())}>
                            {/* item.category.replace(/ /g, '_').toLowerCase() */}
                            <Checkbox 
                                label={item.category}
                            />
                        </Form.Field>
                    )}
                    <Button type='submit' onClick={this.filterStories}>Apply</Button>
                    {/* <Button onClick={this.clearFilters}>Clear Filters</Button> */}
                </Form>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(FilterMenu);
