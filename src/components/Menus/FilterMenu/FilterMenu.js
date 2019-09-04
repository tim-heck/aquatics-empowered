import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Checkbox, Form, Icon } from 'semantic-ui-react'
import './FilterMenu.css'

class FilterMenu extends Component {

    state = {

    }

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_ADMIN_CATEGORIES' })
    }

    handleChange = () => {

    }

    render() {
        return (
            <>
                <Form id="filter-menu" className="filter-menu">
                    <h2>Filter by Category<Icon name="x" onClick={this.props.close} /></h2>
                    {this.props.reduxStore.categoriesReducer.map(item =>
                        <Form.Field key={item.id}>
                            <Checkbox label={item.category} onClick={this.handleChange}/>
                        </Form.Field>
                    )}
                    <Button type='submit'>Apply</Button>
                </Form>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(FilterMenu);
