import React, { Component } from 'react';
import { connect } from 'react-redux';
import { CarouselProvider, Slide, Slider, Dot } from "pure-react-carousel";
import { Icon, Button, Modal, Container } from 'semantic-ui-react'

class ImagesModal extends Component {

    render() {
        return (
            <>
                <Modal className="images-modal" open={this.props.showModal} centered={false}>
                    {/* CarouselProvider component found at: https://codesandbox.io/s/43pv7wm6n9?from-embed */}
                    <Icon name="close" onClick={this.props.closeImagesModal} />
                    <CarouselProvider
                        naturalSlideWidth={1}
                        naturalSlideHeight={1}
                        totalSlides={this.props.reduxStore.images.imagesReducer.length}
                    >
                        <Slider>
                            {this.props.reduxStore.images.imagesReducer.map((image, i) =>
                                <Slide key={image.id} tag="a" index={i}>
                                    {this.props.displayImage(image, 'image')}
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
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(ImagesModal);
