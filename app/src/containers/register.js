import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import PersonIcon from '@material-ui/icons/Person';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import { Redirect } from 'react-router'

import ErrorBar from '../components/ErrorBar'
import { receiveError, resetError } from '../actions/errorActions';
import loginSerive from '../services/loginService';
import Styles from '../components/Styles'

export class Register extends Component {

  state = { 
    username:'', 
    password:'', 
    confirmedPass:'',
    firstName:'',
    lastName:'',
  };

  /**** frontend validation check the fields are filled or not ****/
  validateForm = () => {
    // check if the fields are empty
    if (this.state.username.length === 0)
      return "Please enter a valid username"
    if (this.state.password.length === 0)
      return "Please enter a valid password"
    if (this.state.confirmedPass.length === 0)
      return "Please confirm the password"
    if (this.state.firstName.length === 0)
      return "Please enter the first name"
    if (this.state.lastName.length === 0)
      return "Please enter the last name" 
    // matching the passwords
    if (this.state.password !== this.state.confirmedPass)
      return "Passwords does not match"
    else return ''
  };

  /**** set the sate when the data is entered to the fields ****/
  handleFormChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  /**** calling the login function when the login button is clicked ****/
  handlesubmit = state => (event) => {
    const msg = this.validateForm();
    if (msg.length === 0){
      const user = {
        username: this.state.username,
        password: this.state.password,
        firstName: this.state.firstName,
        lastName: this.state.lastName
      };
      this.props.onRegister(user, this.props.history)
    } else {
      this.props.receiveError({
        message: msg,
        error: 400,
        show: true
      })
    }
  };


  /**** loading the Error Bar component ****/
  loadErrorBar = () => {
    return(
      <ErrorBar 
        message={this.props.errors.message}
        errorCode={this.props.errors.error}
        open={this.props.errors.show}
        reset={this.props.resetError}
      />
    );
  };

  /**** load login form ****/
  loadLoginForm = () => {
    this.props.history.push('/login');
  };

  /**** login component with input form ****/
  loadRegisterForm = () => {
    return(
       <div className='register-container'>
        <Paper className='login-box'>
          <Avatar className='login-icon'>
            <PersonIcon style={Styles.secondary} color='inherit' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form className='' >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input onChange={this.handleFormChange}  id="username" autoComplete="username" />
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
              <Input onChange={this.handleFormChange}  id="firstName" autoComplete="firstName"/>
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="lastName">Last Name</InputLabel>
              <Input onChange={this.handleFormChange}  id="lastName" autoComplete="lastName"/>
            </FormControl>
            <div className='login-button-container'>
              <Button
                fullWidth
                style={Styles.primary}
                className = 'login-button' 
                onClick = {this.handlesubmit()}
              >
              Sign Up
              </Button>
             </div> 
          </form>
          <div className='registerMessage'> Already registered? <span className='registerLink' onClick={this.loadLoginForm}> Login </span></div>
        </Paper>
        {this.loadErrorBar()}
      </div>     
    );  
  };

  render() {
      const loggedIn = (JSON.parse(localStorage.getItem('user')) !== null);
      if (loggedIn) {
        return (<Redirect to="/orders"/>)
      }
      return ( this.loadRegisterForm() );
  };

}

const mapStateToProps = state => ({
  // user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  onRegister: (user, history) => {
    dispatch(loginSerive.register(user, history));
  },
  receiveError: (error) => {
    dispatch(receiveError(error));
  },
  resetError: () => {
    dispatch(resetError());
  }
});

const RegisterContainer = connect(mapStateToProps, mapDispatchToProps)(Register);
export default RegisterContainer;
