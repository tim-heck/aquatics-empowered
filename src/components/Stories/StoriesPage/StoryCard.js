import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Card, Icon, Image } from 'semantic-ui-react'
import 'semantic-ui-css/semantic.min.css'

class StoryCard extends Component {

    render() {
        return (
            <>
                <Card>
                    <Image src='images/stay-greasy-t-shirt-black-12.png' wrapped ui={false} />
                    <Card.Content>
                        <Card.Header>John Doe<a className="flag" href="/"><Icon name="flag" /></a></Card.Header>
                        <Card.Meta>
                            <span className="location">Minneapolis, MN</span>
                        </Card.Meta>
                        <Card.Description>
                            Matthew is a musician living in Nashville. Matthew is a musician living in Nashville.
                            Matthew is a musician living in Nashville. Matthew is a musician living in Nashville.
                        </Card.Description>
                    </Card.Content>
                </Card>
            </>
        )
    }
}

export default connect()(StoryCard);
