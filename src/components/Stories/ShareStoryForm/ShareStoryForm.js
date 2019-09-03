import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'semantic-ui-react';

class ShareStoryForm extends Component {

    state = {
        name: '',
        location: '',
        title: '',
        aquatic_therapist: '',
        message: '',
        email: '',
        flagged: false,
    }

    // This method sets our state through the form below
    handleChangeFor = (propertyName, event) => {
        this.setState({
            ...this.state,
            [propertyName]: event.target.value
        })
    }


    render() {
        return (
            <>
                <h4>{JSON.stringify(this.state)}</h4>
                <h3>Share your aquatic therapy story below!</h3>
                    <div>
                        <p>*What's your name?</p>
                        <input required placeholder="Name"
                        onChange={(event) => this.handleChangeFor('name', event)} />

                        <p>*Where do you live?</p>
                        <input required placeholder="Location"
                        onChange={(event) => this.handleChangeFor('location', event)} />

                        <p>*Give your story a title!</p>
                        <input required placeholder="Title"
                        onChange={(event) => this.handleChangeFor('title', event)} />

                        <p>Want to share the name of your therapist?</p>
                        <input placeholder="Therapist"
                        onChange={(event) => this.handleChangeFor('aquatic_therapist', event)} />

                        <p>*Please share your story.</p>
                        <textarea rows="4" cols="40" id="add-bar-input" required placeholder="Share your story!"
                        onChange={(event) => this.handleChangeFor('message', event)} maxLength="200" />

                        <p>Share images of your story?</p>
                        <input placeholder="Images go here"
                        onChange={(event) => this.handleChangeFor('images', event)} />
                        <Checkbox label="I agree to share my images on H2Whoa" />
                        <Checkbox label="I'd like to sign up for the Aquatics Empowered Newsletter" />
                        <input placeholder="E-mail address"
                        onChange={(event) => this.handleChangeFor('email', event)} />
                        <br />
                        <button>
                            Submit Story
                        </button>
                        <p>* indicates a required field</p>
                </div>
            </>
        )
    }
}

export default connect()(ShareStoryForm);
