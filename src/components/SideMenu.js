import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';
import Collapse from '@material-ui/core/Collapse';

import HotKey from 'react-shortcut';

import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';


const styles = {
    list: {
        width: 250,
        paddingTop: 48,
    },
    fullList: {
        width: 'auto',
    },
    inForeground: {
        zIndex: 100003,
    },
    inBackground: {
        zIndex: 100000,
    }
};

const sideMenuAPI = "sideMenu-api.json";

class SideMenu extends React.Component {

    state = {
        left: false,
        changed: true,
        shortcuts: {
            toggleSideMenu: ['control', '<'],
        }
    };

    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.handleExpand = this.handleExpand.bind(this);
        this.expanded = false;
        if (this.props.clipped == 'permanent') {
            this.state.variant = "permanent";
            this.state.variantClass = "inBackground";
        } else if (this.props.clipped == 'persistent') {
            this.state.variant = "persistent";
            this.state.variantClass = "inBackground";
        } else {
            this.state.variant = "temporary";
            this.state.variantClass = "inForground";
        }
    };

    componentWillReceiveProps = (props) => {
        if (props.show !== this.state.left && props.show != null) {
            this.setState({ left: props.show });
            this.props = props;
        }
    }

    componentDidMount = () => {
        import('../' + sideMenuAPI).then(res => this.initializeNavigationState(res)
        );
    }

    shortcutToggleDrawer = () => {
        var state = !this.state.left;
        console.log(this.expanded);
        this.setState({
            left: state
        });
        this.props.handleStateChange({
            show_sidebar: state
        });
    }

    toggleDrawer = (state) => () => {
        console.log(state);
        if (this.expanded == true) {
            this.expanded = false;
            this.forceUpdate();
        } else {
            this.expanded = state;
            this.setState({
                left: state
            });
            this.props.handleStateChange({
                show_sidebar: state
            });
        }

    };

    getSideMenuData = (type) => { //type
        try {
            return this.state.sideMenuAPI.default.navigation; //[type]
        } catch (ex) {
            return [] //empty list to escape error
        }
    }

    handleExpand = (name) => {
        this.state.navigation[name] = !this.state.navigation[name];
        this.expanded = true;
    }

    initializeNavigationState = (res) => {

        var init = {};

        function recurHelper(data) {
            if (data == undefined) {
                return;
            }
            data.map(elm => {
                if (elm.elements != undefined) {
                    //is List in={this.state.open}
                    //this.state.navigation[elm.internal_name] = false;
                    init[elm.internal_name] = false;
                    recurHelper(elm.elements)
                }
            });
        }

        recurHelper(res.default.navigation);
        this.setState({
            sideMenuAPI: res,
            navigation: init,
        })
    }

    render() {
        const { classes } = this.props;

        let buildLists = (data) => {
            var that = this;
            function recurHelper(data) {
                if (data == undefined) {
                    return;
                }
                return data.map((elm) => {
                    if (elm.elements != undefined) {
                        //is List in={this.state.open}
                        return (
                            <React.Fragment>
                                <ListItem button onClick={() => that.handleExpand(elm.internal_name)}>
                                    <ListItemText primary={elm.name} />
                                    {that.state.navigation[elm.internal_name] ? <ExpandLess /> : <ExpandMore />}
                                </ListItem>
                                <Collapse in={that.state.navigation[elm.internal_name]} timeout="auto" unmountOnExit>
                                    <List>
                                        {recurHelper(elm.elements)}
                                    </List>
                                </Collapse>
                            </React.Fragment>
                        );
                    } else {
                        //is link
                        return (
                            <Link className="clearAll" to={"/" + elm.internal_name}>
                                <ListItem button >
                                    <ListItemIcon><Icon>{elm.icon}</Icon></ListItemIcon>
                                    <ListItemText primary={elm.name} />
                                </ListItem>
                            </Link>
                        )
                    }
                });
            }

            return recurHelper(data);
        }

        const data = this.getSideMenuData();
        var list;
        if (data != []) {
            list = buildLists(data);
        } else {
            list = [];
        }

        return (
            <div>
                <HotKey keys={this.state.shortcuts.toggleSideMenu} simultaneous onKeysCoincide={this.shortcutToggleDrawer} />

                <Drawer variant={this.state.variant} className={classes.variantClass} anchor="left" open={this.state.left} onClose={this.toggleDrawer(false)} >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        <div className={classes.list}>
                            {list}
                        </div>
                    </div>
                </Drawer>
            </div>
        );
    }
}

SideMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);