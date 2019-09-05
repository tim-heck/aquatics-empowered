import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Button } from 'semantic-ui-react';
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel";
import 'semantic-ui-css/semantic.min.css';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

class AdminEditStoryView extends Component {

    // Incorporate Sweet Alerts

    // Constructor for ReactQuill, needed for Rich Text Editor in form
    constructor(props) {
        super(props)
        this.quillRef = null; // Quill instance
        this.reactQuillRef = null; // ReactQuill component


        this.state = {

            id: this.props.reduxStore.storiesReducer.id,
            name: this.props.reduxStore.storiesReducer.name,
            location: this.props.reduxStore.storiesReducer.location,
            title: this.props.reduxStore.storiesReducer.title,
            aquatic_therapist: this.props.reduxStore.storiesReducer.aquatic_therapist,
            message: this.props.reduxStore.storiesReducer.message,
            email: this.props.reduxStore.storiesReducer.email,
            category_id: this.props.reduxStore.storiesReducer.category_id,
            flagged: this.props.reduxStore.storiesReducer.flagged,

        }
    }

    // Needed for Rich Text Editor
    componentDidMount() {
        this.attachQuillRefs()

    }

    // Needed for Rich Text Editor
    componentDidUpdate() {
        this.attachQuillRefs()
    }

    // Needed for Rich Text Editor
    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }


    handleChangeFor = (event, propertyToChange) => {

        this.setState({
            [propertyToChange]: event.target.value
        })

        console.log(`Typing in ${event.target.value} and adding new ${propertyToChange}`);

    }

    // Sets message property in state 
    handleMessageChange = () => {
        const editor = this.reactQuillRef.getEditor();
        const unprivilegedEditor = this.reactQuillRef.makeUnprivilegedEditor(editor);
        this.setState({
            ...this.state,
            message: unprivilegedEditor.getHTML()
        })
    }

    // Sets the category_id property of state
    handleCategoryChange = (e, { value }) => {
        this.setState({
            ...this.state,
            category_id: value
        })
    }

    // This function will dispatch our edited story to the editStoryReducer, which will trigger a PUT
    // that updates the selected story in the database

    handleStoryEditSubmit = (event) => {
        event.preventDefault();

        console.log(`  'Clicked submit edited details to db'  `);

        // NEED TO INCORPORATE SWEET ALERTS HERE INSTEAD OF WINDOW.CONFIRM FUNCTION

        window.confirm("Are you sure you wish to submit these edited details for this item?");

        this.props.dispatch({
            type: 'EDIT_STORY', // THIS ACTION NEEDS A SAGA&REDUCER
            payload: this.state
        });
    }

    handleStoryDelete = (event) => {

        window.confirm("Are you sure you wish to delete this story completely? This action can't be undone.")

        this.props.dispatch({
            type: 'DELETE_STORY',
            payload: this.props.reduxStore.storiesReducer.id
        })

        this.history.push('/stories');

    }

    handleUnflagStory = (event) => {

        // NEED TO INCORPORATE SWEET ALERTS HERE INSTEAD OF WINDOW.CONFIRM FUNCTION
        window.confirm("Are you sure you wish to remove the flag on this post?")

        this.props.dispatch({
            type: 'UNFLAG_STORY',
            payload: this.props.reduxStore.storiesReducer.id
        })

    }

    // Button to go back to stories page

    backToStoriesButton = () => {

        // NEED TO INCORPORATE SWEET ALERTS HERE INSTEAD OF WINDOW.CONFIRM FUNCTION
        window.confirm("Leave without editing story?");

        alert('Headed back to the stories!');

        this.props.history.push('/stories');

    }

    // Button to go back to Flagged Post list page

    backToFlaggedPostsButton = () => {

        alert('Headed back to the list of flagged posts!');

        this.props.history.push('/admin-flagged-list');

    }


    render() {

        // This is used in the category select in the form below
        const categories = [
            { key: 'ps', text: 'Public Service', value: '1' },
            { key: 's', text: 'Seniors', value: '2' },
            { key: 'y', text: 'Youth', value: '3' },
            { key: 'r', text: 'Rehabilitation', value: '4' },
            { key: 'an', text: 'Animals', value: '5' },
            { key: 'ath', text: 'Athletes', value: '6' }
        ];

        // Set variable to flagged property value to check against for conditional rendering
        // of 'vanilla' edit story or 'update flagged post' edit story pages

        let flaggedStatus = this.props.reduxStore.storiesReducer.flagged
        // below variable to be used to check if user is admin status or not
        // let authStatus = this.props.reduxStore.userReducer.admin

        if (flaggedStatus === true) {
            // Conditional Render of 'update flagged post' edit story page
            // Admin can update the content of a selected story  
            // AND unflag or delete the post entirely

            return (
                <>
                    <Button basic
                        onClick={this.backToStoriesButton}>
                        Back to Stories Page
                        </Button>
                    <Button basic
                        onClick={this.backToFlaggedPostsButton}>
                        Back to Flagged Posts
                        </Button>
                    <h2>Edit This Story</h2>
                    <Form onSubmit={this.handleStoryEditSubmit}>
                        <Form.Group>
                            <Form.Input label="Name on submission" required placeholder={this.props.reduxStore.storiesReducer.name} width={4}
                                onChange={(event) => this.handleChangeFor('name', event)}
                                value={this.state.name} />
                            <Form.Input label="Location" required placeholder={this.props.reduxStore.storiesReducer.location} width={5}
                                onChange={(event) => this.handleChangeFor('location', event)}
                                value={this.state.location} />
                            {/* Select field that uses the categories variable above for the options */}
                            <Form.Field control={Select} required label='Category'
                                options={categories} value={this.state.category_id}
                                placeholder='Category' onChange={this.handleCategoryChange} />
                        </Form.Group>
                        <Form.Group>
                            <Form.Input label="Story Title" required placeholder={this.props.reduxStore.storiesReducer.title} width={6}
                                onChange={(event) => this.handleChangeFor('title', event)}
                                value={this.state.title} />
                            <Form.Input label="Aquatic Therapist" placeholder={this.props.reduxStore.storiesReducer.aquatic_therapist} width={6}
                                onChange={(event) => this.handleChangeFor('aquatic_therapist', event)}
                                value={this.state.aquatic_therapist} />
                        </Form.Group>
                        {/* Rich Text Editor input field */}
                        <Form.Field required label="Edit this story!" />
                        <ReactQuill
                            ref={(el) => { this.reactQuillRef = el }}
                            theme={'snow'}
                            preserveWhitespace={true}
                            value={this.state.message}
                            onChange={() => this.handleMessageChange()} />

                        {/* THIS IS WHERE IMAGE EDITING STUFFS WILL HAPPEN  */}
                        {/* CarouselProvider component found at: https://codesandbox.io/s/43pv7wm6n9?from-embed */}
                        <CarouselProvider
                            naturalSlideWidth={1}
                            naturalSlideHeight={1}
                            totalSlides={this.props.reduxStore.images.imagesReducer.length} >
                            <Slider>
                                {this.props.reduxStore.images.imagesReducer.map((image, i) =>
                                    <Slide key={image.id} tag="a" index={i}>
                                        <Image src={image.img_link} onClick={this.openImagesModal} />
                                    </Slide>
                                )}
                            </Slider>
                            <Container textAlign="center">
                                <Button.Group size="mini">
                                    {[...Array(this.props.reduxStore.images.imagesReducer.length).keys()].map(slide => (
                                        <Button as={Dot} key={slide} icon="circle" slide={slide} />
                                    ))}
                                </Button.Group>
                            </Container>
                        </CarouselProvider>

                        <Form.Input label="Edit Images" placeholder="Images go here"
                            onChange={(event) => this.handleChangeFor('images', event)} />
                        {/* <a href="http://www.google.com">Picture Terms and Conditions</a> */}
                        <br />
                        <h4>Email:{this.state.email}</h4>
                        <Button primary>
                            Submit
                            </Button>
                        <p>* indicates a required field</p>
                    </Form>

                    <Button negative
                        onClick={this.handleStoryDelete}>
                        Delete this story
                    </Button>
                    <Button positive
                        onClick={this.handleUnflagStory}>
                        Unflag this story
                    </Button>
                </>
            )
        }
        // Conditional Rendering of 'vanilla' edit story page - allows for update of content
        // of a post that is not flagged
        else {
            <>
                <Button basic
                    onClick={this.backToStoriesButton}>
                    Back to Stories Page
                </Button>
                <h2>Edit This Story</h2>
                <Form onSubmit={this.handleStoryEditSubmit}>
                    <Form.Group>
                        <Form.Input label="Name on submission" required placeholder={this.props.reduxStore.storiesReducer.name} width={4}
                            onChange={(event) => this.handleChangeFor('name', event)}
                            value={this.state.name} />
                        <Form.Input label="Location" required placeholder={this.props.reduxStore.storiesReducer.location} width={5}
                            onChange={(event) => this.handleChangeFor('location', event)}
                            value={this.state.location} />
                        {/* Select field that uses the categories variable above for the options */}
                        <Form.Field control={Select} required label='Category'
                            options={categories} value={this.state.category_id}
                            placeholder='Category' onChange={this.handleCategoryChange} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Story Title" required placeholder={this.props.reduxStore.storiesReducer.title} width={6}
                            onChange={(event) => this.handleChangeFor('title', event)}
                            value={this.state.title} />
                        <Form.Input label="Aquatic Therapist" placeholder={this.props.reduxStore.storiesReducer.aquatic_therapist} width={6}
                            onChange={(event) => this.handleChangeFor('aquatic_therapist', event)}
                            value={this.state.aquatic_therapist} />
                    </Form.Group>
                    {/* Rich Text Editor input field */}
                    <Form.Field required label="Edit this story!" />
                    <ReactQuill
                        ref={(el) => { this.reactQuillRef = el }}
                        theme={'snow'}
                        preserveWhitespace={true}
                        value={this.state.message}
                        onChange={() => this.handleMessageChange()} />

                    {/* THIS IS WHERE IMAGE EDITING STUFFS WILL HAPPEN */}
                    {/* CarouselProvider component found at: https://codesandbox.io/s/43pv7wm6n9?from-embed */}
                    <CarouselProvider
                        naturalSlideWidth={1}
                        naturalSlideHeight={1}
                        totalSlides={this.props.reduxStore.images.imagesReducer.length} >
                        <Slider>
                            {this.props.reduxStore.images.imagesReducer.map((image, i) =>
                                <Slide key={image.id} tag="a" index={i}>
                                    <Image src={image.img_link} onClick={this.openImagesModal} />
                                </Slide>
                            )}
                        </Slider>
                        <Container textAlign="center">
                            <Button.Group size="mini">
                                {[...Array(this.props.reduxStore.images.imagesReducer.length).keys()].map(slide => (
                                    <Button as={Dot} key={slide} icon="circle" slide={slide} />
                                ))}
                            </Button.Group>
                        </Container>
                    </CarouselProvider>
                    
                    <Form.Input label="Edit Images" placeholder="Images go here"
                        onChange={(event) => this.handleChangeFor('images', event)} />
                    {/* <a href="http://www.google.com">Picture Terms and Conditions</a> */}
                    <br />
                    <h4>Email:{this.state.email}</h4>
                    <Button primary>
                        Submit
                            </Button>
                    <p>* indicates a required field</p>
                </Form>

                <Button negative
                    onClick={this.handleStoryDelete}>
                    Delete this story
                    </Button>

            </>
        }
    }

}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(AdminEditStoryView);
