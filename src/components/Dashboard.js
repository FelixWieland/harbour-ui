import React, { Component } from 'react';

/*Material UI Components*/
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import LoadBar from './LoadBar'

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
    card_small: {
        minWidth: 200,
    },
    card_medium: {
        minWidth: 350,
    },
    card_large: {
        minWidth: 500,
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
        setLoadBar: undefined,
        loadState: 0,
    };

    constructor(props) {
        super(props);
        this.setState({ loadState: 10 })
    }

    getCardSize = (size) => {
        switch (size) {
            case "small": return this.props.card_small;
            case "medium": return this.props.card_medium;
            case "large": return this.props.card_large;
        }
    }

    componentDidMount = () => {
        /*fetch(sideMenuApi)
            .then(response => response.json())
            .then(data => this.setState({ data }));*/
        this.setState({ loadState: 15 })
        import('../' + dashboardAPI).then(
            res => this.setState({
                dashboardAPI: res,
                loadState: 100
            }),
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
            <React.Fragment>
                <LoadBar state={this.state.loadState} />
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                            {this.getDashboardData().map((value, index) => (
                                <Grid key={index} item>
                                    <Card className={this.getCardSize(value.size)}>
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
            </React.Fragment>
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