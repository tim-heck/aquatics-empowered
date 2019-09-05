import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Button } from 'semantic-ui-react';
import 'semantic-ui-css/semantic.min.css';

class AdminCategoriesPage extends Component {

    componentDidMount = () => {
        this.props.dispatch({
            type: 'FETCH_FLAGGED_STORIES',
        })
    }



    handleCategoriesClick = (event) => {
        this.props.history.push('/admin-categories')
    }


    render() {
        return (
            <>
                <p>Click a button below to toggle between Categories and Flagged Posts</p>
                <Button Primary onClick={this.handleCategoriesClick}>Categories </Button><Button Primary>Flagged</Button >
                <br />
                <h1> Flagged Posts </h1>
                <ul>
                    {this.props.store.stories.flaggedStoriesReducer.map(story => {
                    return <li key={story.id}>
                    <h3>"{story.title}" by {story.name}</h3>
                    <button>VIEW</button>
                    </li>   
                    })}
                </ul>   
            </>
        )
    }
}

const mapStateToProps = (store) => ({
    store
});

export default connect(mapStateToProps)(AdminCategoriesPage);
