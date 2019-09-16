import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';
import LandingPageModal from '../../LandingPageModal/LandingPageModal';
// import MobileNav from '../../Menus/MobileNav/MobileNav';
import DefaultCard from '../DefaultCard/DefaultCard';

import { Card } from 'semantic-ui-react'
import '../StoriesPage.css'

// this function is from ::> https://stackoverflow.com/questions/28306186/how-to-call-to-a-specific-cookie-in-js
// function loops through cookies and parses the loop
function getSpecificCookie(cookieName, value) {
    //Get original cookie string
    var cookieArray = document.cookie.split(';'),
        fc,
        cookieNameRegEx = new RegExp(cookieName + '');
    //Loop through cookies
    for (let c = 0; c < cookieArray.length; c++) {

        //If found save to variable and end loop
        if (cookieNameRegEx.test( cookieArray[c] ) ) {
            fc = cookieArray[c].trim();
            if (value) {
                fc = fc.replace(cookieName + '=', '');
            }
            break;
        }

    }
    return fc;
}

let cookie = '';

class StoriesPage extends Component {
    
    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_STORIES' });
        this.props.dispatch({ type: 'FETCH_USER' });   
    }

    directToEditPage = () => {
        this.props.history.push('/edit-story');
    }

    directToStoryForm = () => {
        this.props.history.push('/share');
    }

    checkVisited = () => {
        cookie = getSpecificCookie('visited');
        if ( cookie !== 'visited=true') {
            return <LandingPageModal />
        }
    }

    render() {
        return (
            <>
                {this.checkVisited()}
                {/* <MobileNav /> */}
                <Card.Group centered>
                    <DefaultCard directToStoryForm={this.directToStoryForm} />
                    {this.props.reduxStore.stories.storiesReducer.map(item =>
                        <StoryCard key={item.id} story={item} directToEditPage={this.directToEditPage} />
                    )}
                </Card.Group>
            </>
        )
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
});

export default connect(stateToProps)(StoriesPage);
