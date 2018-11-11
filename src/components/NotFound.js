import React from 'react';
import PropTypes from 'prop-types';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';

/*Own Components*/

const styles = theme => ({

});


class NotFound extends React.Component {

    constructor(props) {
        super(props);
        this.state = {

        };
    }

    render() {
        const { classes } = this.props;
        return (
            <p>404 Not found</p>
        );
    }
}

NotFound.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);