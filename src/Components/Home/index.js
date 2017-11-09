import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import ProgressLoader from '../ProgressLoader/index.js';
import VideoContainer from '../VideoContainer/index.js';
import YoutubeService from '../../Services/youtube';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
          videos: [],
          loading: false 
        };
        this._youtubeService = new YoutubeService();
        this._nextPageToken = null;
      }
    
      componentWillMount() {
        this.setState({ loading: true });

        this._youtubeService.executeSearchQuery({})
        .then((data) => {
          console.log('data: ' + JSON.stringify(data));
          this._nextPageToken = data.nextPageToken || null;
          this.setState({
            videos: data.videos,
            loading: false
          });
        });
      }
    
      render() {
        return (
          <div className="Home">
                {this.state.loading ? <ProgressLoader loading={this.state.loading}/>
                : <VideoContainer videos={this.state.videos}/>}
          </div>
        );
      }
}