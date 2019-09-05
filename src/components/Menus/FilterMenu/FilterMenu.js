import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'
import './FilterMenu.css'

class FilterMenu extends Component {

    /*
        Loop on back-end through payload to check if checked value is true
        Send GET query to table for each checked
        Push to reducer
    */

    state = {
        
    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ADMIN_CATEGORIES' })
    }

    handleChange = (e, propToAdd) => {
        this.setState({
            [propToAdd]: !e.nativeEvent.target.parentElement.children[0].checked
        })
    }

    filterStories = () => {
        this.props.dispatch({ type: 'FILTER_STORIES', payload: this.state });
        this.props.close();
    }

    render() {
        return (
            <>
                <Form id="filter-menu" className="filter-menu">
                    <h2>Filter by Category<Icon name="x" onClick={this.props.filterNone} /></h2>
                    {this.props.reduxStore.categoriesReducer.map(item =>
                        <Form.Field key={item.id} onClick={(e) => this.handleChange(e, item.category.replace(/ /g, '_').toLowerCase())}>
                            {/* item.category.replace(/ /g, '_').toLowerCase() */}
                            <Checkbox 
                                label={item.category}
                            />
                        </Form.Field>
                    )}
                    <Button type='submit' onClick={this.filterStories}>Apply</Button>
                </Form>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(FilterMenu);
