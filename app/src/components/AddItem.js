import React, { Component } from 'react';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';
import AddIcon from '@material-ui/icons/Add';

import './App.css'



class AddItem extends Component {

	state = {
    	item: "",
	};

  	handleAddNewItem = order => (event, order) => {
	    this.setState({ [event.target.name]: event.target.value });
	};


	loadAllAvailableItems = () => {
		return (
			this.props.availableItems.map((item) => {
				return( 
					<MenuItem className='menuItem' key={item.id} value={item.id}>
						{item.itemName}: {item.price}
					</MenuItem>
				);			            	
            })
		);
	};

  	loadAddItem = () => {
		return(
			<div className="add-item-inner-container">
	            <FormControl className="add-item-input">
		          	<Select 
			          	value={this.state.item} 
			            onChange={this.handleAddNewItem(this.props.orderId)}
			            displayEmpty 
			            name="item"
		          	>
		            	<MenuItem value=""><em>None</em></MenuItem>
		            	{this.loadAllAvailableItems()}
		          	</Select>
		          	<FormHelperText>Add New</FormHelperText>
		        </FormControl>
		        <div className="add-item-button-container">
		          	<Button variant="outlined" size="large" color="inherit" className="">
			        	<AddIcon /> 
			        </Button>
		        </div>
		    </div>    
		);
		
  	}

	render() {
	    return ( this.loadAddItem() );
	}
}


export default AddItem;