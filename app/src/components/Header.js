/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-static-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DesktopWindows from '@material-ui/icons/DesktopWindows';
import PersonIcon from '@material-ui/icons/PersonPin';
import ExitIcon from '@material-ui/icons/ExitToApp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Divider from '@material-ui/core/Divider';
import Styles from './Styles';
import './App.css';

class Header extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  handleAlertOpen = () => {
    this.setState({ open: true });
  };

  handleAlertClose = () => {
    this.setState({ open: false });
  };

  handleLogout = () => () => {
    const { logout } = this.props;
    logout();
  };

  loadLogoutAlert() {
    const { open } = this.state;

    return (
      <Dialog
        open={open}
        onClose={this.handleAlertClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="logout-dialog-title">Logout</DialogTitle>
        <Divider style={Styles.titleDivider} />
        <DialogContent className="logout-alert">
          <DialogContentText id="alert-dialog-description">Are you sure want to logout?</DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button style={Styles.secondary} onClick={this.handleAlertClose} color="inherit" className="logout-cancel">
            Cancel
          </Button>
          <Button style={Styles.primary} onClick={this.handleLogout()} color="inherit" className="logout-logout">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    );
  }

  loadHeader() {
    const { firstName, lastName } = this.props;

    return (
      <div>
        <span className="menu-icon">
          <DesktopWindows />
        </span>
        <span className="exit-icon" onClick={this.handleAlertOpen}>
          <ExitIcon />
        </span>
        <span className="nameUser">
          {firstName} {lastName}
        </span>
        <span className="person-icon">
          <PersonIcon />
        </span>
        {this.loadLogoutAlert()}
      </div>
    );
  }

  render() {
    return <div>{this.loadHeader()}</div>;
  }
}

Header.propTypes = {
  firstName: PropTypes.string.isRequired,
  lastName: PropTypes.string.isRequired,
  logout: PropTypes.func.isRequired,
};

export default Header;
