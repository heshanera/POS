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

import loginSerive from '../services/loginService';
import orderService from '../services/orderService';



class LoginComponent extends Component {

  state = { username:'', password:'' };

  validateForm = () => {
    return(
      this.state.username.length > 0 &&
      this.state.password.length > 0
    );  
  };

  handleFormChange = event => {
    this.setState({
      [event.target.id]: event.target.value
    });
  };

  handlesubmit = state => (event) => {
    const { username, password } = this.state;
    this.props.onLogin(username, password, this.props.history);
    this.props.loadData(username, this.props.history);
  };

  loadSignIn = () => {

    return(
       <div className='login-container'>
        <Paper className='login-box'>
          <Avatar className='login-icon'>
            <LockOutlinedIcon color='inherit' />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <form className='' >
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="username">Username</InputLabel>
              <Input onChange={this.handleFormChange}  id="username" autoComplete="username" autoFocus />
            </FormControl>
            <FormControl margin="normal" required fullWidth>
              <InputLabel htmlFor="password">Password</InputLabel>
              <Input onChange={this.handleFormChange} type="password" id="password" autoComplete="current-password" />
            </FormControl>
            <div className='login-button-container'>
              <Button
                fullWidth
                variant = "contained"
                color = "inherit"
                className = 'login-button'  
                disabled = {!this.validateForm()}
                onClick = {this.handlesubmit()}
              >
              Sign In
              </Button>
             </div> 
          </form>
        </Paper>
      </div>     
    );  
  };

  render() {
      return ( this.loadSignIn() );
  };

}

const mapStateToProps = state => ({
  user: state.user,
});

const mapDispatchToProps = dispatch => ({
  onLogin: (username, password, history) => {
    dispatch(loginSerive.fetchUser({username, password}, history));
  },
  loadData: (username, history) => {
    dispatch(orderService.fetchOrders(username, history))
  }
});

const LoginContainer = connect(mapStateToProps, mapDispatchToProps)(LoginComponent);
export default LoginContainer;