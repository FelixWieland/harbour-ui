import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import CssBaseline from '@material-ui/core/CssBaseline';

/*Own Components*/
import SideMenu from './SideMenu'

/*
<FormGroup>
    <FormControlLabel
        control={
            <Switch checked={auth} onChange={this.handleChange} aria-label="LoginSwitch" />
        }
        label={auth ? 'Logout' : 'Login'}
    />
</FormGroup>
*/

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
    appBar: {
        zIndex: 100000,
    },
};

class MenuAppBar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        show_sidebar: false,
    };

    constructor(props) {
        super(props);
        this.sidemenu = React.createRef();
        this.handleMenuDrawer = this.handleMenuDrawer.bind(this);
        this.handleHarbourClick = this.handleHarbourClick.bind(this);
    };

    handleChange = event => {
        this.setState({
            auth: event.target.checked,
            show_sidebar: false
        });
    };

    handleMenu = event => {
        this.setState({
            anchorEl: event.currentTarget,
            show_sidebar: false
        });
    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            show_sidebar: false
        });
    };

    handleMenuDrawer = () => {
        this.setState({
            show_sidebar: true
        });
    };

    handleHarbourClick = () => {
        this.props.change_Page("Dashboard"); //Goto standart Page
        this.setState({
            show_sidebar: false
        });
    };

    handleProfile = () => {
        this.handleClose();
        this.props.change_Page("Profile");
    }

    handleLogout = () => {
        this.handleClose();
    }

    setChildRef(node) {
        this.childNode = node;
    };

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <SideMenu show={this.state.show_sidebar} change_Page={this.props.change_Page} />
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <IconButton className={classes.menuButton} onClick={this.handleMenuDrawer} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" onClick={this.handleHarbourClick} className={classes.grow}>
                            Harbour
                        </Typography>
                        {auth && (
                            <div>
                                <IconButton
                                    aria-owns={open ? 'menu-appbar' : undefined}
                                    aria-haspopup="true"
                                    onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorEl={anchorEl}
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    open={open}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem onClick={this.handleProfile}>Profile</MenuItem>
                                    <MenuItem onClick={this.handleClose}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

MenuAppBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MenuAppBar);
