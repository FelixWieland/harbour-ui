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
        width: "100vw !important",
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


class Board extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            spacing: '16',
            boardData: this.props.data,
            size: null,
            xs: 12,
            sm: this.props.data.grid_size.sm,
            md: this.props.data.grid_size.md,
            lg: this.props.data.grid_size.lg
        };

        this.extendBoard = this.extendBoard.bind(this);
        this.deleteBoard = this.deleteBoard.bind(this);
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

    handleDialogUpdate = (what) => {
        if (what == "CLOSE") {
            this.state.deleteDialog = false;
        } else if (what == "DELETE") {
            this.state.deleteDialog = false;
            this.deleteBoard(this.state.deleteID);
            //send delete Action to API
        }
        this.forceUpdate();
    }

    deleteBoard = () => {

    }

    extendBoard = () => {
        if (this.state.size == null) {
            this.setState({
                size: this.props.classes.card_extended,
                xs: 12,
                sm: 12,
                md: 12,
                lg: 12,
            });
        } else {
            this.setState({
                size: null,
                xs: 12,
                sm: this.props.data.grid_size.sm,
                md: this.props.data.grid_size.md,
                lg: this.props.data.grid_size.lg
            });
        }
    }

    render() {
        const { classes } = this.props;
        const { spacing } = this.state;

        var deleteDialog = () => {
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
                        <Button onClick={() => this.handleDialogUpdate("CLOSE")} color="primary">
                            Abbrechen
                            </Button>
                        <Button onClick={() => this.handleDialogUpdate("DELETE")} color="primary" autoFocus>
                            Löschen
                        </Button>
                    </DialogActions>
                </Dialog >
            );
        };
        //className={this.getDashboardSizes(value.size)}
        return (
            <React.Fragment>
                <Grid key={this.state.name} className={this.state.size} xs={this.state.xs} sm={this.state.sm} md={this.state.md} lg={this.state.lg} item>
                    <Card className={classes.paper}>
                        <CardContent>
                            <Typography className={classes.title} color="textSecondary" gutterBottom>
                                {this.state.boardData.name}
                            </Typography>
                            <Typography variant="h5" component="h2">
                                {this.state.boardData.type}
                            </Typography>
                            <div className={classes.cardActionBar}>
                                <IconButton color="primary" className={classes.button} component="span" onClick={() => this.showHideDeleteDialog()}>
                                    <Icon>delete</Icon>
                                </IconButton>
                                <IconButton color="primary" className={classes.button} component="span" onClick={() => this.extendBoard()}>
                                    <Icon>zoom_out_map</Icon>
                                </IconButton>
                            </div>
                        </CardContent>
                    </Card>
                </Grid>
                {deleteDialog()}
            </React.Fragment >
        );
    }
}

Board.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Board);