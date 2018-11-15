import React, { Component } from 'react';

/*Material UI Components*/
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';

/*Own Components*/

const styles = theme => ({
    text: {
        paddingTop: theme.spacing.unit * 2,
        paddingLeft: theme.spacing.unit * 2,
        paddingRight: theme.spacing.unit * 2,
    },
    paper: {
        paddingBottom: 50,
    },
    list: {
        marginBottom: theme.spacing.unit * 2,
    },
    subHeader: {
        backgroundColor: theme.palette.background.paper,
    },
    appBar: {
        top: 'auto',
        bottom: 0,
    },
    toolbar: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    fabButton: {
        position: 'absolute',
        zIndex: 1,
        top: -30,
        left: 0,
        right: 0,
        backgroundColor: 'white',
        color: 'grey',
        margin: '0 auto',
    },
});

class TerminalBar extends React.Component {

    render() {
        const { classes } = this.props;

        return (
            <div>
                <AppBar position="fixed" color="primary" className={classes.appBar}>
                    <Toolbar variant="dense" className={classes.toolbar}>
                        <Button variant="fab" color="secondary" aria-label="Add" className={classes.fabButton}>
                            <Icon>add</Icon>
                        </Button>
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}


TerminalBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(TerminalBar);