import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react'
import CsvDownloader from 'react-csv-downloader';


class Csv extends Component {


    state = {
        emails: '',
    }

    handleEmailsClick = () => {
        console.log('clicked emails')
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
                <CsvDownloader>
                    <button onClick={this.handleEmailsClick} >Download Emails</button>
                    
                </CsvDownloader>
                
            </>
        )
    }
}

export default connect()(Csv);
