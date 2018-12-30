import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';

/*Own Components*/

const styles = theme => ({
    onBottom: {
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "auto",
        borderRadius: {
            top: 20,
        }
    },
    innerWrapper: {
        position: "relative",
        width: "100%",
        height: 40,
        overflowX: "scroll",
        float: "right",
        paddingRight: 15,
        paddingBottom: 8,
    },
    chip: {
        margin: 2,
    },
    chipDontForget: {
        margin: 2,
        extend: "chip",
        backgroundColor: theme.priority.medium,
    },
    chipUrgent: {
        margin: 2,
        extend: "chip",
        backgroundColor: theme.priority.high,
    }
});

class Chatbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chats: [
                {
                    fullname: "Felix Wieland",
                    priority: "URGENT"
                },
                {
                    fullname: "Demo User",
                    priority: "DONTFORGET",
                },
                {
                    fullname: "Demo User",
                    priority: "DEFAULT",
                }],
        }
    }

    handleClick = () => {
        alert("click")
    }

    handleDelete = (key) => {
        this.setState({ chats: this.state.chats.filter((item, index) => index !== key) });
    }

    createChat = () => {
        return (
            <div className={this.props.classes.chat}>
                test
            </div>
        );
    }

    createChip = (key, fullname, priority) => {
        /*  PRIORITYS:
            DEFAULT: grey
            DONTFORGET: yellow
            URGENTLY: red
        */
        var chipClass = {}
        switch (priority) {
            case "DONTFORGET":
                chipClass = this.props.classes.chipDontForget;
                break;
            case "URGENT":
                chipClass = this.props.classes.chipUrgent;
                break;
            default:
                chipClass = this.props.classes.chip;
                break;
        }
        return (
            <Chip
                key={key}
                avatar={
                    <Avatar>
                        <FaceIcon />
                    </Avatar>
                }
                label={fullname}
                onClick={() => this.handleClick(key)}
                onDelete={() => this.handleDelete(key)}
                className={chipClass}
            />
        );
    }

    render() {
        const { classes } = this.props;

        var loadChips = () => {
            return this.state.chats.map(((val, index) => {
                return this.createChip(index, val.fullname, val.priority);
            }));
        }

        return (
            <React.Fragment>
                <div className={classes.onBottom}>
                    <div className={classes.innerWrapper}>
                        {loadChips()}
                    </div>
                </div>
            </React.Fragment>

        );
    }
}

export default withStyles(styles)(Chatbar);