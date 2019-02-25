import React, { Component } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Item from './Item';
import AddItem from './AddItem'
import './App.css'


class Order extends Component {

	state = { item: "" };

  	loadOrder = () => {
		return(

			<ExpansionPanel key={this.props.orderId} expanded={this.props.orderExpanded === this.props.orderId} onChange={this.props.handleExpand(this.props.orderId)}>
	          <ExpansionPanelSummary className="order-container">
	            <span className="order-id">
	            	Order: 
	            	<span className="order-value-container">
	            		{'#' + this.props.orderId.substring(15)}
	            	</span>	
	            </span>
	            <span className="order-items">
	            	Items:
	            	<span className="order-value-container">
	            		{this.props.noOfItems}
	            	</span>	
	            </span>
	            <span className="order-total">
	            	Total:
	            	<span className="order-value-container">
	            		{'$ ' + this.props.orderTotal}
	            	</span>
	            </span>
	          </ExpansionPanelSummary>
	          <ExpansionPanelDetails className="order-detail">
	            <div className="wrapper">
		            {this.props.orderItems.map((item, index) => {
						return(
							<Item 
								key = {index}
								className="item"
								itemId = {item._id} 
								itemName = {item.name} 
								itemPrice = {item.price}
								orderId = {this.props.orderId}
								orderSize = {this.props.noOfItems}
								removeItem = {this.props.removeItem}
								updateItem = {this.props.updateItem}
								availableItems = {this.props.availableItems}
								itemCount = {item.count}
							/>
		            	)
					})}
				</div>
	          </ExpansionPanelDetails>
	          {/*	
	          <ExpansionPanelDetails className="add-item-container">
	          	<AddItem 
	          		availableItems={this.props.availableItems} 
	          		orderId={this.props.orderId} 
	          		addItem={this.props.addItem}
	          		orderItems={this.props.orderItems}
	          	/>
	          </ExpansionPanelDetails>
	      		*/}
	        </ExpansionPanel>    	
		);
		
  	}

	render() {
	    return ( this.loadOrder() );
	}
}


export default Order;