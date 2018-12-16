import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

/*Own Components*/

const styles = {
    root: {
        flexGrow: 1,
        paddingLeft: 5,
        paddingRight: 5
    }
};

class LegalNotice extends React.Component {

    render() {

        const { classes } = this.props;

        return (
            <div className={classes.root}>
                Legal Notice
            </div >
        );
    }
}

export default withStyles(styles)(LegalNotice);