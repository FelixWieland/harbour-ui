import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

/*Material UI Components*/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

/*React Router*/
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*Own Components*/
import Navbar from './components/Navbar'
import Dashboard from './components/Dashboard'
import Repositories from './components/Repositories'
import Services from './components/Services'
import BugTracker from './components/BugTracker'
import Profile from './components/Profile'
import Inbox from './components/Inbox'
import Settings from './components/Settings'
import LegalNotice from './components/LegalNotice'
import NotFound from './components/NotFound'
import Development from './components/Development';

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2294F3',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#20B6B0',
      main: '#2294F3',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clipped: false,
    }
  };

  getWorkingArea = () => {
    if (this.state.clipped == true) {
      return "clippedArea";
    }
  }

  render() {
    return (
      <BrowserRouter>
        <MuiThemeProvider theme={theme}>
          <div className="App">
            <Navbar clipped={this.state.clipped} />
            <div className={this.getWorkingArea()} >
              <Switch>
                <Route path="/" component={Dashboard} exact />

                <Route path="/Dashboard" component={Dashboard} />
                <Route path="/Repositories" component={Repositories} />
                <Route path="/Services" component={Services} />
                <Route path="/BugTracker" component={BugTracker} />
                <Route path="/Development" component={Development} />
                <Route path="/Profile" component={Profile} />
                <Route path="/Inbox" component={Inbox} />
                <Route path="/Settings" component={Settings} />
                <Route path="/LegalNotice" component={LegalNotice} />
                <Route path="/Profile" component={Profile} />

                <Route component={NotFound} />
              </Switch>
            </div>
          </div>
        </MuiThemeProvider>
      </BrowserRouter>
    );
  }
}

/*
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
*/

export default App;
