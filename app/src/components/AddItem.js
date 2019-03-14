import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Styles from './Styles'
import './App.css'

class AddItem extends Component {

	state = {
		value:"",
    	itemName: "",
    	price:"",
    	count:1,
    	open: false,
	};

	/**** save details of the selected item in the state ****/
  	handleSelectNewItem = () => (event) => {
	    this.setState({ 
	    	value: event.target.value,
	    	itemName: event.target.value.split(',')[0],
	    	price: event.target.value.split(',')[1]
	    });
	};

	/**** calling the add item function ****/
	handleAddNewItem = () => {
	    this.props.addItem(this.props.orderId, this.state.itemName, this.state.price, this.state.count);
	    this.setState({ 
	    	value: '',
	    	itemName: '',
	    	price: '',
	    	open: false,
	    });
	};

	/**** open alert dialog before adding the selected item ****/
	handleAlertOpen = () => {
		if (this.state.itemName !== '')
	    	this.setState({ open: true });	
  	};

  	/**** close the add item alert dialog ****/
	handleAlertClose = () => {
		this.setState({ open: false });
	};

	/**** load alert dialog asking sure to add the selected new item ****/
	loadAddAlert() {
  		return (
  			<Dialog
	          open={this.state.open}
	          onClose={this.handleAlertClose}
	          aria-labelledby="alert-dialog-title"
	          aria-describedby="alert-dialog-description"
	        >
	          <DialogTitle id="add-item-dialog-title">{"Add new item"}</DialogTitle>
	          <DialogContent>
	            <DialogContentText id="alert-dialog-description">
	              Are you sure want to add <b>{this.state.itemName}</b> to the order
	            </DialogContentText>
	          </DialogContent>
	          <DialogActions>
	            <Button style={Styles.secondary} onClick={this.handleAlertClose} color="inherit" className="cancel-add-item-button">
	              Cancel
	            </Button>
	            <Button style={Styles.primary} onClick={this.handleAddNewItem} color="inherit"  className="add-add-item-button">
	              Add
	            </Button>
	          </DialogActions>
	        </Dialog>
  		);
  	};

  	/**** load all available items to the select list ****/
	loadAllAvailableItems = () => {
		return (
			this.props.availableItems.map((item, index) => {
				return( 
					<MenuItem className='menuItem' key={index} value={item.itemName+','+item.price} disabled={this.props.orderItems.findIndex(addedItem => addedItem.name === item.itemName) >= 0}>
						{item.itemName} <span className='select-item-price'>$ {item.price}</span>
					</MenuItem>
				);			            	
            })
		);
	};

	/**** component containing  add item list and the add button ****/
  	loadAddItem = () => {
		return(
			<div className="add-item-inner-container">
	            <FormControl className="add-item-input">
		          	<Select 
		          		className="add-item-select"
			          	value={this.state.value} 
			            onChange={this.handleSelectNewItem()}
			            displayEmpty 
			            name="itemName"
		          	>
		            	<MenuItem value=''><em>None</em></MenuItem>
		            	{this.loadAllAvailableItems()}
		          	</Select>
		          	<FormHelperText>Add New</FormHelperText>
		        </FormControl>
		        <div className="add-item-button-container">
      				<Button 
      					style={Styles.primary} 
		          		className="add-item-button"
		          		onClick = {this.handleAlertOpen}
		          	>
			        	<AddIcon/> 
			        </Button>
		        </div>
		        {this.loadAddAlert()}
		    </div>    
		);
		
  	}

	render() {
	    return ( this.loadAddItem() );
	}
};


export default AddItem;