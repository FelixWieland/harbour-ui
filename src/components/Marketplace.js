import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

/*Own Components*/

const styles = theme => ({

});

class Marketplace extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            spacing: '16',
        }
    }

    render() {

        const { classes } = this.props;
        const { spacing } = this.state;

        let recentModules = () => {
            return (
                <Grid container className={classes.root} spacing={16} justify="center">
                    <Grid item xs={12} md={12} sm={6} lg={6}>
                        <p>test</p>
                    </Grid>
                    <Grid item xs={6} md={6} sm={3} lg={3}>
                        <p>test</p>
                    </Grid>
                    <Grid item xs={6} md={6} sm={3} lg={3}>
                        <p>test</p>
                    </Grid>
                </Grid>
            );
        }

        return (
            <React.Fragment>
                {recentModules()}
                <p><br></br><br></br><br></br>Marketplace</p>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(Marketplace);