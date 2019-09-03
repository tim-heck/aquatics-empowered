import React, { Component } from 'react';
import { connect } from 'react-redux';

import StoryCard from './StoryCard';

import { Card } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'
import '../StoriesPage.css'


class StoriesPage extends Component {

    render() {
        return (
            <>
                <Card.Group centered>
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                    <StoryCard />
                </Card.Group>
            </>
        )
    }
}

export default connect()(StoriesPage);
