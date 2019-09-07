import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'



class Csv extends Component {

    state = {
        emails: '',
    }

    handleEmailsClick = () => {
        console.log('clicked download emails')
        this.props.dispatch({
            type: 'FETCH_EMAILS',
            payload: this.state,
        })
        this.setState({
            emails: '',
        })
    }

    render() {
        return (
            <>
                <div>
                    
                </div>
               
                    <button onClick={this.handleEmailsClick}>Download Emails</button>

               
                
            </>
        )
    }
}

export default connect()(Csv);
