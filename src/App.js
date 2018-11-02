import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

/*Material UI Components*/
import Button from '@material-ui/core/Button';

/*Own Components*/
import Navbar from './components/Navbar'

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            Edit <code>src/App.js</code> and save to reload. Please work.
          </p>
          <Button variant="contained" color="primary">
            Hello World
          </Button>
          <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">Learn React</a>
        </header>
      </div>
    );
  }
}

export default App;
