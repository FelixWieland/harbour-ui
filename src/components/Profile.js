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
    test: {
        backgroundColor: theme.palette.primary.main,
    },
    well: {
        backgroundColor: "white",
    },
    headerMargin: {
        marginTop: 30,
        marginBottom: 55,
        [theme.breakpoints.only('xs')]: {
            marginBottom: 5,
        },
    },
    relativeWrapper: {
        position: "relative",
    },
    profileAvatar: {
        margin: 10,
        width: 250,
        height: 250,
        boxShadow: [
            theme.shadows[0],
            theme.shadows[0],
        ],
        transition: ['box-shadow'],
        transitionDuration: 200,

    },
    profileAvatarEditable: {
        margin: 10,
        width: 250,
        height: 250,
        boxShadow: [
            theme.shadows[1],
            theme.shadows[1],
        ],
        transition: ['box-shadow'],
        transitionDuration: 200,
        '&:hover': {
            boxShadow: [
                theme.shadows[2],
                theme.shadows[2],
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
            theme.shadows[1],
            theme.shadows[1],
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
    },
    tab: {
        backgroundColor: theme.palette.secondary.main,
        paddingTop: 15,
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
            },
            pages: [
                "Standard",
                "Projects",
                "Calender",
                "Settings"
            ],
            activeTab: 0,
        }
    }

    changeTab = (event, value) => {
        this.setState({ activeTab: value });
    }

    createTab = (value) => {
        return (
            <p>{value}</p>
        );
    }


    render() {

        const { classes } = this.props;
        const { spacing } = this.state;

        var createHeader = () => {
            return (
                <Grid item xs={12} md={10} sm={10} lg={10}>
                    <Grid container className={classes.headerMargin} spacing={Number(spacing)}>
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
                </Grid>);
        }

        return (
            <React.Fragment>
                <Grid container className={classes.root} spacing={16} justify="center">
                    {createHeader()}
                    <Grid item xs={11} md={10} sm={10} lg={10}>
                        <Grid container justify="center" spacing={Number(spacing)}>
                            <AppBar position="static" color="secondary">
                                <Tabs
                                    value={this.state.activeTab}
                                    onChange={this.changeTab}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    scrollable
                                    scrollButtons="auto"
                                >
                                    {this.state.pages.map((value, index) => (
                                        <Tab key={index} label={value} />
                                    ))}
                                </Tabs>
                            </AppBar>
                        </Grid>
                        <Grid container className={classes.tab} justify="center" spacing={Number(spacing)}>
                            {this.createTab(this.state.activeTab)}
                        </Grid>
                    </Grid>
                </Grid>
            </React.Fragment >
        );
    }
}

export default withStyles(styles)(Profile);