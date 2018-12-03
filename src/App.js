import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

/*Material UI Components*/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme, themesJSON } from './themes';

/*React Router*/
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';
import Auth from './auth';

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
import Login from './components/Login';

class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      clipped: false,
      themes: theme,
      active_theme: theme["std_light_theme"], //STD Theme
      active_theme_name: "std_light_theme",
      auth: new Auth("demo", "demo", "demo", "demo"),
    }

    console.log(this.state.active_theme);
    console.log(theme);
  };

  getWorkingArea = () => {
    if (this.state.clipped == true) {
      return "clippedArea";
    }
  }

  setSettings = (settings) => {
    this.setState(settings);
  }

  setAuth = (obj) => {
    this.setState({ auth: obj });
  }

  render() {
    if (this.state.auth == false && !window.location.href.includes("/Login")) {
      window.location = "/Login";
      return;
    }

    return (
      <BrowserRouter>
        <MuiThemeProvider theme={this.state.active_theme}>
          {this.state.auth != undefined &&
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
                  <Route path="/Settings" component={() => (<Settings
                    getSettings={this.state}
                    setSettings={this.setSettings} />)} />
                  <Route path="/LegalNotice" component={LegalNotice} />
                  <Route path="/Profile" component={Profile} />
                  <Route path="/Login" component={() => (<Login
                    setAuth={this.setAuth}
                    getAuth={this.state.auth} />)} />

                  <Route component={NotFound} />

                </Switch>
              </div>
            </div>
          } {this.state.auth == undefined &&
            <div className="App">
              <div className={this.getWorkingArea()} >
                <Switch>
                  <Route component={() => (<Login
                    setAuth={this.setAuth}
                    getAuth={this.state.auth} />)} />
                </Switch>
              </div>
            </div>
          }
        </MuiThemeProvider>
      </BrowserRouter >
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
