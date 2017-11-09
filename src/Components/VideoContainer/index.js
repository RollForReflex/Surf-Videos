import React, { Component } from 'react';
import autobind from 'react-autobind';
import {Grid, Row, Col, Image, Button, Thumbnail} from 'react-bootstrap';
import SurfVideo from '../SurfVideo';


export default class VideoContainer extends Component {
    constructor(props) {
        super(props);
        console.log('Props: ' + JSON.stringify(this.props));
        autobind(this);
    }

    render() {
        return (
            <Grid>
                <Row>
                    <Col xs={6} md={4}>
                        <pre>{JSON.stringify(this.props.videos) }</pre>
                        {this.props.videos.map(video => (
                            <SurfVideo video={video}/>
                        ))}
                    </Col>
                </Row>
            </Grid>
        )
    }
}