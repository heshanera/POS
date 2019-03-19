import React, { Component } from 'react';
import DeleteIcon from  '@material-ui/icons/CancelSharp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Styles from './Styles'
import './App.css'


class Item extends Component {

	state = { 
		openDeleteAlert: false, 
		openEditAlert: false,
		itemCount: this.props.itemCount,
		totalPrice: ((this.props.itemPrice * this.props.itemCount).toFixed(2)),
	};

  	handleAlertOpen = (state) => () => {
    	this.setState({ [state]: true });
  	};

	handleAlertClose = (state) => () => {
		this.setState({ [state]: false });
	};

	handleCountChange = event => {
	    this.setState({
	      	itemCount: event.target.value,
	      	totalPrice: (this.props.itemPrice * event.target.value).toFixed(2),
		});
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
		this.setState({ openDeleteAlert: false });
	};

	handleUpdateItem = () => {
		this.props.updateItem(this.props.orderId,this.props.itemName,this.props.itemPrice,this.state.itemCount);
		this.setState({ openEditAlert: false });
	};

	loadDeleteAlert = () => {
		return (
  			<Dialog
	          open={this.state.openDeleteAlert}
	          onClose={this.handleAlertClose('openDeleteAlert')}
	          aria-labelledby="alert-dialog-title"
	          aria-describedby="alert-dialog-description"
	        >
	          <DialogTitle id="delete-dialog-title">{"Remove Item"}</DialogTitle>
	          <Divider style={Styles.titleDivider}/>
	          <DialogContent>
	            <DialogContentText id="alert-dialog-description">
	              {this.handleRemoveMessage(this.props.orderSize)}
	            </DialogContentText>
	          </DialogContent>
	          <Divider />
	          <DialogActions>
	            <Button style={Styles.secondary} onClick={this.handleAlertClose('openDeleteAlert')} color="inherit" className="delete-item-cancel">
	              Cancel
	            </Button>
	            <Button style={Styles.primary} onClick={this.handleRemoveItem} color="inherit" className="delete-item-delete">
	              Remove
	            </Button>    
	          </DialogActions>
	        </Dialog>
  		);
	};

	loadImage = (itemName) => {
		const itemData = this.props.availableItems.find(item => item.itemName === itemName);	
		if (itemData) {
			if (itemData.image !== undefined ) {
				const image = "data:"+itemData.image.contentType+";base64," + Buffer.from(itemData.image.image).toString('base64');
				return(
					<img className='item-image' src={image} alt='Img'/>
					// <img className='item-image'alt='Img'/>
				);
			} else return (<img className='item-image'alt='Img'/>);
		}
	};

	loadItemCountAlert = () => {
  		return (
  			<Dialog
	          open={this.state.openEditAlert}
	          onClose={this.handleAlertClose('openEditAlert')}
	          aria-labelledby="form-dialog-title"
	        >
	          <DialogTitle id="form-dialog-title">{this.props.itemName}</DialogTitle>
	          <Divider style={Styles.titleDivider}/>
	          <DialogContent>
	            <DialogContentText> </DialogContentText>

	            <div className="update-item-img">
	            	{this.loadImage(this.props.itemName)}
	            </div>
	            <div className="update-item-counter">
		            <p className="total-price">${this.state.totalPrice} </p>
					<TextField
						label="Count: "
						value={this.state.itemCount}
						onChange={this.handleCountChange}
						type="number"
						className="item-counter"
						InputLabelProps={{shrink: true}}
						inputProps={{ min: "1", step: "1" }}
						margin="normal"
				    />
				</div>    

	          </DialogContent>
	          <Divider />
	          <DialogActions>
	            <Button  style={Styles.secondary} onClick={this.handleAlertClose('openEditAlert')} className="update-item-cancel">
	              Cancel
	            </Button>
	            <Button style={Styles.primary} onClick={this.handleUpdateItem} className="update-item-update">
	              Update
	            </Button>
	          </DialogActions>
	        </Dialog>
  		);

	};

	loadItemCounter = (itemCount) => {
		return(
			<span>
				<p className="item-count" onClick={this.handleAlertOpen('openEditAlert')}>
					{itemCount}
				</p>
				{this.loadItemCountAlert()}
			</span>
		);
	};

  	loadItem = () => {

    	return(						
			<div key={this.props.itemId} className="order-item-container">
			  <span className="delete-item" onClick={this.handleAlertOpen('openDeleteAlert')}>
			  	<DeleteIcon />
			  </span>
			  <div className="item-count-container">
			  	{this.loadItemCounter(this.props.itemCount)}
			  </div>
			  <div className="order-item-container-header"> 
			  	<p>{this.loadImage(this.props.itemName)}</p>
			  </div>
			  <div className="order-item-info">
			  	<p className="order-item-name">{this.props.itemName}</p>
			    <p className="order-item-price">${this.props.itemPrice}</p>
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