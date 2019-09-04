import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel";
import { Card, Icon, Image, Button, Header, Modal, Container} from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import "pure-react-carousel/dist/react-carousel.es.css";

class StoryCard extends Component {

    state = {
        showStory: false
    }

    checkFeaturedImage = (image) => {
        if (image) {
            return (
                <Image src={image} wrapped ui={false} alt={this.props.story.title} onClick={this.openStoryModal} />
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

    render() {
        return (
            <>
                <Modal open={this.state.showStory} centered={false}>
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
                                    <Image src={image.img_link} />
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
                        <h3>{this.props.story.name}<Icon name="flag" /></h3>
                        <h4>{this.props.story.location}</h4>
                        <h4>{this.props.story.category}</h4>
                        <p>{this.props.story.message}</p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic>
                            Back to Stories
                        </Button>
                    </Modal.Actions>
                </Modal>
                <Card>
                    {this.checkFeaturedImage(this.props.story.img_link)}
                    <Card.Content>
                        <Card.Header>{this.props.story.title}<Icon name="flag" /></Card.Header>
                        <Card.Meta>
                            {this.props.story.name}
                        </Card.Meta>
                        <Card.Meta>
                            <span className="location">{this.props.story.location}</span>
                        </Card.Meta>
                        <Card.Meta>
                            <span>{this.props.story.category}</span>
                        </Card.Meta>
                        <Card.Description>
                            {this.props.story.message}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic>
                            View Story
                        </Button>
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
