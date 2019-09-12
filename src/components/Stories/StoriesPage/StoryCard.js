import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import "pure-react-carousel/dist/react-carousel.es.css";
import Swal from 'sweetalert2';
import StoryModal from './StoryModal';
import ImagesModal from './ImagesModal';

class StoryCard extends Component {

    state = {
        showStory: false,
        showImages: false
    }

    checkFeaturedImage = (url) => {
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
        this.props.dispatch({ type: 'FETCH_IMAGES', payload: this.props.story.id });
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
        // Sweet Alert popup
        Swal.fire({
            title: `Delete ${story.title}`,
            text: 'Are you sure you want to delete this story?',
            type: 'warning',
            confirmButtonText: 'Yes',
            showCancelButton: true,
            cancelButtonColor: '#db2828',
            cancelButtonText: 'Cancel'
        }).then((result) => {
            this.props.dispatch({ type: 'DELETE_STORY', payload: story });
        })
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
        return (
            <>
                <StoryModal showModal={this.state.showStory} closeStoryModal={this.closeStoryModal} 
                    story={this.props.story} checkAdmin={this.checkAdmin} checkSpecificTherapist={this.checkSpecificTherapist}
                    flagStory={this.flagStory} displayImage={this.displayImage} />
                <ImagesModal closeImagesModal={this.closeImagesModal} 
                    showModal={this.state.showImages} displayImage={this.displayImage}/>
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
