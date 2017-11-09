import React, { Component } from 'react';
import autobind from 'react-autobind';
import {LinkContainer} from 'react-router-bootstrap';
import {Link} from 'react-router-dom';
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
        let videoLinkString = `/videos/${this.props.video.videoId}/details`;

        return (
            <Link to={videoLinkString}>
                <Thumbnail src={this.props.video.thumbnailUrl}>
                    <h3>{this.props.video.title}</h3>
                    <p>{this.props.video.description}</p>
                </Thumbnail>
            </Link>
        )
    }
}