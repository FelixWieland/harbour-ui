import React from 'react';
import PropTypes from 'prop-types';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';

/*Own Components*/

const styles = theme => ({
    onTop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1101,
        height: 2.5
    },
    onTopInvisible: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1100,
        height: 2.5
    }
});


class LoadBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            completed: this.props.state,
            color: "secondary",
            class: this.props.onTop
        };
    }

    componentDidMount() {
        //this.timer = setInterval(this.progress, 500);
    }

    componentWillUnmount() {
        clearInterval(this.timer);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.state < 100) {
            this.setState({
                completed: nextProps.state,
            });
        } else {
            this.setState({
                completed: nextProps.state,
                class: this.props.onTopInvisible,
            });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <LinearProgress color={this.state.color} className={classes.onTop} variant="determinate" value={this.state.completed} />
        );
    }
}

LoadBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(LoadBar);