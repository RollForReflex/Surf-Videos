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
            <Thumbnail href={_generateVideoUrl(this.props.video.videoId)} src={this.props.video.thumbnailUrl}>
                <h3>{this.props.video.title}</h3>
                <a href={_generateUserProfileUrl(this.props.video.author)}>{this.props.video.author}</a>
            </Thumbnail>
        )
    }
}