import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

const setCookie = () => {
    // this d variable is setting the expiration of the cookie created
    // the current cookie lifespan is set to 7 days
    let d = new Date();
    d = new Date(d.getTime() + 1000 * 60 * 60 * 24 * 7)
    document.cookie = 'visited=true; expires=' + d.toGMTString() + ';';
}

class LandingPageModal extends Component {

    state = {
        active: true,
    }

    onCloseModal = () => {
        // Calls the setCookie function declared above the class component
        setCookie();
        this.setState({
            active: false
        })
    }

    render() {
        return (
            <>
                {/* THIS CODE IS BASED ON MODAL WINDOW EXAMPLES FROM SEMANTIC UI DOCS */}
                {/*     https://react.semantic-ui.com/      */}
                {/*  THANKS TO THEM FOR GREAT EXAMPLES THAT WERE RELEVANT :)  */}
                <Modal open={this.state.active}>
                    <Icon name="close" onClick={this.onCloseModal} />
                    <Modal.Header>Welcome to H2WHOA!</Modal.Header>
                    <Modal.Content image>
                    <Image size="medium"
                            src="http://aquaticsempowered.org/wp-content/uploads/2019/07/hot-tubbing-for-hope.jpg" />
                        <Modal.Description>
                            <Header>H2WHOA! The official App for Hot Tubbing For Hope!</Header>
                            <p> H2WHOA! is a social media platform that serves as a centralized location for the sharing of stories of aquatic therapy and its many benefits!</p>
                            <a href="http://aquaticsempowered.org/hot-tubbing-for-hope/">Hot Tubbing For Hope! </a>
                            <br />
                            <br />
                            <p> Come share your story with us, and see all the stories others have shared!</p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={this.onCloseModal}>
                            Head To Stories <Icon name="chevron right" />
                        </Button>
                    </Modal.Actions>
                </Modal>

            </>
        )
    }
}


export default connect()(LandingPageModal);