import React, { Component } from 'react';
import autobind from 'react-autobind';
import {Grid, Row, Col, Image, Button, Thumbnail} from 'react-bootstrap';

function _generateUserProfileUrl(userName) {
    return `https://youtube.com/user/${userName}`;
} 

function _generateVideoUrl(videoId) {
    return `https://youtube.com/video/${videoId}`;
}

export default class SurfVideo extends Component {

    constructor(props) {
        super(props);
        autobind(this);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <Thumbnail href={_generateVideoUrl(this.props.url)} src={this.props.thumbnailUrl}>
                            <h3>{this.props.title}</h3>
                            <a href={_generateUserProfileUrl(this.props.author)}></a>
                        </Thumbnail>
                    </Col>
                </Row>
            </Grid>
        )
    }
}