import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';

/*Material UI Components*/
import Button from '@material-ui/core/Button';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';

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

const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: '#2294F3',
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      light: '#0066ff',
      main: '#3834F5',
      // dark: will be calculated from palette.secondary.main,
      contrastText: '#ffcc00',
    },
    // error: will use the default color
  },
});


class App extends Component {

  state = {
    active_Page: <Repositories />
  }

  constructor(props) {
    super(props);
    this.change_Page = this.change_Page.bind(this);
  };

  change_Page = (page) => {
    switch (page) {
      case "Dashboard":
        this.setState({ active_Page: <Dashboard /> })
        break;
      case "Repositories":
        this.setState({ active_Page: <Repositories /> })
        break;
      case "Services":
        this.setState({ active_Page: <Services /> })
        break;
      case "BugTracker":
        this.setState({ active_Page: <BugTracker /> })
        break;
      case "Profile":
        this.setState({ active_Page: <Profile /> })
        break;
      case "Inbox":
        this.setState({ active_Page: <Inbox /> })
        break;
      case "Settings":
        this.setState({ active_Page: <Settings /> })
        break;
      case "LegalNotice":
        this.setState({ active_Page: <LegalNotice /> })
        break;
    }
  }

  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <div className="App">
          <Navbar change_Page={this.change_Page} />
          {this.state.active_Page}
        </div>
      </MuiThemeProvider>
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
