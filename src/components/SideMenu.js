import React from 'react';
import PropTypes, { func } from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import { Link } from 'react-router-dom';


import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Icon from '@material-ui/core/Icon';


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
    };

    constructor(props) {
        super(props);
        this.toggleDrawer = this.toggleDrawer.bind(this);
        if (this.props.clipped == true) {
            this.state.variant = "permanent";
            this.state.variantClass = "inBackground";
        } else {
            this.state.variant = "";
            this.state.variantClass = "inForground";
        }
    };

    componentWillReceiveProps = (props) => {
        if (props.show !== this.state.left) {
            this.setState({ left: props.show });
            this.props = props;
        }
    }

    componentDidMount = () => {
        /*fetch(sideMenuApi)
            .then(response => response.json())
            .then(data => this.setState({ data }));*/
        import('../' + sideMenuAPI).then(
            res => this.setState({ sideMenuAPI: res }),
        );
    }

    toggleDrawer = (open) => () => {
        this.setState({
            left: open
        });
    };

    getSideMenuData = (type) => {
        try {
            return this.state.sideMenuAPI.default[type];
        } catch (ex) {
            return [] //empty list to escape error
        }
    }
    /*onClick={() => this.navigation(obj.internal_name)}*/
    render() {
        const { classes } = this.props;
        const sideList = (
            <div className={classes.list}>
                {["module_pages", "personal_pages", "system_pages"].map((pages, index) => (
                    <React.Fragment>
                        <Divider />
                        <List>
                            {this.getSideMenuData(pages).map((obj, index) => (
                                <Link className="clearAll" to={"/" + obj.internal_name}>
                                    <ListItem button key={index}  >
                                        <ListItemIcon><Icon>{obj.icon}</Icon></ListItemIcon>
                                        <ListItemText primary={obj.name} />
                                    </ListItem>
                                </Link>
                            ))}
                        </List>
                    </React.Fragment>
                ))}
            </div>
        );

        return (
            <div>
                <Drawer variant={this.state.variant} className={classes.variantClass} anchor="left" open={this.state.left} onClose={this.toggleDrawer(false)} >
                    <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer(false)}
                        onKeyDown={this.toggleDrawer(false)}
                    >
                        {sideList}
                    </div>
                </Drawer>
            </div>
        );
    }
}
/* onClose={this.toggleDrawer('left', false)}*/
/* <div
                        tabIndex={0}
                        role="button"
                        onClick={this.toggleDrawer('left', false)}
                        onKeyDown={this.toggleDrawer('left', false)}
                    >
                        {sideList}
                    </div> */

SideMenu.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(SideMenu);