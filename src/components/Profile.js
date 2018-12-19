import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

/*Own Components*/

const styles = theme => ({
    well: {
        backgroundColor: "white",
    },
    topMargin: {
        marginTop: 35,
    },
    relativeWrapper: {
        position: "relative",
    },
    profileAvatar: {
        margin: 10,
        width: 250,
        height: 250,
        boxShadow: [
            [0, 1, 3, 'rgba(0,0,0,0.12)'],
            [0, 1, 2, 'rgba(0,0,0,0.24)']
        ],
        transition: ['box-shadow'],
        transitionDuration: 200,
    },
    profileAvatarEditable: {
        margin: 10,
        width: 250,
        height: 250,
        boxShadow: [
            [0, 1, 3, 'rgba(0,0,0,0.12)'],
            [0, 1, 2, 'rgba(0,0,0,0.24)']
        ],
        transition: ['box-shadow'],
        transitionDuration: 200,
        '&:hover': {
            boxShadow: [
                [0, 14, 28, 'rgba(0,0,0,0.25)'],
                [0, 10, 10, 'rgba(0,0,0,0.22)'],
            ],
            cursor: "pointer",
        }
    },
    escapedElement: {
        position: "absolute",
        left: "50%",
        bottom: -30,
        backgroundColor: "#FFFFFF",
        padding: 10,
        boxShadow: [
            [0, 1, 3, 'rgba(0,0,0,0.12)'],
            [0, 1, 2, 'rgba(0,0,0,0.24)']
        ],
        [theme.breakpoints.only('xs')]: {
            position: "relative",
            width: "100%",
            bottom: 20,
            left: 0,
        },

    },
    profileName: {
        fontSize: 30,
        fontWeight: "medium",
        margin: 0,
    },
    profileEmail: {
        margin: 0,
        textAlign: "left",
        fontSize: 18,

        role: {
            fontSize: 18,
        }
    }
});

class Profile extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            spacing: '16',
            profile: {
                username: "WielandF",
                email: "demo.mail@server.de",
                role: "Developer",
            }
        }
    }

    dummy = () => {

    }

    render() {

        const { classes } = this.props;
        const { spacing } = this.state;

        var value = ""

        return (
            <React.Fragment>
                <Grid container className={classes.root} spacing={16} justify="center">
                    <Grid item xs={12} md={10} sm={10} lg={10}>
                        <Grid container className={classes.topMargin} spacing={Number(spacing)}>
                            <Grid item xs={12} sm={5} md={5} lg={3} className={classes.avatarHeight} >
                                <Grid container spacing={Number(spacing)} justify="center">
                                    <div className={classes.relativeWrapper}>
                                        <Avatar alt="Remy Sharp" src="/avatar.png" style={{ alignSelf: 'center' }} className={classes.profileAvatarEditable} />
                                        <div className={classes.escapedElement}>
                                            <p className={classes.profileName}>{this.state.profile.username}</p>
                                            <p className={classes.profileEmail}>
                                                <Link to={"/"}>
                                                    {this.state.profile.email}
                                                </Link>
                                                &nbsp;-&nbsp;
                                                <span className={classes.profileEmail.role}>{this.state.profile.role}</span>
                                            </p>
                                        </div>

                                    </div>
                                </Grid>
                            </Grid>
                        </Grid>
                    </Grid>
                    <Grid item xs={12} md={10} sm={10} lg={10}>
                        <Grid container className={classes.topMargin} justify="center" spacing={Number(spacing)}>
                            <AppBar position="static" color="default">
                                <Tabs
                                    value={value}
                                    onChange={this.dummy}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    scrollable
                                    scrollButtons="auto"
                                >
                                    <Tab label="Item One" />
                                    <Tab label="Item Two" />
                                    <Tab label="Item Three" />
                                    <Tab label="Item Four" />
                                    <Tab label="Item Five" />
                                    <Tab label="Item Six" />
                                    <Tab label="Item Seven" />
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid container className={classes.topMargin} justify="center" spacing={Number(spacing)}>
                            <Grid className={classes.well} item xs={6} md={4} sm={3} lg={3}>
                                test
                            </Grid>
                            <Grid className={classes.well} item xs={6} md={4} sm={3} lg={3}>
                                test
                            </Grid>
                            <Grid className={classes.well} item xs={12} md={4} sm={3} lg={3}>
                                test
                            </Grid>
                            <Grid className={classes.well} item xs={12} md={4} sm={3} lg={3}>
                                test
                            </Grid>
                        </Grid>
                    </Grid>
                </Grid>
                <p><br></br><br></br><br></br>Profile</p>
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(Profile);