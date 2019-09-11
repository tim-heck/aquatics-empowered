import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel";
import { Card, Icon, Image, Button, Header, Modal, Container } from 'semantic-ui-react'
import "pure-react-carousel/dist/react-carousel.es.css";
import Swal from 'sweetalert2';

class StoryCard extends Component {

    state = {
        showStory: false,
        showImages: false
    }

    checkFeaturedImage = (url) => {
        console.log(this.props.reduxStore.images.imagesReducer)
        if (url) {
            return (
                <Image src={url} wrapped ui={false} alt={this.props.story.title} onClick={this.openStoryModal} />
            );
        }
    }

    openStoryModal = () => {
        this.props.dispatch({ type: 'FETCH_IMAGES', payload: this.props.story.id });
        this.setState({
            showStory: true
        })
    }

    closeStoryModal = () => {
        this.setState({
            showStory: false
        })
    }

    openImagesModal = () => {
        this.setState({
            showImages: true
        })
    }

    closeImagesModal = () => {
        this.setState({
            showImages: false
        })
    }

    checkTherapist = (aquatic_therapist) => {
        if (aquatic_therapist) {
            return (
                <Card.Meta>
                    <span>Aquatic Therapist: {aquatic_therapist}</span>
                </Card.Meta>
            );
        }
    }

    checkSpecificTherapist = (aquatic_therapist) => {
        if (aquatic_therapist) {
            return (
                <h4 className="modal-meta">Aquatic Therapist: {this.props.story.aquatic_therapist}</h4>
            );
        }
    }

    checkAdmin = () => {
        if (this.props.reduxStore.user.admin) {
            return (
                <Button.Group>
                    <Button className="edit-button" onClick={() => this.editStory(this.props.story)}>
                        Edit Story
                    </Button>
                    <Button color="red" onClick={() => this.deleteStory(this.props.story)}>
                        Delete Story
                    </Button>
                </Button.Group>
            );
        }
    }

    editStory = (story) => {
        this.props.dispatch({ type: 'EDIT_STORY', payload: story })
        this.props.directToEditPage();
    }

    deleteStory = (story) => {
        this.props.dispatch({ type: 'DELETE_STORY', payload: story })
    }

    flagStory = (story) => {
        this.props.dispatch({ type: 'FLAG_STORY', payload: story })
        Swal.fire({
            title: 'Success',
            text: 'This story has been flagged for moderation',
            type: 'success',
            confirmButtontext: 'Ok'
        })
    }

    displayImage = (image, modal) => {
        if (modal === 'story') {
            return (
                <Image className="story-image" src={image.getUrl} onClick={this.openImagesModal} />
            );
        } else if (modal === 'image') {
            return (
                <Image src={image.getUrl} onClick={this.viewImages} />
            );
        } else {
            return (
                <></>
            );
        }
    }

    render() {
        console.log(this.props.reduxStore.images.imagesReducer);
        return (
            <>
                <Modal className="story-modal" open={this.state.showStory} centered={false}>
                    <Icon name="close" onClick={this.closeStoryModal} />
                    <Header content={this.props.story.title} />
                    {/* CarouselProvider component found at: https://codesandbox.io/s/43pv7wm6n9?from-embed */}
                    <CarouselProvider
                        naturalSlideWidth={1}
                        naturalSlideHeight={1}
                        totalSlides={this.props.reduxStore.images.imagesReducer.length}
                    >
                        <Slider>
                            {this.props.reduxStore.images.imagesReducer.map((image, i) =>
                                <Slide key={image.id} tag="a" index={i}>
                                    {this.displayImage(image, 'story')}
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
                    <Modal.Content>
                        <h3>{this.props.story.title}<Icon name="flag" onClick={() => this.flagStory(this.props.story)} /></h3>
                        <h4 className="modal-meta">{this.props.story.name}</h4>
                        <h4 className="modal-meta">{this.props.story.location}</h4>
                        <h4 className="modal-meta">{this.props.story.category}</h4>
                        {this.checkSpecificTherapist(this.props.story.aquatic_therapist)}
                        <div className="modal-message" dangerouslySetInnerHTML={{ __html: this.props.story.message }}></div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic onClick={this.closeStoryModal}>
                            Back to Stories
                        </Button>
                        {this.checkAdmin()}
                    </Modal.Actions>
                </Modal>
                <Modal className="images-modal" open={this.state.showImages} centered={false}>
                    {/* CarouselProvider component found at: https://codesandbox.io/s/43pv7wm6n9?from-embed */}
                    <Icon name="close" onClick={this.closeImagesModal} />
                    <CarouselProvider
                        naturalSlideWidth={1}
                        naturalSlideHeight={1}
                        totalSlides={this.props.reduxStore.images.imagesReducer.length}
                    >
                        <Slider>
                            {this.props.reduxStore.images.imagesReducer.map((image, i) =>
                                <Slide key={image.id} tag="a" index={i}>
                                    {this.displayImage(image, 'image')}
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
                </Modal>
                <Card>
                        {this.checkFeaturedImage(this.props.story.getUrl)}
                    <Card.Content>
                        <Card.Header>{this.props.story.title}<Icon name="flag" onClick={() => this.flagStory(this.props.story)} /></Card.Header>
                        <Card.Meta>
                            {this.props.story.name}
                        </Card.Meta>
                        <Card.Meta>
                            <span className="location">{this.props.story.location}</span>
                        </Card.Meta>
                        <Card.Meta>
                            <span>{this.props.story.category}</span>
                        </Card.Meta>
                        {this.checkTherapist(this.props.story.aquatic_therapist)}
                        <div className="description" dangerouslySetInnerHTML={{ __html: this.props.story.message }}></div>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic onClick={this.openStoryModal}>
                            View Story
                        </Button>
                        {this.checkAdmin()}
                    </Card.Content>
                </Card>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(StoryCard);
