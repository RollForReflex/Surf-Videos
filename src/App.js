import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import Header from './Components/Header';
import Home from './Components/Home';
import Details from './Components/VideoDetails';
import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/videos/:videoId/details" component={Details}/>
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
