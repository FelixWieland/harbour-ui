import React from 'react';
import PropTypes from 'prop-types';

/*Material UI Components*/
import { withStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import { BrowserRouter, Redirect } from 'react-router-dom';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Input from '@material-ui/core/Input';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import green from '@material-ui/core/colors/green';
import Auth from '../auth';
import Wave from './Wave';

/*Own Components*/

const styles = theme => ({
    onTop: {
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        zIndex: 1101,
        height: 3,
    },
    centeredLogin: {
        position: "absolute",
        top: "20%",
        left: "calc(50% - 180px);"
    },
    noOverlow: {
        position: "fixed",
        overlow: "hidden !important",
        height: "100vh",
        width: "100%",
        top: 0,
    },
    input: {
        width: "100%",
        marginBottom: "20px",
        fontSize: "18px",
    },
    formRoot: {
        padding: "20px",
        width: 320,
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
    buttonSuccess: {
        width: "100%",
    },
    wrapper: {
        margin: theme.spacing.unit,
        position: 'relative',
    },
    buttonProgress: {
        color: green[500],
        position: 'absolute',
        top: '50%',
        left: '50%',
        marginTop: -12,
        marginLeft: -12,
    },
});


class Login extends React.Component {

    state = {
        password: '',
        showPassword: false,
        loading: false,
    };

    constructor(props) {
        super(props);
        if (props.getAuth != undefined) {
            props.setAuth(undefined);
        }
    }

    login = () => {
        this.props.setAuth(new Auth("demo", "demo", "demo", "demo"));
        window.location = "/Dashboard"
    }

    handleChange = prop => event => {
        this.setState({ [prop]: event.target.value });
    };

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    };

    handleButtonClick = () => {
        if (!this.state.loading) {
            this.setState(
                {
                    success: false,
                    loading: true,
                },
                () => {
                    this.timer = setTimeout(() => {
                        this.login();
                    }, 2000);
                },
            );
        }
    };

    componentDidMount = () => {
        this.render();
        document.body.style.paddingTop = 0;
    }

    render() {
        const { classes } = this.props;
        const { loading, success } = this.state;

        let loginform = () => {
            return (
                <div className={classes.centeredLogin}>
                    <Paper className={classes.formRoot} elevation={1}>
                        <Input
                            placeholder="Username"
                            className={classes.input}
                            inputProps={{
                                'aria-label': 'Description',
                            }}
                        />
                        <Input
                            id="password"
                            placeholder="Password"
                            type={this.state.showPassword ? 'text' : 'password'}
                            value={this.state.password}
                            onChange={this.handleChange('password')}
                            className={classes.input}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="Toggle password visibility"
                                        onClick={this.handleClickShowPassword}
                                    >
                                        {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <div className={classes.wrapper}>
                            <Button
                                variant="contained"
                                color="primary"
                                className={classes.buttonSuccess}
                                disabled={loading}
                                onClick={this.handleButtonClick}
                            >
                                Login
                            </Button>
                            {loading && <CircularProgress size={24} className={classes.buttonProgress} />}
                        </div>
                    </Paper>
                </div>
            );
        }

        return (
            <React.Fragment>
                <div className={classes.noOverlow}>
                    <Wave />
                    {loginform()}
                </div>
            </React.Fragment>
        );
    }
}

Login.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Login);