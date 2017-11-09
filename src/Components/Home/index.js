import React, { Component } from 'react';
import VideoContainer from '../VideoContainer';
import SearchBar from '../SearchBar';
import autobind from 'react-autobind';
import YoutubeService from '../../Services/youtube';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        autobind(this);

        this.state = {
          videos: [],
          loading: true,
          searchTerm: ''
        };

        this._youtubeService = new YoutubeService();
      }

    handleSearchExecuted(searchTerm) {
      this._loadVideos({queryParams: [searchTerm]})
        .then((videoData) => {
          this.setState({videos: videoData.videos, nextPageToken: videoData.nextPageToken, searchTerm: searchTerm, loading: false});
        });
    }

    componentWillMount() {
      this.setState({ loading: true });
      this._loadVideos({queryParams: [this.state.searchTerm]})
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

            this.setState({loading: true});
            this._loadVideos({nextPageToken: this.state.nextPageToken})
                .then((videoData) => {
                    this.setState({videos: this.state.videos.concat(videoData.videos), nextPageToken: videoData.nextPageToken, loading: false});
                });
        }
    }
    
    render() {
      return (
        <div className="Home">
          <SearchBar onSearch={this.handleSearchExecuted}/>
          <VideoContainer videos={this.state.videos}/>
        </div>
      );
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