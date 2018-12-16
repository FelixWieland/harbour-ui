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
import { NavLink, withRouter } from 'react-router-dom';

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
        zIndex: 1100,
    },
};

class Navbar extends React.Component {
    state = {
        auth: true,
        anchorEl: null,
        show_sidebar: false,
    };

    constructor(props) {
        super(props);
        this.handleMenuDrawer = this.handleMenuDrawer.bind(this);
    };

    handleChange = event => {
        this.setState({
            auth: event.target.checked,
            show_sidebar: false
        });
    };

    handleMenu = event => {
        /*
        this.setState({
            anchorEl: event.currentTarget,
            show_sidebar: false
        });*/

        this.setState({
            anchorEl: event.currentTarget,
            show_sidebar: false
        });

    };

    handleClose = () => {
        this.setState({
            anchorEl: null,
            show_sidebar: false,
        });
    };

    handleMenuDrawer = () => {
        this.setState({
            show_sidebar: true
        });
    };

    setChildRef(node) {
        this.childNode = node;
    };

    logout = () => {
        window.sessionStorage.removeItem('auth');
        window.location = '/';
    }

    handleStateChange = (state) => {
        this.setState(state);
    }

    render() {
        const { classes } = this.props;
        const { auth, anchorEl } = this.state;
        const open = Boolean(anchorEl);

        return (
            <div className={classes.root}>
                <CssBaseline />
                <SideMenu clipped={this.props.clipped} show={this.state.show_sidebar} handleStateChange={this.handleStateChange} />
                <AppBar position="fixed">
                    <Toolbar variant="dense">
                        <IconButton className={classes.menuButton} onClick={this.handleMenuDrawer} color="inherit" aria-label="Menu">
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" color="inherit" onClick={this.handleHarbourClick} className={classes.grow}>
                            {""}
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
                                    <NavLink className="clearAll" to={"/Profile"}>
                                        <MenuItem>Profile</MenuItem>
                                    </NavLink>
                                    <MenuItem onClick={() => this.logout()}>Logout</MenuItem>
                                </Menu>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

Navbar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Navbar);
