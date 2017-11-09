import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import logo from './logo.svg';
import Header from './Components/Header';
import Home from './Components/Home';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Header/>
        <main>
          <Switch>
            <Route exact path="/" component={Home}/>
            {/* <Route path="/about" component={About}/> */}
          </Switch>
        </main>
      </div>
    );
  }
}

export default App;
