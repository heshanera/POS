import React, { Component } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import ErrorBar from '../components/ErrorBar'
import { receiveError, resetError } from '../actions/errorActions';
import loginSerive from '../services/loginService';
import Styles from '../components/Styles'


export class Login extends Component {

  state = { 
    username:'', 
    password:'' 
  };

  /**** frontend validation check the fields are filled or not ****/
  validateForm = () => {
    // if username field is empty
    if (this.state.username.length === 0) {
      // if password field is empty
      if (this.state.password.length === 0) {
        return "Please enter a valid username and password"
      } 
      // only the username field is empty
      return "Please enter a valid username"
    // only the password field is empty
    } else if (this.state.password.length === 0) {
      return "Please enter a valid password"
    } else return "";  
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
      const { username, password } = this.state;
      this.props.onLogin(username, password, this.props.history)
    } else {
      this.props.receiveError({
        error: msg,
        code: 400,
        show: true
      })
    }
  };


  /**** loading the Error Bar component ****/
  loadErrorBar = () => {
    // console.log(this.props.errors.show);
    return(
      <ErrorBar 
        message={this.props.errors.error}
        errorCode={this.props.errors.code}
        open={this.props.errors.show}
        reset={this.props.resetError}
      />
    );
  };

  /**** login component with input form ****/
  loadSignIn = () => {
    return(
       <div className='login-container'>
        <Paper className='login-box'>
          <Avatar className='login-icon'>
            <LockOutlinedIcon style={Styles.secondary} color='inherit' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className='' >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input onChange={this.handleFormChange}  id="username" autoComplete="username" className='test123' />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={this.handleFormChange} type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <div className='login-button-container'>
              <Button
                fullWidth
                style={Styles.primary}
                className = 'login-button' 
                onClick = {this.handlesubmit()}
              >
              Sign In
              </Button>
             </div> 
          </form>
        </Paper>
        {this.loadErrorBar()}
      </div>     
    );  
  };

  render() {
      return ( this.loadSignIn() );
  };

}

const mapStateToProps = state => ({
  user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password, history) => {
    dispatch(loginSerive.fetchUser({username, password}, history));
  },
  receiveError: (error) => {
    dispatch(receiveError(error));
  },
  resetError: () => {
    dispatch(resetError());
  }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(Login);
export default LoginContainer;