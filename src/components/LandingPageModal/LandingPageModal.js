import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';

const setCookie = () => {
   // this d variable is setting the expiration of the cookie created
   // the current cookie lifespan is set to 7 days
    let d = new Date();
        d = new Date(d.getTime() + 1000*60*60*24*7)
    document.cookie = 'visited=true; expires='+d.toGMTString()+';';
    

}

const getCookie = (cookieName) => {
    // Get name and all data following the specified cookie
    const cookieString = RegExp('' + cookieName ).exec(document.cookie);
    
    // Get name followed by anything except a semicolon <believe this breaks, doesn't pass info further>
    // const cookieString = RegExp('' + cookieName + '[^;]+').exec(document.cookie);
    // Return everything after the equal sign, or an empty string if the cookie name not found

    return decodeURIComponent(!!cookieString ? cookieString.toString().replace(/^[^=]+./, '') : '');
}

class LandingPageModal extends Component {

    componentDidMount(){

        // Calls the setCookie function declared above the class component
        setCookie();

        // Calls the getCookie function with the name of our new cookie as parameter
        getCookie('visited');
        // This gets the session cookie we set up for the user;
        // cookie is used to trigger modal window being hidden while in session

        // console.log('cookie info', getSpecificCookie('visited') );
        
         
    }

    state = {
        active: true,
        visited: getCookie( 'visited' ) || false,

    }

    onCloseModal = () => {
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
                    </Modal.Actions>
                </Modal>

            </>
        )
    }
}


export default connect()(LandingPageModal);