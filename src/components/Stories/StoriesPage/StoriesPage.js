import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';
import LandingPageModal from '../../LandingPageModal/LandingPageModal';

import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../StoriesPage.css'


class StoriesPage extends Component {

    componentDidMount() {
        this.props.dispatch({ type: 'FETCH_STORIES' });
        this.props.dispatch({ type: 'FETCH_USER' });
    }

    redirectToEditPage = () => {
        this.props.history.push('/edit-story');
    } 

    render() {
        return (
            <>
                <LandingPageModal />
                <Card.Group centered>
                    {this.props.reduxStore.stories.storiesReducer.map(item => 
                        <StoryCard key={item.id} story={item} redirectToEditPage={this.redirectToEditPage}/>
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
