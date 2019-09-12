import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel";
import { Icon, Button, Header, Modal, Container } from 'semantic-ui-react'

class StoryModal extends Component {

    render() {
        return (
            <>
                <Modal className="story-modal" open={this.props.showModal} centered={false}>
                    <Icon name="close" onClick={this.props.closeStoryModal} />
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
                                    {this.props.displayImage(image, 'story')}
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
                        <h3>{this.props.story.title}<Icon name="flag" onClick={() => this.props.flagStory(this.props.story)} /></h3>
                        <h4 className="modal-meta">{this.props.story.name}</h4>
                        <h4 className="modal-meta">{this.props.story.location}</h4>
                        <h4 className="modal-meta">{this.props.story.category}</h4>
                        {this.props.checkSpecificTherapist(this.props.story.aquatic_therapist)}
                        <div className="modal-message" dangerouslySetInnerHTML={{ __html: this.props.story.message }}></div>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic onClick={this.props.closeStoryModal}>
                            Back to Stories
                        </Button>
                        {this.props.checkAdmin()}
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(StoryModal);
