import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

/*Own Components*/

const styles = {

};

class BugTracker extends React.Component {

    render() {
        return (
            <p><br></br><br></br><br></br>Bug Tracker</p>
        );
    }
}

export default withStyles(styles)(BugTracker);