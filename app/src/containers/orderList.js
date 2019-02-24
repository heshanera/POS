import React, { Component } from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
import { Redirect } from 'react-router'

import Order from '../components/Order';
import Header from '../components/Header';
import loginService from '../services/loginService';
import orderService from '../services/orderService';
import '../components/App.css'

export class OrderList extends Component {

	state = { expanded: null };

  	handleExpand = panel => (event, expanded) => {
    	this.setState({
      		expanded: expanded ? panel : false,
    	});
  	};

  	handleRemoveItem = event => {
  		return this.props.removeItem;
  	};

    handleAddItem = event => {
      return this.props.addItem;
    };

    handleUpdateItem = event => {
      return this.props.updateItem;
    };

  	handleTotalPrice = (itemList) => {
  		let total = 0;
  		for (let item of itemList) {
  			total += (Number(item.price)*Number(item.count));
  		}
  		return total.toFixed(2);
  	};

    handleTotalCount = (itemList) => {
      let total = 0;
      for (let item of itemList) {
        total += Number(item.count);
      }
      return total;
    };

  	loadOrderList = () => {
    	const { expanded } = this.state;
  		return this.props.userOrders.orderList.map((order) => {
  			return(
  				<Order
  					key = {order._id}
  					orderId = {order._id} 
  					noOfItems = {this.handleTotalCount(order.items)} 
  					orderTotal = {this.handleTotalPrice(order.items)} 
  					orderItems = {order.items} 
  					availableItems = {this.props.items} 
  					orderExpanded = {expanded}
  					handleExpand = {this.handleExpand}
  					removeItem = {this.handleRemoveItem()}
            addItem = {this.handleAddItem()}
            updateItem = {this.handleUpdateItem()}
  				/>
  			);
		  });
  	};

  	loadHeader = () => {
  		return (
  			<Header 
  				logout = {this.props.logout}
	  			firstName = {this.props.user.firstName} 
	  			lastName = {this.props.user.lastName}
  			/>
  		)	
  	};


  	authorizedLogin = () => {
  		const loggedIn = (JSON.parse(localStorage.getItem('user')) !== null);
    	if (loggedIn) {
    		// console.log('logged In');
    		return (
		    	<div>
		    		<div className="header">
		    			{this.loadHeader()}
					</div>
			    	<div className="order-list-container">
			      		{this.loadOrderList()}
			    	</div>
			    </div>	
		    );
    	} else {
    		return (<Redirect to="/login"/>)
    	}
  	};

	render() {
	    return(this.authorizedLogin())
	}
}


const mapStateToProps = state => ({
  userOrders: state.userOrders,
	items: state.items,
	user: state.user,
});

const mapDispatchToProps = dispatch => ({
  removeItem: (orderId, itemId) => {
  		dispatch(orderService.removeItem(orderId,itemId));
  },
  addItem: (orderId, itemName, price, count) => {
      dispatch(orderService.addItem(orderId, itemName, price, count)); 
  },
  updateItem: (orderId, itemName, price, count) => {
      dispatch(orderService.updateItem(orderId, itemName, price, count)); 
  },
  logout: () => {
  		dispatch(loginService.logout);
  },
});


export default connect(mapStateToProps, mapDispatchToProps)(OrderList);