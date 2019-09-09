import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';
import LandingPageModal from '../../LandingPageModal/LandingPageModal';
import MobileNav from '../../Menus/MobileNav/MobileNav';

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
                    <Card className="default-card">
                        <Card.Content>
                            <Card.Header>We need your story!</Card.Header>
                            <Card.Description>
                                We want to hear your story about how aquatic therpy has affected you or someone you know!
                                Click the "+" below to share a story!
                            </Card.Description>
                        </Card.Content>
                        <Button className="plus-button" basic onClick={this.directToStoryForm}>
                            +
                        </Button>
                    </Card>
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
