import React from 'react';
import PropTypes from 'prop-types';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BrowserRouter, Redirect } from 'react-router-dom';

/*Own Components*/

const styles = theme => ({
    onTop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "10%",
        zIndex: 1101,
        height: 3,
    },
    noOverflow: {
        position: "fixed",
        top: "0",
        height: "100vh",
        width: "101%",
        overflow: "hidden",
        left: "-1px"
    }
});

class Wave extends React.Component {

    componentDidMount = () => {
        const script = document.createElement("script");

        script.src = "/libs/wave/runner.js";
        script.async = true;

        document.body.appendChild(script);
        /*
        const s = document.createElement('script');
        s.type = 'text/javascript';
        s.async = true;
        s.innerHTML = "document.write('This is output by document.write()!')";
        this.instance.appendChild(s);
        this.render();*/
        //document.body.appendChild(document.createElement(wavifyScript));
    }
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment ref={el => (this.instance = el)}>
                <div className={classes.noOverflow}>
                    <svg height="100%" width="100%" version="1.1" id="wave1" xmlns="http://www.w3.org/2000/svg" class="wave">
                        <title>Wave</title>
                        <defs></defs>
                        <g transform="translate(2, 0)">
                            <path id="feel-the-wave" d="" />
                        </g>
                    </svg>
                    <svg height="100%" width="100%" version="1.1" xmlns="http://www.w3.org/2000/svg" class="wave">
                        <title>Wave</title>
                        <defs></defs>
                        <g transform="translate(2, 0)">
                            <path id="feel-the-wave-two" d="" />
                        </g>

                    </svg>
                </div>
            </React.Fragment>
        );
    }
}

Wave.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Wave);