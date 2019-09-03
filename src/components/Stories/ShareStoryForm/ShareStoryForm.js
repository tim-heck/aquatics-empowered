import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox, Form, Select, Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class ShareStoryForm extends Component {

    state = {
        name: '',
        location: '',
        title: '',
        aquatic_therapist: '',
        message: '',
        email: '',
        category_id: 0,
        flagged: false,
    }

    // This method sets our state through the form below
    handleChangeFor = (propertyName, event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
        console.log(this.state);
    }

    // Sets the category_id property
    handleChange = (e, {value}) => {
        this.setState({
            ...this.state,
            category_id: value
        })
    }

    handleSubmit = (event) => {
        console.log(this.state)
        event.preventDefault();
        this.props.dispatch({
            type: 'ADD_STORY',
            payload: this.state,
        })
        this.setState({
            name: '',
            location: '',
            title: '',
            aquatic_therapist: '',
            message: '',
            email: '',
            category_id: 0,
            flagged: false,
        })

    }

    render() {

    // This is used in the category select in the form
    const categories = [
        { key: 'ps', text: 'Public Service', value: '1'},
        { key: 's', text: 'Seniors', value: '2'},
        { key: 'y', text: 'Youth', value: '3'},
        { key: 'r', text: 'Rehabilitation', value: '4'},
        { key: 'an', text: 'Animals', value: '5'},
        { key: 'ath', text: 'Athletes', value: '6'}
    ]

        return (
            <>
                <h3>Share your aquatic therapy story below!</h3>
                        <Form onSubmit={this.handleSubmit}>
                            <Form.Group>
                                <Form.Input label="What's your name?" required placeholder="Name" width={4}
                                onChange={(event) => this.handleChangeFor('name', event)} 
                                value={this.state.name}/>
                                <Form.Input label="Where do you live?" required placeholder="Location" width={5}
                                onChange={(event) => this.handleChangeFor('location', event)} 
                                value={this.state.location} />
                                {/* Select field that uses the categories variable above for the options */}
                                <Form.Field control={Select} required label='Choose a category'
                                options={categories} value={this.state.category_id}
                                placeholder='Category' onChange={this.handleChange} />
                            </Form.Group>
                            <Form.Group>
                                <Form.Input label="Give your story a title." required placeholder="Title" width={6}
                                onChange={(event) => this.handleChangeFor('title', event)} 
                                value={this.state.title} />
                                <Form.Input label="Want to share the name of your therapist?" placeholder="Therapist" width={6}
                                onChange={(event) => this.handleChangeFor('aquatic_therapist', event)} 
                                value={this.state.aquatic_therapist} />
                            </Form.Group>
                                <Form.Input label="Please share your story" required placeholder="Share your story!" width={12}
                                onChange={(event) => this.handleChangeFor('message', event)} 
                                value={this.state.message} />
                                <Form.Input label="Share images of your story?" placeholder="Images go here"
                                onChange={(event) => this.handleChangeFor('images', event)} />
                                <a href="http://www.google.com">Picture Terms and Conditions</a>
                                <br />
                                <Checkbox label="I agree to share my images on H2Whoa" />
                                <br />
                                <Checkbox label="I'd like to sign up for the Aquatics Empowered Newsletter" />
                                <Form.Input placeholder="E-mail address" label="Enter E-mail" width = {4}
                                onChange={(event) => this.handleChangeFor('email', event)} 
                                value={this.state.email} />
                                <Button primary>
                                    Submit
                                </Button>
                                <p>* indicates a required field</p>     
                        </Form>      
            </>
        )
    }
}

export default connect()(ShareStoryForm);
