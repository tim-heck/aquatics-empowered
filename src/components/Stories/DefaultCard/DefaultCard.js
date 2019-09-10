import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Button } from 'semantic-ui-react';

class DefaultCard extends Component {

    render() {
        return (
            <>
                <Card className="default-card">
                    <Card.Content>
                        <Card.Header>We need your story!</Card.Header>
                        <Card.Description>
                            We want to hear your story about how aquatic therapy has affected you or someone you know!<br /><br />
                            <strong>Click the "+" below <br />to share a story!</strong>
                        </Card.Description>
                    </Card.Content>
                    <Button className="plus-button" basic onClick={this.props.directToStoryForm}>
                        +
                    </Button>
                    <Card.Content className="mobile-call-to-scroll">
                        <Card.Description>
                            Scroll to read other's stories!
                        </Card.Description>
                    </Card.Content>
                </Card>
            </>
        );
    }
}

const stateToProps = (reduxStore) => ({
    reduxStore
})

export default connect(stateToProps)(DefaultCard);
