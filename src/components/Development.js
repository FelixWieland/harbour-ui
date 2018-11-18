import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

/*React Router*/
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*Own Components*/
import DevBlackBoard from './Development/DevBlackBoard';
import TerminalBar from './Development/TerminalBar';
import WebIDE from './Development/WebIDE';

import Git from '../logic/ide/git';

const styles = {

};

class Development extends React.Component {

    constructor() {
        super();
        var usrObj = Git;
    }

    //<TerminalBar />
    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/Development/" component={DevBlackBoard} exact />
                    <Route path="/Development/IDE" component={WebIDE} exact />
                </Switch>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Development);