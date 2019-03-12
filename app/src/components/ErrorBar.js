import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';


class ErrorBar extends Component {

  state = {
    open: false
  };

  handleClose = () => {
    this.setState({ close: true });
    this.props.reset();
  };

  loadMessageBar = () => {
    return(
      <Snackbar
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          open={this.state.open}
          autoHideDuration={6000}
          onClose={this.handleClose}
          ContentProps={{
            'aria-describedby': 'message-id',
          }}
          className='error-bar'
          message={<span className="error-text" id="message-id">{this.props.message}</span>}
          onClick={this.handleClose}
          action={[
            <Button color="secondary" key='code' size="small">
              {'Status Code: ' + this.props.errorCode}
            </Button>,
            <IconButton
              key="close"
              aria-label="Close"
              color="inherit"
              className="close-error"
            >
              <CloseIcon />
            </IconButton>,
          ]}
        />
    );
  }

  render() {
    return this.loadMessageBar();
  };

  static getDerivedStateFromProps(props, state) {
    let open = props.open;
    if (state.close) open = false;
    return {
      open: open,
      close: false
    }
  };
}

export default ErrorBar;