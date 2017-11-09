import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import logo from './logo.svg';
import ProgressLoader from './Components/ProgressLoader/index.js';
import './App.css';
import YoutubeService from './Services/youtube/index.js';

class App extends Component {
  constructor() {
    super();
    let youtubeService = new YoutubeService();
    let cats;
    youtubeService.getVideoUploadsByChannelId('UCX6b17PVsYBQ0ip5gyeme-Q')
      .then((data) => {
        console.log('data: ' + JSON.stringify(data));
      });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and eat shorts
        </p>

        <div class='buttonStuff'>
          <Button bsStyle='primary' bsSize='large'>Click me Yo!</Button>
          <ProgressLoader loading='true'/>
        </div>
      </div>
    );
  }
}

export default App;
