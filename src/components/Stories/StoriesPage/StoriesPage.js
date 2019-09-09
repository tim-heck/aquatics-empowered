import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';
import LandingPageModal from '../../LandingPageModal/LandingPageModal';
import MobileNav from '../../Menus/MobileNav/MobileNav';
import DefaultCard from '../DefaultCard/DefaultCard';

import { Card, Icon, Image, Button } from 'semantic-ui-react'
import '../StoriesPage.css'


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

    render() {
        return (
            <>
                {/* <LandingPageModal /> */}
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
