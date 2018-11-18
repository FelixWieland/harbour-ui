import React from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import InputBase from '@material-ui/core/InputBase';
import { fade } from '@material-ui/core/styles/colorManipulator';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import SearchIcon from '@material-ui/icons/Search';
import LoadBar from './LoadBar'

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

/*Own Components*/

const styles = theme => ({
    root: {
        width: '82%',
        marginLeft: '9%'
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        width: '33%',
        textAlign: 'left'
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing.unit,
            width: 'auto',
        },
    },
    searchIcon: {
        width: theme.spacing.unit * 9,
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
        width: '100%',
    },
    inputInput: {
        paddingTop: theme.spacing.unit,
        paddingRight: theme.spacing.unit,
        paddingBottom: theme.spacing.unit,
        paddingLeft: theme.spacing.unit * 10,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            width: 120,
            '&:focus': {
                width: 200,
            },
        },
    }
});

const apiRepositories = "http://192.168.178.74:9090/github/repositories";

class Repositories extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchValue: '',
            repositoryAPI: null,
            repositoryAPIcopy: null,
            expanded: null,
            loadState: 10,
        }
    }

    searchValue = "";

    componentDidMount() {
        this.setState({ loadState: 20 });
        fetch(apiRepositories)
            .then(response => response.json())
            .then(repositoryData => this.setState({
                repositoryAPI: repositoryData,
                repositoryAPIcopy: repositoryData,
                loadState: 100
            }));
    }

    handleChange = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false,
        });
    };

    getRepositoryData = () => {
        try {
            var api = this.state.repositoryAPI;
            if (api != undefined) {
                return api;
            } else {
                return [];
            }
        } catch {
            return [];
        }
    };

    filterRepos = (obj, value) => {
        if (!obj.name.search(new RegExp(this.searchValue, "i"))) {
            return true;
        } else {
            return false;
        }
    };

    renderFiltered = prop => event => {
        this.searchValue = event.target.value;

        this.setState({
            repositoryAPI: this.state.repositoryAPIcopy.filter(this.filterRepos),
            searchValue: event.target.value
        });
    };
    /*
    <p>
        <br></br><br></br><br></br>
        {this.getRepositoryData().map((value, index) => (
            <p>{value.name}</p>
        ))}
    </p>
    */
    render() {
        const { classes } = this.props;
        const { expanded } = this.state;
        return (
            <React.Fragment>
                <LoadBar state={this.state.loadState} />
                <div className={classes.root} >
                    <AppBar position="static">
                        <Toolbar>
                            <div className={classes.search}>
                                <div className={classes.searchIcon}>
                                    <SearchIcon />
                                </div>
                                <InputBase
                                    placeholder="Search…"
                                    classes={{
                                        root: classes.inputRoot,
                                        input: classes.inputInput,
                                    }}
                                    value={this.state.searchValue}
                                    onChange={this.renderFiltered('searchValue')}
                                />
                            </div>
                            <div className={classes.grow} />
                            <div className={classes.sectionDesktop}>
                            </div>
                        </Toolbar>
                    </AppBar>
                    {this.getRepositoryData().map((value, index) => (
                        <ExpansionPanel expanded={expanded === value.node_id} onChange={this.handleChange(value.node_id)} >
                            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                <Typography className={classes.heading}>{value.name}</Typography>
                                <Typography className={classes.secondaryHeading}>{value.description}</Typography>
                            </ExpansionPanelSummary>
                            <ExpansionPanelDetails>
                                <Typography>
                                    {value.description}
                                </Typography>
                            </ExpansionPanelDetails>
                        </ExpansionPanel>
                    ))}
                </div >
            </React.Fragment>
        );
    }
}

Repositories.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Repositories);