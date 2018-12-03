import React, { Component } from 'react';

/*Material UI Components*/
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Icon from '@material-ui/core/Icon'
import IconButton from '@material-ui/core/IconButton';

import LoadBar from './LoadBar'

import Grid from '@material-ui/core/Grid';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';


/*Own Components*/

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: 5,
        paddingRight: 5
    },
    paper: {
        height: "100%",
        width: "100%",
        position: "relative"
    },
    control: {
        padding: theme.spacing.unit * 2,
    },
    card_small: {
        maxWidth: "25%",
        height: 250,
        width: "100%",
        position: "relative",
        transition: "all .3s"
    },
    card_medium: {
        maxWidth: "50%",
        height: 250,
        width: "100%",
        position: "relative",
        transition: "all .3s"
    },
    card_large: {
        maxWidth: "100%",
        height: 250,
        width: "100%",
        position: "relative",
        transition: "all .3s"
    },
    card_extended: {
        height: "90vh",
        width: "100%",
        maxWidth: "100%",
        position: "relative",
        transition: "all .3s"
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    cardActionBar: {
        position: "absolute",
        bottom: 0,
        right: 0,
        width: "100%",
        height: 45,
        textAlign: "right",
    }
});

const dashboardAPI = "dashboard-api.json";

class GuttersGrid extends React.Component {
    state = {
        spacing: '16',
        setLoadBar: undefined,
        loadState: 0,
        deleteDialog: false,
        deleteID: undefined,
    };

    constructor(props) {
        super(props);
        this.setState({ loadState: 10 });
        this.extendBoard = this.extendBoard.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
    }

    componentDidMount = () => {
        /*fetch(sideMenuApi)
            .then(response => response.json())
            .then(data => this.setState({ data }));*/
        this.setState({ loadState: 15 })
        import('../' + dashboardAPI).then(
            res => this.setState({
                dashboardAPI: res,
                loadState: 100,
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

    getDashboardSizes = (size) => {
        switch (size) {
            case "small": return this.props.classes.card_small;
            case "medium": return this.props.classes.card_medium;
            case "large": return this.props.classes.card_large;
            case "extended": return this.props.classes.card_extended;
        }
    }

    extendBoard = (index) => {
        if (this.state.dashboardAPI.default.boards[index].size_copy == undefined) {
            this.state.dashboardAPI.default.boards[index].size_copy = this.state.dashboardAPI.default.boards[index].size;
        }
        if (this.state.dashboardAPI.default.boards[index].size == "extended") {
            this.state.dashboardAPI.default.boards[index].size = this.state.dashboardAPI.default.boards[index].size_copy;
        } else {
            this.state.dashboardAPI.default.boards[index].size = "extended";
        }

        this.forceUpdate();
    }

    deleteBoard = (id) => {
        for (var i = 0; i < this.state.dashboardAPI.default.boards.length; i++) {
            console.log(this.state.dashboardAPI.default.boards[i]);
        }
    }

    showHideDeleteDialog = (id) => {
        if (this.state.deleteDialog) {
            this.state.deleteDialog = false;
            this.state.deleteID = undefined;
        } else {
            this.state.deleteDialog = true;
            this.state.deleteID = id;
        }
        this.forceUpdate();
    }

    handleDialogUpdate = (what, id) => {
        if (what == "CLOSE") {
            this.state.deleteDialog = false;
            this.state.deleteID = undefined;
        } else if (what == "DELETE") {
            this.state.deleteDialog = false;
            this.deleteBoard(this.state.deleteID);
            //send delete Action to API
        }
        this.forceUpdate();
    }


    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        var deleteDialog = (id) => {
            return (
                <Dialog
                    open={this.state.deleteDialog}
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title">{"Board löschen?"}</DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">
                            Soll das Board "BLABLABLA" wirklich gelöscht werden?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => this.handleDialogUpdate("CLOSE", undefined)} color="primary">
                            Abbrechen
                            </Button>
                        <Button onClick={() => this.handleDialogUpdate("DELETE", id)} color="primary" autoFocus>
                            Löschen
                        </Button>
                    </DialogActions>
                </Dialog >
            );
        };

        return (
            <React.Fragment>
                <LoadBar state={this.state.loadState} />
                <Grid container className={classes.root} spacing={16}>
                    <Grid item xs={12}>
                        <Grid container className={classes.demo} justify="center" spacing={Number(spacing)}>
                            {this.getDashboardData().map((value, index) => (
                                <Grid key={index} className={this.getDashboardSizes(value.size)} item>
                                    <Card className={classes.paper}>
                                        <CardContent>
                                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                                {value.name}
                                            </Typography>
                                            <Typography variant="h5" component="h2">
                                                {value.type}
                                            </Typography>
                                            <div className={classes.cardActionBar}>
                                                <IconButton color="primary" className={classes.button} component="span" onClick={() => this.showHideDeleteDialog(index)}>
                                                    <Icon>delete</Icon>
                                                </IconButton>
                                                <IconButton color="primary" className={classes.button} component="span" onClick={() => this.extendBoard(index)}>
                                                    <Icon>zoom_out_map</Icon>
                                                </IconButton>
                                            </div>
                                        </CardContent>
                                    </Card>

                                </Grid>
                            ))}
                        </Grid>
                    </Grid>
                </Grid>
                {deleteDialog("ID")}
            </React.Fragment >
        );
    }
}

GuttersGrid.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(GuttersGrid);