import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

/*React Router*/
import { BrowserRouter, Route, Switch } from 'react-router-dom';

/*Own Components*/
import DevBlackBoard from './Development/DevBlackBoard';
import TerminalBar from './Development/TerminalBar';

const styles = {

};

class Development extends React.Component {

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path="/Development/" component={DevBlackBoard} exact />
                </Switch>
                <TerminalBar />
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Development);