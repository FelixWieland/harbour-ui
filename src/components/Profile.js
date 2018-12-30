import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import { Link } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import AddIcon from '@material-ui/icons/Add';
import Fade from '@material-ui/core/Fade';

import IconButton from '@material-ui/core/IconButton';

import BigCalendar from 'react-big-calendar'
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from 'moment'

/*Own Components*/

const localizer = BigCalendar.momentLocalizer(moment)


const styles = theme => ({
    root: {
        marginBottom: 50,
    },
    profileOverview: {
        backgroundColor: theme.palette.primary.light,
        position: 'relative',
    },
    primaryActionButton: {
        position: "absolute",
        left: "calc(50% - 30px)",
        bottom: "-30px",
        backgroundColor: "white",
        '&:hover': {
            boxShadow: [
                theme.shadows[2],
                theme.shadows[2],
            ],
            backgroundColor: "rgba(255,255,255,0.9)",
            cursor: "pointer",
        }
    },
    test: {
        backgroundColor: theme.palette.primary.main,
    },
    well: {
        backgroundColor: "white",
    },
    headerMargin: {
        marginTop: 45,
        marginBottom: 45,
        [theme.breakpoints.only('xs')]: {
            marginBottom: 45,
        },
    },
    relativeWrapper: {
        position: "relative",
    },
    profileAvatar: {
        width: "80%",
        maxWidth: "230px",
        marginLeft: "20%",
        height: "auto",
        boxShadow: [
            theme.shadows[0],
            theme.shadows[0],
        ],
        transition: ['box-shadow'],
        transitionDuration: 200,

    },
    profileAvatarEditable: {
        width: "80%",
        marginLeft: "20%",
        maxWidth: "230px",
        height: "auto",
        border: "10px 20px 30px 40px solid blue",
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
        width: "auto",
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
        textAlign: "center",
        fontSize: 14,
        width: "auto",
    },
    profileRole: {
        width: "auto",
        fontSize: 18,
        whiteSpace: "pre",
    },
    tab: {
        backgroundColor: theme.palette.secondary.main,
        paddingTop: 15,
    },

    taskBar1: {
        padding: 25,
        fontSize: 25,
        backgroundColor: theme.palette.complimentary.main,
        color: theme.palette.primary.contrastText,
    },
    taskBar2: {
        padding: 25,
        fontSize: 25,
        backgroundColor: theme.palette.complimentary.dark,
        color: theme.palette.primary.contrastText,
    },
    fullname: {
        margin: 0,
        width: "100%",

        color: theme.palette.primary.contrastText,
        textAlign: "left",
        [theme.breakpoints.only('lg')]: {
            fontSize: "5.5ch",
        },
        [theme.breakpoints.only('md')]: {
            fontSize: "5.5ch",
        },
        [theme.breakpoints.only('sm')]: {
            fontSize: "4.5ch",
        },
        [theme.breakpoints.only('xs')]: {
            fontSize: "30px",
        }
    },
    role: {
        margin: 0,
        width: "100%",
        fontSize: "25px",
        fontStyle: "italic",
        color: theme.palette.primary.contrastText,
        textAlign: "left",
    },
    email: {
        margin: 0,
        marginTop: 5,
        width: "100%",
        fontSize: "20px",
        textAlign: "left",
    },
    paddingWhenXS: {
        [theme.breakpoints.only('xs')]: {
            paddingLeft: 15,
            paddingRight: 15,
        }
    },
    centerTexts: {
        [theme.breakpoints.only('lg')]: {
            paddingTop: "4%",
        },
        [theme.breakpoints.only('md')]: {
            paddingTop: "4%",
        },
        [theme.breakpoints.only('sm')]: {
            paddingTop: "3%",
        },
        [theme.breakpoints.only('xs')]: {
            paddingTop: "2.5%",
        }
    },
    tabPadding: {
        paddingLeft: 5,
        paddingRight: 5,
        width: "100%",
        minHeight: "50vh",
        height: "auto",
    }
});

class Profile extends React.Component {

    constructor(props) {
        super(props);

        let profile = this.initProfile();

        this.state = {
            spacing: '16',
            profile: profile,
            activeTab: 0,
            calendarEvents: [
                {
                    start: new Date(),
                    end: new Date(moment().add(1, "days")),
                    title: "Some title"
                }
            ]
        }
    }

    initProfile = () => {
        //check if own user or not
        var user = this.props.match.params.User
        if (user == undefined) {
            //load own user
            user = "OWN USER";
        }

        return {
            username: user,
            fullname: "Felix Wieland",
            email: "demo.mail@server.de",
            role: "Software Developer",
            tasks: {
                completed: 20,
                remaining: 15,
            },
            pages: [
                "Standard",
                "Tasks",
                "Projects",
                "Calender",
                "Settings"
            ],
        };
    }

    changeTab = (event, value) => {
        this.setState({ activeTab: value });
    }

    createTab = (value) => {
        const { classes } = this.props;
        var page = this.state.profile.pages[value]
        switch (page) {
            case "Calender":
                return (
                    <div className={classes.tabPadding}>
                        <BigCalendar
                            events={this.state.calendarEvents}
                            localizer={localizer}
                            startAccessor="start"
                            endAccessor="end"
                            style={{ width: "100%", height: "70vh" }}
                        />
                    </div>

                );
        }
        return (
            <div className={classes.tabPadding}>
                <p>{page}</p>
            </div>
        );
    }


    render() {

        const { classes } = this.props;
        const { spacing } = this.state;

        var header = () => {
            return (
                <Grid item className={classes.profileOverview} xs={12} md={10} sm={10} lg={10}>
                    <Grid container className={classes.headerMargin} spacing={Number(spacing)}>
                        <Grid item xs={4} sm={4} md={4} lg={4} className={classes.avatarHeight} >
                            <Grid container spacing={Number(spacing)} justify="center">
                                <Avatar alt="Demo Avatar" src="/avatar.png" className={classes.profileAvatarEditable} />
                            </Grid>
                        </Grid>
                        <Grid item xs={1} sm={1} md={1} lg={1}></Grid>
                        <Grid item xs={7} sm={7} md={7} lg={7}>
                            <Grid container spacing={Number(spacing)} className={classes.centerTexts}>
                                <p className={classes.fullname}>{this.state.profile.fullname}</p>
                                <Link className={classes.email} to={"/"}>
                                    {this.state.profile.email}
                                </Link>
                                <p className={classes.role}>{this.state.profile.role}</p>
                            </Grid>
                        </Grid>
                    </Grid>
                    <IconButton aria-label="Delete" className={classes.primaryActionButton}>
                        <AddIcon fontSize="large" />
                    </IconButton>
                </Grid>);
        }

        var tasks = () => {
            return (
                <Grid item xs={12} md={10} sm={10} lg={10}>
                    <Grid container spacing={Number(spacing)}>
                        <Grid item xs={6} sm={6} md={6} lg={6} className={classes.taskBar2} >
                            <p>{this.state.profile.tasks.remaining}</p>
                            <p>Remaining tasks</p>
                        </Grid>
                        <Grid item xs={6} sm={6} md={6} lg={6} className={classes.taskBar1} >

                            <p>{this.state.profile.tasks.completed}</p>
                            <p>Completed tasks</p>

                        </Grid>

                    </Grid>
                </Grid>
            );
        }

        return (
            <React.Fragment>
                <Grid container className={classes.root} spacing={16} justify="center">
                    {header()}
                    {tasks()}
                    <Grid item xs={12} md={10} sm={10} lg={10}>
                        <Grid container justify="center" spacing={Number(spacing)}>
                            <AppBar position="static" style={{ zIndex: 0 }} color="secondary">
                                <Tabs
                                    value={this.state.activeTab}
                                    className={classes.paddingWhenXS}
                                    onChange={this.changeTab}
                                    indicatorColor="primary"
                                    textColor="primary"
                                    scrollable
                                    scrollButtons="auto"
                                >
                                    {this.state.profile.pages.map((value, index) => (
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