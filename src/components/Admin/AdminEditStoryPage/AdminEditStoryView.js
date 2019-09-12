import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Form, Select, Button, Image, Container } from 'semantic-ui-react';
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Swal from 'sweetalert2';
import './AdminEditStoryView.css';

class AdminEditStoryView extends Component {

    // Constructor for ReactQuill, needed for Rich Text Editor in form
    constructor(props) {
        super(props)
        this.quillRef = null; // Quill instance
        this.reactQuillRef = null; // ReactQuill component
        this.state = {
            id: '',
            name: '',
            location: '',
            title: '',
            aquatic_therapist: '',
            message: '',
            email: '',
            category_id: '',
            category: '',
            flagged: '',
            // used to display images modal window
            showImages: false,
        }
    }

    // On component load, do the following things:
    componentDidMount() {
        // Needed for Rich Text Editor
        this.attachQuillRefs();
        // Sets state to these values if there are objects in reducer
        if (Object.entries(this.props.reduxStore.stories.editStoryReducer).length > 0) {
            this.setState({
                id: this.props.reduxStore.stories.editStoryReducer.id,
                name: this.props.reduxStore.stories.editStoryReducer.name,
                location: this.props.reduxStore.stories.editStoryReducer.location,
                title: this.props.reduxStore.stories.editStoryReducer.title,
                aquatic_therapist: this.props.reduxStore.stories.editStoryReducer.aquatic_therapist,
                message: this.props.reduxStore.stories.editStoryReducer.message,
                email: this.props.reduxStore.stories.editStoryReducer.email,
                category_id: this.props.reduxStore.stories.editStoryReducer.category_id,
                category: this.props.reduxStore.stories.editStoryReducer.category,
                flagged: this.props.reduxStore.stories.editStoryReducer.flagged,
                showImages: false,
            });
            // Sends story id to a Saga which is used to grab the corresponding story's image
            this.props.dispatch({
                type: 'FETCH_IMAGES',
                payload: this.props.reduxStore.stories.editStoryReducer.id
            })
        }
        // Calls Saga that GETS all visible categories
        this.props.dispatch({ type: 'FETCH_VISIBLE_CATEGORIES' });

    }

    // Needed for Rich Text Editor
    componentDidUpdate() {
        this.attachQuillRefs();
    }

    // Needed for Rich Text Editor
    attachQuillRefs = () => {
        if (typeof this.reactQuillRef.getEditor !== 'function') return;
        this.quillRef = this.reactQuillRef.getEditor();
    }

    // Sets state to new values in form fields
    handleChangeFor = (propertyToChange, event) => {
        this.setState({
            ...this.state,
            [propertyToChange]: event.target.value
        })
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

    // When user clicks update button, sets the state with the updated information to a Saga 
    // that runs PUT route, updating the story's information.
    // If the story was flagged, then load the AdminFlaggedList component
    // else, load the Stories component
    updateStory = (checkRedirect) => {
        this.props.dispatch({ type: 'UPDATE_STORY', payload: this.state });
        if (checkRedirect === 'flagged') {
            this.props.history.push('/admin-flagged-list');
        } else {
            this.props.history.push('/stories');
        }

    }

    // When user clicks delete story, sends the story id to a Saga
    // that runs a DELETE route, deleting the story
    // Then load Stories component
    handleStoryDelete = (event) => {
        this.props.dispatch({
            type: 'DELETE_STORY',
            payload: this.state
        });
        this.props.history.push('/stories');
    }

    // Button to go back to stories page
    backToStoriesButton = () => {
        this.props.history.push('/stories');
    }

    // Button to go back to Flagged Post list page
    backToFlaggedPostsButton = () => {
        this.props.history.push('/admin-flagged-list');
    }

    // Conditional Render of 'update flagged post' edit story page
    // Admin can update the content of a selected story  
    // AND unflag or delete the post entirely
    checkView = () => {
        if (this.state.flagged) {
            return (
                <Button basic onClick={this.backToFlaggedPostsButton}>
                    Back to Flagged Posts
                </Button>
            );
        } else {
            return (
                <Button basic onClick={this.backToStoriesButton}>
                    Back to Stories Page
                </Button>
            );
        }
    }

    // Conditional Render of Update and Unflag button
    // Button that renders is based on whether or not objects are in reducer and
    // whether or not flagged property in state is true
    renderUpdateButton = () => {
        if (this.state.flagged) {
            if (Object.entries(this.props.reduxStore.stories.editStoryReducer).length > 0) {
                return (
                    <Button positive onClick={() => this.updateStory('flagged')}>
                        Update and Unflag
                    </Button>
                );
            } else {
                return (
                    <Button disabled positive>
                        Update and Unflag
                    </Button>
                );
            }
        } else {
            if (Object.entries(this.props.reduxStore.stories.editStoryReducer).length > 0) {
                return (
                    <Button basic onClick={() => this.updateStory('stories')}>
                        Update
                    </Button>
                );
            } else {
                return (
                    <Button disabled basic>
                        Update
                    </Button>
                );
            }
        }
    }

    checkEditStoryReducer = () => {
        if (Object.entries(this.props.reduxStore.stories.editStoryReducer).length > 0) {
            return (
                <Button negative onClick={this.handleStoryDelete}>
                    Delete this story
                </Button>
            );
        } else {
            return (
                <Button disabled color='red'>
                    Delete this story
                </Button>
            );
        }
    }

    deleteSpecificImage = (image) => {
        this.props.dispatch({ type: 'DELETE_IMAGE', payload: image });
    }

    renderDeleteImageButton = (id) => {
        if (this.props.reduxStore.images.imagesReducer.length > 0) {
            return (
                <Button color="red" onClick={() => this.deleteSpecificImage(id)}>Delete Image</Button>
            );
        } else {
            return (
                <Button disabled color="red">Delete Image</Button>
            );
        }
    }

    render() {
        // This is used in the category select in the form below
        const categories = [];
        this.props.reduxStore.categories.categoriesReducer.map(item =>
            categories.push({ text: item.category, value: item.id })
        );

        // below variable to be used to check if user is admin status or not
        // let authStatus = this.props.reduxStore.userReducer.admin
        return (
            <div className="form-container">
                {this.checkView()}
                <h2>Edit This Story</h2>
                <Form onSubmit={this.handleStoryEditSubmit}>
                    <Form.Group>
                        <Form.Input label="Name on submission" required placeholder={this.state.name} width={4}
                            onChange={(event) => this.handleChangeFor('name', event)}
                            value={this.state.name} />
                        <Form.Input label="Location" required placeholder={this.state.location} width={8}
                            onChange={(event) => this.handleChangeFor('location', event)}
                            value={this.state.location} />
                        {/* Select field that uses the categories variable above for the options */}
                        <Form.Field control={Select} required label='Category'
                            options={categories} placeholder={this.state.category || 'Category'}
                            onChange={this.handleCategoryChange} width={4} />
                    </Form.Group>
                    <Form.Group>
                        <Form.Input label="Story Title" required placeholder={this.state.title} width={8}
                            onChange={(event) => this.handleChangeFor('title', event)}
                            value={this.state.title} />
                        <Form.Input label="Aquatic Therapist" placeholder={this.state.aquatic_therapist} width={8}
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
                                <>
                                    <Slide key={image.id} tag="a" index={i}>
                                        <Image src={image.getUrl} />
                                        <div className="image-delete-btn">
                                            {this.renderDeleteImageButton(image)}
                                        </div>
                                    </Slide>
                                </>
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
                    <br />
                    <h4>Email: {this.state.email}</h4>
                    {this.renderUpdateButton()}
                    <p>* indicates a required field</p>
                </Form>

                {this.checkEditStoryReducer()}
            </div>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(AdminEditStoryView);
