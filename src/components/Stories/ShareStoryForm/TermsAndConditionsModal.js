import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Icon, Button, Header, Modal } from 'semantic-ui-react'

class TermsAndConditionsModal extends Component {

    render() {
        return (
            <>
                <Modal className="story-modal" open={this.props.showModal} centered={false}>
                    <Icon name="close" onClick={this.props.close} />
                    <Header content="Terms and Conditions for Photo Use" />
                    <Modal.Content>
                        {/* <h3>Terms and Conditions for Photo Us<Icon name="flag" onClick={() => this.props.flagStory(this.props.story)} /></h3> */}
                        <p className="modal-message">
                            In consideration of the engagement as a photo model upon the terms herewith stated, I, hereby give Aquatics 
                            Empowered, their heirs, legal representatives and assigns,
                            <br /><br />
                            a) the unrestricted right and permission to copyright and use, re-use, publish, and republish photographic 
                            portraits or pictures of myself and/or related personal property, which may be included intact or in part, 
                            composite or distorted in character or form, without restriction as to changes, transformations or 
                            reproduction hereof in color or otherwise, made through any and all media now or hereafter known for 
                            illustration, art, promotion, advertising, trade, or any other purpose whatsoever.
                            <br /><br />
                            b) I also permit the use of any printed material in connection therewith.
                            <br /><br />
                            c) I hereby relinquish any right that I may have to examine or approve the completed product or 
                            products or the advertising copy or printed matter that may be used in conjunction therewith or 
                            the use to which it may be applied.
                            <br /><br />
                            d) I hereby release, discharge and agree to hold harmless Aquatics Empowered, Officers, employees, 
                            photographer, agents, legal representatives or assigns, and all persons functioning under their 
                            permission or authority, or those for whom he/she is functioning, from any liability by virtue of 
                            any usage, blurring, distortion, alteration, optical illusion, or use in composite form whether 
                            intentional or otherwise, that may occur or be produced in the taking of said picture(s) or in any 
                            subsequent processing thereof, as well as any publication thereof, including without limitation any 
                            claims for libel or invasion of privacy.
                            <br /><br />
                            e) I hereby affirm that I am over the age of majority and have the right to contract in my own name.  
                            I have read the above authorization, release and agreement, prior to its execution; I fully understand 
                            the contents thereof. This agreement shall be binding upon me and my heirs, legal representatives and assigns.
                        </p>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button basic onClick={this.props.close}>
                            Back to Story Form
                        </Button>
                    </Modal.Actions>
                </Modal>
            </>
        )
    }
}

export default TermsAndConditionsModal;
