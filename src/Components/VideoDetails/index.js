import React, { Component } from 'react';
import autobind from 'react-autobind';
import {Grid, Row, Col, Image, Button, Thumbnail} from 'react-bootstrap';

export default class VideoDetails extends Component {

    constructor(props) {
        super(props);
        autobind(this);
    }

    render() {
        return (
            <div>Details go here!</div>
        )
    }
}