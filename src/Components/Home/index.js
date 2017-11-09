import React, { Component } from 'react';
import VideoContainer from '../VideoContainer';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
      }
    
      render() {
        return (
          <div className="Home">
                <VideoContainer/>
          </div>
        );
      }
}