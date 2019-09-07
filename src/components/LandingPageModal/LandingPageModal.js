import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

class LandingPageModal extends Component {

    // THIS COMPONENT NEEDS A SESSION COOKIE INTEGRATED TO 
    // PREVENT MODAL FROM APPEARING AFTER FIRST SESSION

    state = {
        active: true,
    }

    onCloseModal = () => {
        this.setState({
            active: false
        })
    }

    // >UNTESTED< These functions are not used - history.push method routing >UNTESTED<
    // aboutAEButton =()=> {
    //     this.props.history.push('/aquatics-empowered-about')
    // }

    // aboutHFHButton = () => {
    //     this.props.history.push('/hot-tubbing-for-hope-about')
    // }

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
                        {/*????? NEED TO CHANGE IMAGE HERE TO DIFFERENT IMAGE, POSSIBLY ART OR POSTER FOR EVENT???? */}

                        <Image size="medium"
                            src="http://aquaticsempowered.org/wp-content/uploads/2019/07/hot-tubbing-for-hope.jpg" />

                        <Modal.Description>
                            <Header>Hot Tubbing For Hope! 11/15/19 - 11/17/19</Header>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={this.onCloseModal}>
                            Head To Stories <Icon name="chevron right" />
                        </Button>
                        {/* >UNTESTED< THE CODE BELOW IS A BEGINNING TO ADD HISTORY.PUSH METHOD ROUTING TO ABOUT PAGES >UNTESTED< */}
                        {/* <Button emphasis="negative" onClick={this.aboutAEButton}
                                >Learn about Aquatics Empowered</Button>
                        <Button emphasis="negative" onClick={this.aboutHFHButton}
                                >Learn about Hot Tubbing For Hope</Button> */}
                    </Modal.Actions>
                </Modal>

            </>
        )
    }
}


export default connect()(LandingPageModal);