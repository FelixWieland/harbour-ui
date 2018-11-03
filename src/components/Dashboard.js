import React, { Component } from 'react';

/*Material UI Components*/
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import Grid from '@material-ui/core/Grid';


/*Own Components*/

const styles = theme => ({
    root: {
        flexGrow: 1,
    },
    paper: {
        height: 140,
        width: 100,
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    card: {
        minWidth: 350,
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
});

const dashboardAPI = "dashboard-api.json";

class GuttersGrid extends React.Component {
    state = {
        spacing: '16',
    };

    constructor(props) {
        super(props);
    }

    componentDidMount = () => {
        /*fetch(sideMenuApi)
            .then(response => response.json())
            .then(data => this.setState({ data }));*/
        import('../' + dashboardAPI).then(
            res => this.setState({ dashboardAPI: res }),
        );
    };

    getDashboardData = () => {
        try {
            return this.state.dashboardAPI.default.boards;
        } catch {
            return [];
        }
    };

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        return (
            <Grid container className={classes.root} spacing={16}>
                <Grid item xs={12}>
                    <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                        {this.getDashboardData().map((value, index) => (
                            <Grid key={index} item>
                                <Card className={classes.card}>
                                    <CardContent>
                                        <Typography className={classes.title} color="textSecondary" gutterBottom>
                                            {value.name}
                                        </Typography>
                                        <Typography variant="h5" component="h2">
                                            {value.type}
                                        </Typography>
                                    </CardContent>

                                </Card>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        );
    }
}

/*
<CardActions>
    <Button size="small">Learn More</Button>
</CardActions>
*/

GuttersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);