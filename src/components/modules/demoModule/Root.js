import React, { Component } from 'react';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

import Test from './Test'

/*Own Components*/

const styles = {

};

class demoModule extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <React.Fragment>
                <Test />
                <p><br></br><br></br><br></br>
                    jwt: {this.props.jwt} Loaded Module</p>
            </React.Fragment>
        );
    }
}

export default withStyles(styles)(demoModule);