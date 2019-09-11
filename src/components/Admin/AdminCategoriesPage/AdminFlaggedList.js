import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import './AdminPages.css';

class AdminCategoriesPage extends Component {

    // On component load, call a Saga that GETS all flagged stories
    componentDidMount = () => {
        this.props.dispatch({ type: 'FETCH_FLAGGED_STORIES' });
    }

    // When user clicks Categories button, load the AdminCategoriesPage component
    handleCategoriesClick = (event) => {
        this.props.history.push('/admin-categories')
    }

    // When user clicks edit, sends the story information to a reducer
    // Then load the AdminEditStoryView component page
    editFlaggedStory = (story) => {
        this.props.dispatch({ type: 'EDIT_STORY', payload: story });
        this.props.history.push('/edit-story');
    }

    render() {
        return (
            <div className="form-container">
                <h1>Administration</h1>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button primary onClick={this.handleCategoriesClick}>Categories</Button><Button primary>Flagged</Button >
                <br />
                <h1>Flagged Posts</h1>
                <ul className="flagged-list">
                    {this.props.store.stories.flaggedStoriesReducer.map(story => {
                        return <li key={story.id}>
                            <h3>"{story.title}" by {story.name}</h3>
                            <Button onClick={() => this.editFlaggedStory(story)}>View</Button>
                        </li>
                    })}
                </ul>
            </div>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);