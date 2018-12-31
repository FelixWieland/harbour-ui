import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import Chip from '@material-ui/core/Chip';
import Avatar from '@material-ui/core/Avatar';
import FaceIcon from '@material-ui/icons/Face';
import Close from '@material-ui/icons/Close'
import Fade from '@material-ui/core/Fade';
import { Typography } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';

/*Own Components*/

const styles = theme => ({
    onBottom: {
        position: "fixed",
        bottom: 0,
        right: 0,
        width: "auto",
        borderTopLeftRadius: 20,
    },
    innerWrapper: {
        position: "relative",
        width: "100%",
        height: 40,
        overflowX: "visible",
        overflowY: "visible",
        float: "right",
        paddingRight: 15,
        paddingBottom: 8,
    },
    chip: {
        margin: 2,
        boxShadow: [
            theme.shadows[1],
            theme.shadows[1],
        ],
    },
    chipDontForget: {
        margin: 2,
        extend: "chip",
        backgroundColor: theme.priority.medium,
        boxShadow: [
            theme.shadows[1],
            theme.shadows[1],
        ],
    },
    chipUrgent: {
        margin: 2,
        extend: "chip",
        backgroundColor: theme.priority.high,
        boxShadow: [
            theme.shadows[1],
            theme.shadows[1],
        ],
    },
    boundChipAndChat: {
        float: "left",
        position: "relative",
        height: 40,
        overflow: "visible",
    },
    chat: {
        right: 0,
        width: "100%",
        minWidth: 300,
        position: "absolute",
        bottom: 48,
        height: "50vh",
        border: ".5px solid " + (theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]),
        backgroundColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
        borderRadius: ".4em",
        boxShadow: [
            theme.shadows[1],
            theme.shadows[1],
        ],
        '&:after': {
            content: '""',
            position: "absolute",
            bottom: 0,
            right: "20%",
            width: 0,
            height: 0,
            border: "0.7em solid transparent",
            borderTopColor: theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
            borderBottom: 0,
            marginLeft: "-0.7em",
            marginBottom: "-0.7em",
        }
    },
    chatInfoArea: {
        borderRadius: ".4em",
        height: 30,
        backgroundColor: theme.palette.primary.main,
        borderBottom: ".5px solid" + (theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]),
    },
    chipChat: {
        height: 30,
        width: "100%",
        textAlign: "left",
    },

    chatMessageArea: {
        height: "calc(100% - 30px - 70px)",
        overflowY: "scroll",
        position: "relative",
        marginTop: 5,
    },
    chatWritingArea: {
        height: 70,
        borderRadius: ".4em",
        borderTop: ".5px solid" + (theme.palette.type === 'light' ? theme.palette.grey[400] : theme.palette.grey[700]),
    },
    leftChat: {
        backgroundColor: theme.palette.grey[400],
        width: "80%",
        float: "left",
        borderRadius: ".4em",
        marginBottom: 5,
        marginLeft: 5,
        padding: 7.5,
        paddingTop: 3.5,
        paddingBottom: 3.5,
    },
    rightChat: {
        backgroundColor: theme.palette.complimentary.main,
        width: "80%",
        float: "right",
        borderRadius: ".4em",
        marginBottom: 5,
        marginRight: 5,
        padding: 7.5,
        paddingTop: 3.5,
        paddingBottom: 3.5,
    },
    textField: {
        height: 70,
        width: "100%",
        padding: 5,
    }
});

class Chatbar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            userid: "99-99-99",
            chats: [
                {
                    fullname: "Demo User",
                    priority: "DEFAULT", //URGENT
                    state: false,
                    onSent: "",
                    messages: [
                        {
                            senderID: "99-99-99",
                            senderFullName: "Felix Wieland",
                            time: "20:10",
                            message: "Hello Harbour"
                        },
                        {
                            senderID: "77-77-77",
                            senderFullName: "DemoUser",
                            time: "20:11",
                            message: "Hello Felix im just a loooooong test message to check if everything works"
                        },
                        {
                            senderID: "99-99-99",
                            senderFullName: "Felix Wieland",
                            time: "20:12",
                            message: "Hello DemoUser"
                        },
                        {
                            senderID: "99-99-99",
                            senderFullName: "Felix Wieland",
                            time: "21:10",
                            message: "Bye"
                        }
                    ]
                },
                {
                    fullname: "Demo User",
                    priority: "DEFAULT", //DONTFORGET
                    state: false,
                    onSent: "",
                    messages: [
                    ]
                },
                {
                    fullname: "Demo User",
                    priority: "DEFAULT",
                    state: false,
                    onSent: "",
                    messages: [
                    ]
                }],
        }
    }

    handleToggleChatClick = (key) => {
        for (var i = 0; i < this.state.chats.length; i++) {
            if (i == key) continue;
            this.state.chats[i].state = false;
        }
        this.state.chats[key].state = !this.state.chats[key].state;
        this.setState(this.state);
    }

    handleDeleteChatClick = (key) => {
        this.state.chats[key].state = false;
        this.setState(this.state);
        setTimeout(() => {
            this.setState({ chats: this.state.chats.filter((_, index) => index !== key) });
        }, 160);

    }
    handleMessageChange = key => event => {
        if (this.state.chats[key].onSent == null) {
            this.state.chats[key].onSent = "";
            this.setState(this.state);
            return;
        }
        this.state.chats[key].onSent = event.currentTarget.value;
        this.setState(this.state);
    };

    sendMessage = key => event => {
        if (event.key == "Enter") {
            this.state.chats[key].onSent = null;
        }
    };


    createChat = (key, fullname, inOrOut) => {
        const { classes } = this.props;

        var createMessages = () => {
            var messages = [];
            this.state.chats[key].messages.forEach((val) => {
                var messageClass = this.state.userid == val.senderID ? classes.rightChat : classes.leftChat;
                messages.push((
                    <div className={messageClass}>
                        <Typography align="left">
                            {val.message}
                        </Typography>
                        <Typography align="right">
                            {val.time}
                        </Typography>
                    </div>
                ));
            })
            return messages;
        }

        console.log(createMessages());

        return (
            <Fade in={inOrOut} mountOnEnter unmountOnExit>
                <div className={classes.chat}>
                    <div className={classes.chatInfoArea}>
                        <Chip
                            key={key}
                            label={fullname}
                            onClick={() => this.handleToggleChatClick(key)}
                            onDelete={() => this.handleToggleChatClick(key)}
                            className={classes.chipChat}
                            color="primary"
                        />
                    </div>
                    <div className={classes.chatMessageArea}>
                        {createMessages()}
                    </div>
                    <div className={classes.chatWritingArea}>
                        <TextField
                            id="standard-multiline-flexible"
                            multiline
                            value={this.state.chats[key].onSent}
                            onChange={this.handleMessageChange(key)}
                            className={classes.textField}
                            onKeyDown={this.sendMessage(key)}
                            rows="2"
                            autoFocus
                        />
                    </div>
                </div>
            </Fade>

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
                onClick={() => this.handleToggleChatClick(key)}
                onDelete={() => this.handleDeleteChatClick(key)}
                className={chipClass}
            />
        );
    }

    render() {
        const { classes } = this.props;

        var loadChips = () => {
            return this.state.chats.map(((val, index) => {

                return (
                    <hgroup className={classes.boundChipAndChat}>
                        {this.createChat(index, val.fullname, val.state)}
                        {this.createChip(index, val.fullname, val.priority)}
                    </hgroup>
                );

                //return this.createChip(index, val.fullname, val.priority);
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