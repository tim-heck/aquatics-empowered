import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image, Button } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class StoryCard extends Component {

    componentDidMount() {

    }

    render() {
        return (
            <>
                <Card>
                    {/* <Image src={this.props.story.} wrapped ui={false} /> */}
                    <Card.Content>
                        <Card.Header>{this.props.story.title}<a className="flag" href="/"><Icon name="flag" /></a></Card.Header>
                        <Card.Meta>
                            {this.props.story.name}
                        </Card.Meta>
                        <Card.Meta>
                            <span className="location">{this.props.story.location}</span>
                        </Card.Meta>
                        <Card.Meta>
                            <span>{this.props.story.category}</span>
                        </Card.Meta>
                        <Card.Description className="description">
                            {this.props.story.message}
                        </Card.Description>
                    </Card.Content>
                    <Card.Content extra>
                        <Button basic>
                            View Story
                        </Button>
                    </Card.Content>
                </Card>
            </>
        )
    }
}

export default connect()(StoryCard);
