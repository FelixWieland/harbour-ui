import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

/*Material UI Components*/
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import { theme, themesJSON } from './themes';

/*React Router*/
import { BrowserRouter, Route, Switch, withRouter, Redirect } from 'react-router-dom';

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
import Marketplace from './components/Marketplace';
import Usermanagement from './components/Usermanagement';
import Chatbar from './components/Chatbar';
import ModuleLoader from './ModuleLoader';


class App extends Component {

  constructor(props) {
    super(props);

    this.modules = {};
    this.state = {
      clipped: 'temporary', //"permanent (not fully working)","persistent (not fully working)","temporary"
      themes: theme,
      active_theme: theme["harbour_basic_theme"], //STD Theme
      active_theme_name: "harbour_basic_theme",
      paddingTop: "56px",
      navbar: {
        visibility: true,
      }
    }
  };

  componentDidMount = () => {
    require("./moduleAPI.json").modules.map((value, index) => {
      this.modules[value.name] = require("./components/" + value.path + "/Root");
    });
  };

  modulesLoaded = () => {
    console.log(this.modules)
  }

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

    if (window.sessionStorage.getItem('auth') != undefined) {
      return (
        <BrowserRouter>
          <MuiThemeProvider theme={this.state.active_theme}>
            <div className="App" style={{ paddingTop: this.state.paddingTop }}>
              <Navbar invisible={this.state.navbar.visibility} clipped={this.state.clipped} />
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

                  <Route path="/:User/Profile" component={Profile} />

                  <Route path="/Usermanagement" component={Usermanagement} />
                  <Route path="/Marketplace" component={Marketplace} />


                  <Route path="/Modules" component={() => (<p>ModulePreview</p>)} exact />
                  <Route path="/Module/:Modulename" component={() => (<ModuleLoader />)} />

                  <Route component={NotFound} />
                </Switch>
              </div>
              <Chatbar />
            </div>
          </MuiThemeProvider>
        </BrowserRouter >
      );
    } else {
      return (
        <BrowserRouter>
          <MuiThemeProvider theme={this.state.active_theme}>
            <div className="App">
              <div className={this.getWorkingArea()} >
                <Switch>
                  <Route component={Login} />
                </Switch>
              </div>
            </div>
          </MuiThemeProvider>
        </BrowserRouter>
      );
    }
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
