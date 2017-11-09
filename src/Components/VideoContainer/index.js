import React, { Component } from 'react';
import {Grid} from 'react-bootstrap';
import SurfVideo from '../SurfVideo';


export default class VideoContainer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let videos = this.props.videos;

        return (
            <Grid>
                {  
                    Object.keys(videos).map((videoIndex) => (
                        <SurfVideo key={videoIndex} video={videos[videoIndex]}/>
                    ))
                }
            </Grid>
        )
    }
}