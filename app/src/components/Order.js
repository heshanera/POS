/* eslint-disable react/no-array-index-key */
/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';

import Item from './Item';
import './App.css';

class Order extends Component {
  loadOrder = () => {
    const {
      orderId,
      orderExpanded,
      handleExpand,
      noOfItems,
      orderTotal,
      orderItems,
      removeItem,
      updateItem,
      availableItems,
    } = this.props;

    return (
      <ExpansionPanel key={orderId} expanded={orderExpanded === orderId} onChange={handleExpand(orderId)}>
        <ExpansionPanelSummary className="order-container">
          <span className="order-id">
            Order:
            <span className="order-value-container">{`#${orderId.substring(15)}`}</span>
          </span>
          <span className="order-items-container">
            <div className="order-items">
              Items:
              <span className="order-value-container">{noOfItems}</span>
            </div>
          </span>
          <span className="order-total-container">
            <div className="order-total">
              Total:
              <span className="order-value-container">{`$ ${orderTotal}`}</span>
            </div>
          </span>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails className="order-detail">
          <div className="wrapper">
            {orderItems.map((item, index) => (
              <Item
                key={index}
                className="item"
                itemId={item._id}
                itemName={item.name}
                itemPrice={item.price}
                orderId={orderId}
                orderSize={noOfItems}
                removeItem={removeItem}
                updateItem={updateItem}
                availableItems={availableItems}
                itemCount={item.count}
              />
            ))}
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
  };

  render() {
    return this.loadOrder();
  }
}

Order.propTypes = {
  orderId: PropTypes.string.isRequired,
  orderExpanded: PropTypes.string.isRequired,
  handleExpand: PropTypes.func.isRequired,
  noOfItems: PropTypes.number.isRequired,
  orderTotal: PropTypes.number.isRequired,
  orderItems: PropTypes.array.isRequired,
  removeItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
  availableItems: PropTypes.array.isRequired,
};

export default Order;
