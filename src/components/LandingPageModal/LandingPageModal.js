import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button, Header, Image, Modal, Icon } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css'

class LandingPageModal extends Component {


state = {
        active: true,

    }

    componentDidMount(){

        console.log(this.state.active);
        
    }

    onCloseModal =()=> {
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

            <div>
                <Modal open = {this.state.active} >

                    <Icon name="close" onClick={this.onCloseModal}/>

                            <Modal.Header className='modalHeader'>Welcome to H2WOAH!</Modal.Header>

                    <Modal.Content image>
                            
                            <Image size = "medium"
                           src = "http://aquaticsempowered.org/wp-content/uploads/2019/07/hot-tubbing-for-hope.jpg"/>
                        
                        <Modal.Description>
                            <Header>Hot Tubbing For Hope! 11/15/19 - 11/17/19</Header>
                            <p> Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                            </p>
                        </Modal.Description>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button primary onClick={this.onCloseModal}>
                            Head To Stories! <Icon name="chevron right" /> 
                        </Button>

            {/* >UNTESTED< THE CODE BELOW IS A BEGINNING TO ADD HISTORY.PUSH METHOD ROUTING TO ABOUT PAGES >UNTESTED< */}
                        
                        {/* <Button emphasis="negative" onClick={this.aboutAEButton}
                                >Learn about Aquatics Empowered</Button>
                        <Button emphasis="negative" onClick={this.aboutHFHButton}
                                >Learn about Hot Tubbing For Hope</Button> */}

                    </Modal.Actions>
                </Modal>
                    
            </div>

        )
    }

}



export default connect()(LandingPageModal);
