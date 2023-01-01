/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Redirect } from 'react-router';

import ErrorBar from '../components/ErrorBar';
import { receiveError as handleReceiveError, resetError } from '../actions/errorActions';
import loginSerive from '../services/loginService';
import Styles from '../components/Styles';

export class Register extends Component {
  constructor() {
    super();
    this.state = {
      username: '',
      password: '',
      confirmedPass: '',
      firstName: '',
      lastName: '',
    };
  }

  /** ** frontend validation check the fields are filled or not *** */
  validateForm = () => {
    const { username, password, confirmedPass, firstName, lastName } = this.state;

    // check if the fields are empty
    if (username.length === 0) return 'Please enter a valid username';
    if (password.length === 0) return 'Please enter a valid password';
    if (confirmedPass.length === 0) return 'Please confirm the password';
    if (firstName.length === 0) return 'Please enter the first name';
    if (lastName.length === 0) return 'Please enter the last name';
    // matching the passwords
    if (password !== confirmedPass) return 'Passwords does not match';
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
    const { username, password, firstName, lastName } = this.state;
    const { onRegister, receiveError, history } = this.props;

    const msg = this.validateForm();
    if (msg.length === 0) {
      const user = {
        username,
        password,
        firstName,
        lastName,
      };
      onRegister(user, history);
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

  /** ** load login form *** */
  loadLoginForm = () => {
    const { history } = this.props;
    history.push('/login');
  };

  /** ** login component with input form *** */
  loadRegisterForm = () => (
    <div className="register-container">
      <Paper className="login-box">
        <Avatar className="login-icon">
          <PersonIcon style={Styles.secondary} color="inherit" />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign Up
        </Typography>
        <form className="">
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="username">Username</InputLabel>
            <Input onChange={this.handleFormChange} id="username" autoComplete="username" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Password</InputLabel>
            <Input onChange={this.handleFormChange} type="password" id="password" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="password">Confirm Password</InputLabel>
            <Input onChange={this.handleFormChange} type="password" id="confirmedPass" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="firstName">First Name</InputLabel>
            <Input onChange={this.handleFormChange} id="firstName" autoComplete="firstName" />
          </FormControl>
          <FormControl margin="normal" required fullWidth>
            <InputLabel htmlFor="lastName">Last Name</InputLabel>
            <Input onChange={this.handleFormChange} id="lastName" autoComplete="lastName" />
          </FormControl>
          <div className="login-button-container">
            <Button fullWidth style={Styles.primary} className="login-button" onClick={this.handlesubmit()}>
              Sign Up
            </Button>
          </div>
        </form>
        <div className="registerMessage">
          {' '}
          Already registered?{' '}
          <span className="registerLink" onClick={this.loadLoginForm}>
            {' '}
            Login{' '}
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
    return this.loadRegisterForm();
  }
}

const mapStateToProps = (state) => ({
  // user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  onRegister: (user, history) => {
    dispatch(loginSerive.register(user, history));
  },
  receiveError: (error) => {
    dispatch(handleReceiveError(error));
  },
  resetError: () => {
    dispatch(resetError());
  },
});

Register.propTypes = {
  onRegister: PropTypes.func.isRequired,
  receiveError: PropTypes.func.isRequired,
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
};

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);
export default RegisterContainer;
