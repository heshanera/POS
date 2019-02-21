import React, { Component } from 'react';
import DeleteIcon from  '@material-ui/icons/CancelSharp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
// import { MuiThemeProvider } from '@material-ui/core/styles';
// import themes from "./ColorTheme"

import './App.css'


class Item extends Component {

	state = { open: false };

  	handleAlertOpen = () => {
    	this.setState({ open: true });
  	};

	handleAlertClose = () => {
		this.setState({ open: false });
	};

	handleRemoveMessage = (orderSize) => {
		if (orderSize === 1) {
			return (
			<span>
				Are you sure want to remove <b>{this.props.itemName}</b> from the order? Removing this will delete this order!
			</span>
			)
		} 
		return (
			<span>
				Are you sure want to remove <b>{this.props.itemName}</b> from the order?
			</span>
		)
	};

	handleRemoveItem = () => {
		this.props.removeItem(this.props.orderId,this.props.itemId);
		this.setState({ open: false });
	};

	loadDeleteAlert = () => {
		return (
  			<Dialog
	          open={this.state.open}
	          onClose={this.handleAlertClose}
	          aria-labelledby="alert-dialog-title"
	          aria-describedby="alert-dialog-description"
	        >
	          <DialogTitle id="delete-dialog-title">{"Remove Item"}</DialogTitle>
	          <DialogContent>
	            <DialogContentText id="alert-dialog-description">
	              {this.handleRemoveMessage(this.props.orderSize)}
	            </DialogContentText>
	          </DialogContent>
	          <DialogActions>
	            <Button onClick={this.handleAlertClose} color="inherit" className="delete-item-cancel">
	              <b>Cancel</b>
	            </Button>
	            <Button onClick={this.handleRemoveItem} color="inherit" className="delete-item-delete">
	              <b>Remove</b>
	            </Button>    
	          </DialogActions>
	        </Dialog>
  		);
	};

  	loadItem = () => {

    	return(						
			<div key={this.props.itemId} className="order-item-container">
			  <span className="delete-item" onClick={this.handleAlertOpen}>
			  	<DeleteIcon />
			  </span>
			  <div className="order-item-container-header"> 
			  	<p>{this.props.itemName}</p>
			  </div>
			  <div className="order-item-name">
			    <p className="secondary-color">${this.props.itemPrice}</p>
			  </div>
			  {this.loadDeleteAlert()}
			</div>
    	)

  	};

	render() {
	    return (
	    	<div>
	      		{this.loadItem()}
	    	</div>
	    );
	}
}


export default Item;