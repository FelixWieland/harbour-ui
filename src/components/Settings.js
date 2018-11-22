import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';


/*Own Components*/

const styles = theme => ({
    root: {
        flexGrow: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    paper: {
        padding: theme.spacing.unit * 2,
        textAlign: 'center',
        color: theme.palette.text.secondary,
    },
    list_root: {
        width: '100%',
        backgroundColor: theme.palette.background.paper,
        position: 'relative',
        overflow: 'auto',
        height: '100%',
    },
    listSection: {
        backgroundColor: 'inherit',
    },
    ul: {
        backgroundColor: 'inherit',
        padding: 0,
    },
    formControl: {
        margin: theme.spacing.unit,
        minWidth: 200,
    },
    gridItem: {
        height: 205,
    }
});

const gridSizes = {
    xs: 12,
    md: 6,
    sm: 12,
    lg: 4,
}

class Settings extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            getSettings: props.getSettings,
            setSettings: props.setSettings,
            themes: props.themes,
        };
    }

    handleThemeChange = event => {
        this.state.setSettings({
            active_theme: this.state.getSettings.themes[event.target.value],
            active_theme_name: event.target.value,
        });
    };

    render() {

        const { classes } = this.props;

        var theme_setting = (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="ui-theme">Theme</InputLabel>
                    <Select
                        value={this.state.getSettings.active_theme_name}
                        onChange={this.handleThemeChange}
                        inputProps={{
                            name: 'Theme',
                            id: 'ui-theme',
                        }}
                    >
                        {Object.keys(this.state.getSettings.themes).map((key, index) => (
                            <MenuItem value={key} key={key} >{key}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
        );

        var navigation_style_setting = (
            <form className={classes.root} autoComplete="off">
                <FormControl className={classes.formControl}>
                    <InputLabel htmlFor="ui-navtype">Type</InputLabel>
                    <Select
                        value={""}
                        onChange={this.handleThemeChange}
                        inputProps={{
                            name: 'Type',
                            id: 'ui-navtype',
                        }}
                    >
                        {Object.keys([]).map((key, index) => (
                            <MenuItem value={key} key={key} >{key}</MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </form>
        );

        return (
            <div className={classes.root}>
                <Grid container spacing={8}>
                    <Grid className={classes.gridItem} item xs={gridSizes.xs} sm={gridSizes.sm} md={gridSizes.md} lg={gridSizes.lg} >
                        <List className={classes.list_root} subheader={<li />}>
                            <li className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader>{`Appearance`}</ListSubheader>
                                    <ListItem>
                                        <ListItemText primary={"Theme"} />
                                        {theme_setting}
                                    </ListItem>
                                </ul>
                            </li>
                        </List>
                    </Grid>
                    <Grid className={classes.gridItem} item xs={gridSizes.xs} sm={gridSizes.sm} md={gridSizes.md} lg={gridSizes.lg}  >
                        <List className={classes.list_root} subheader={<li />}>
                            <li className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader>{`Development`}</ListSubheader>
                                    {[0, 1, 2].map(item => (
                                        <ListItem>
                                            <ListItemText primary={"IDE"} />
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        </List>
                    </Grid>
                    <Grid className={classes.gridItem} item xs={gridSizes.xs} sm={gridSizes.sm} md={gridSizes.md} lg={gridSizes.lg}  >
                        <List className={classes.list_root} subheader={<li />}>
                            <li className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader>{`Development`}</ListSubheader>
                                    {[0, 1, 2].map(item => (
                                        <ListItem>
                                            <ListItemText primary={"IDE"} />
                                        </ListItem>
                                    ))}
                                </ul>
                            </li>
                        </List>
                    </Grid>
                    <Grid className={classes.gridItem} item xs={gridSizes.xs} sm={gridSizes.sm} md={gridSizes.md} lg={gridSizes.lg}  >
                        <List className={classes.list_root} subheader={<li />}>
                            <li className={classes.listSection}>
                                <ul className={classes.ul}>
                                    <ListSubheader>{`Navigation`}</ListSubheader>
                                    <ListItem>
                                        <ListItemText primary={"Navigation-Type"} />
                                        {navigation_style_setting}
                                    </ListItem>
                                </ul>
                            </li>
                        </List>
                    </Grid>
                </Grid>
            </div>
        );
    }
}

Settings.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Settings);