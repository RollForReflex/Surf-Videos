import React, { Component } from 'react';
import {Grid, Row, Col} from 'react-bootstrap';
import SurfVideo from '../SurfVideo';
import autobind from 'react-autobind';
import YoutubeService from '../../Services/youtube';


export default class VideoContainer extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
            videos: [],
            loading: false,
            nextPageToken: null 
          };
        this._youtubeService = new YoutubeService();
    }

    componentWillMount() {
        this.setState({ loading: true });
        this._loadVideos({})
            .then((videoData) => {
                this.setState({videos: this.state.videos.concat(videoData.videos), nextPageToken: videoData.nextPageToken, loading: false});
            });
    }

    componentDidMount() {
        window.addEventListener('scroll', this.onScroll, false);
    }

    componentWillUnmount() {
        window.removeEventListener('scroll', this.onScroll, false);
    }

    onScroll() {
        if ((window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 200) && this.state.videos.length) {
            if(this.state.loading){
                return;
            }

            this.setState({isInfiniteLoading: true});
            this._loadVideos({nextPageToken: this.state.nextPageToken})
                .then((videoData) => {
                    this.setState({videos: this.state.videos.concat(videoData.videos), nextPageToken: videoData.nextPageToken, loading: false});
                });
        }
      }

    render() {
        let videos = this.state.videos;

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

    _loadVideos(options) {
        return new Promise((resolve, reject) => {
            this._youtubeService.executeSearchQuery(options)
                .then((data) => {
                    return resolve(data);
                })
                .catch((err) => {
                    return reject(err);
                });
        })
    }
}