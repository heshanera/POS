/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Redirect } from 'react-router';

import ErrorBar from '../components/ErrorBar';
import { receiveError as handleReceiveError, resetError } from '../actions/errorActions';
import loginSerive from '../services/loginService';
import Styles from '../components/Styles';

export class Login extends Component {
  constructor() {
    super();

    this.state = {
      username: '',
      password: '',
    };
  }

  /** ** frontend validation check the fields are filled or not *** */
  validateForm = () => {
    const { username, password } = this.state;

    // if username field is empty
    if (username.length === 0) {
      // if password field is empty
      if (password.length === 0) {
        return 'Please enter a valid username and password';
      }
      // only the username field is empty
      return 'Please enter a valid username';
      // only the password field is empty
    }
    if (password.length === 0) {
      return 'Please enter a valid password';
    }
    return '';
  };

  /** ** set the sate when the data is entered to the fields *** */
  handleFormChange = (event) => {
    this.setState({
      [event.target.id]: event.target.value,
    });
  };

  /** ** calling the login function when the login button is clicked *** */
  handlesubmit = () => () => {
    const { onLogin, receiveError, history } = this.props;

    const msg = this.validateForm();
    if (msg.length === 0) {
      const { username, password } = this.state;
      onLogin(username, password, history);
    } else {
      receiveError({
        message: msg,
        error: 400,
        show: true,
      });
    }
  };

  /** ** loading the Error Bar component *** */
  loadErrorBar = () => {
    const { errors } = this.props;

    return <ErrorBar message={errors.message} errorCode={errors.error} open={errors.show} reset={resetError} />;
  };

  /** ** load register form *** */
  loadRegisterForm = () => {
    const { history } = this.props;
    history.push('/register');
  };

  /** ** login component with input form *** */
  loadSignIn = () => (
    <div className="login-container">
      <Paper className="login-box">
        <Avatar className="login-icon">
          <LockOutlinedIcon style={Styles.secondary} color="inherit" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className="">
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input onChange={this.handleFormChange} id="username" autoComplete="username" className="test123" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input onChange={this.handleFormChange} type="password" id="password" autoComplete="current-password" />
          </FormControl>
          <div className="login-button-container">
            <Button fullWidth style={Styles.primary} className="login-button" onClick={this.handlesubmit()}>
              Sign In
            </Button>
          </div>
        </form>
        <div className="registerMessage">
          {' '}
          Need an account?
          <span className="registerLink" onClick={this.loadRegisterForm}>
            Register{' '}
          </span>
        </div>
      </Paper>
      {this.loadErrorBar()}
    </div>
  );

  render() {
    const loggedIn = JSON.parse(localStorage.getItem('user') || null) !== null;
    if (loggedIn) {
      return <Redirect to="/orders" />;
    }
    return this.loadSignIn();
  }
}

const mapStateToProps = (state) => ({
  user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  onLogin: (username, password, history) => {
    dispatch(loginSerive.fetchUser({ username, password }, history));
  },
  receiveError: (error) => {
    dispatch(handleReceiveError(error));
  },
  resetError: () => {
    dispatch(resetError());
  },
});

Login.propTypes = {
  onLogin: PropTypes.func.isRequired,
  receiveError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);

export default LoginContainer;
