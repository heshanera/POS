import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';

class ErrorBar extends Component {
  constructor() {
    super();
    this.state = {
      open: false,
    };
  }

  static getDerivedStateFromProps(props, state) {
    let { open } = props;
    if (state.close) {
      open = false;
    }
    return {
      open,
      close: false,
    };
  }

  handleClose = () => {
    const { reset } = this.props;
    this.setState({ close: true });
    reset();
  };

  loadMessageBar = () => {
    const { open } = this.state;
    const { message, errorCode } = this.props;

    return (
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={open}
        autoHideDuration={6000}
        onClose={this.handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        className="error-bar"
        message={
          <span className="error-text" id="message-id">
            {message}
          </span>
        }
        onClick={this.handleClose}
        action={[
          <Button color="secondary" key="code" size="small">
            {`error: ${errorCode}`}
          </Button>,
          <IconButton key="close" aria-label="Close" color="inherit" className="close-error">
            <CloseIcon />
          </IconButton>,
        ]}
      />
    );
  };

  render() {
    return this.loadMessageBar();
  }
}

ErrorBar.propTypes = {
  open: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  errorCode: PropTypes.string.isRequired,
  reset: PropTypes.func.isRequired,
};

export default ErrorBar;
