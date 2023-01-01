/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
// eslint-disable-next-line import/no-extraneous-dependencies
import { Redirect } from 'react-router';

import Order from '../components/Order';
import Header from '../components/Header';
import AddItem from '../components/AddItem';
import AddOrder from '../components/AddOrder';
import ErrorBar from '../components/ErrorBar';
import loginService from '../services/loginService';
import orderService from '../services/orderService';
import { resetError } from '../actions/errorActions';

import '../components/App.css';

export class OrderList extends Component {
  constructor() {
    super();
    this.state = {
      expanded: null,
      orderId: '',
    };
  }

  handleExpand = (panel) => (event, expanded) => {
    this.setState({
      expanded: expanded ? panel : false,
    });

    if (expanded) {
      this.setState({
        orderId: panel,
      });
    }
  };

  handleAddOrder = () => {
    const { addOrder } = this.props;
    return addOrder;
  };

  handleRemoveItem = () => {
    const { removeItem } = this.props;
    return removeItem;
  };

  handleAddItem = () => {
    const { addItem } = this.props;
    return addItem;
  };

  handleUpdateItem = () => {
    const { updateItem } = this.props;
    return updateItem;
  };

  handleTotalPrice = (itemList) => {
    let total = 0;
    itemList.forEach((item) => {
      total += Number(item.price) * Number(item.count);
    });
    return total.toFixed(2);
  };

  handleTotalCount = (itemList) => {
    let total = 0;
    itemList.forEach((item) => {
      total += Number(item.count);
    });
    return total;
  };

  handleLogout = () => {
    const { logout, history } = this.props;
    logout(history);
  };

  loadHeader = () => {
    const { user } = this.props;

    return <Header logout={this.handleLogout} firstName={user.firstName} lastName={user.lastName} />;
  };

  loadOrderList = () => {
    const { expanded } = this.state;
    const { userOrders, items } = this.props;

    return userOrders.orderList.map((order) => (
      <Order
        key={order._id}
        orderId={order._id}
        noOfItems={this.handleTotalCount(order.items)}
        orderTotal={this.handleTotalPrice(order.items)}
        orderItems={order.items}
        availableItems={items}
        orderExpanded={expanded}
        handleExpand={this.handleExpand}
        removeItem={this.handleRemoveItem()}
        addItem={this.handleAddItem()}
        updateItem={this.handleUpdateItem()}
      />
    ));
  };

  loadAddOrder = () => {
    const { items } = this.props;

    return <AddOrder availableItems={items} addOrder={this.handleAddOrder()} />;
  };

  loadAddOrderItem = () => {
    const { userOrders, items } = this.props;
    const { orderId } = this.state;

    const order = userOrders.orderList.filter((orderData) => orderData._id === orderId)[0];
    if (order) {
      return (
        <div className="global-add-item-container">
          <AddItem availableItems={items} orderId={orderId} addItem={this.handleAddItem()} orderItems={order.items} />
        </div>
      );
    }
    return this.loadAddOrder();
  };

  loadAddContainers = () => {
    const { expanded } = this.state;

    if (expanded) {
      return this.loadAddOrderItem();
    }
    return this.loadAddOrder();
  };

  /** ** loading the Error Bar component *** */
  loadErrorBar = () => {
    const { errors } = this.props;

    return <ErrorBar message={errors.message} errorCode={errors.error} open={errors.show} reset={resetError} />;
  };

  authorizedLogin = () => {
    const loggedIn = JSON.parse(localStorage.getItem('user') || null) !== null;
    if (loggedIn) {
      return (
        <div>
          <div className="header">{this.loadHeader()}</div>
          <div className="order-list-container">{this.loadOrderList()}</div>
          <div>{this.loadAddContainers()}</div>
          {this.loadErrorBar()}
        </div>
      );
    }
    return <Redirect to="/login" />;
  };

  render() {
    return this.authorizedLogin();
  }
}

const mapStateToProps = (state) => ({
  userOrders: state.userOrders,
  items: state.items,
  user: state.user,
  errors: state.errors,
});

const mapDispatchToProps = (dispatch) => ({
  removeItem: (orderId, itemId) => {
    dispatch(orderService.removeItem(orderId, itemId));
  },
  addOrder: (order) => {
    dispatch(orderService.addOrder(order));
  },
  addItem: (orderId, itemName, price, count) => {
    dispatch(orderService.addItem(orderId, itemName, price, count));
  },
  updateItem: (orderId, itemName, price, count) => {
    dispatch(orderService.updateItem(orderId, itemName, price, count));
  },
  logout: (history) => {
    dispatch(loginService.logout(history));
  },
  resetError: () => {
    dispatch(resetError());
  },
});

OrderList.propTypes = {
  history: PropTypes.object.isRequired,
  errors: PropTypes.object.isRequired,
  userOrders: PropTypes.object.isRequired,
  items: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  logout: PropTypes.func.isRequired,
  addOrder: PropTypes.func.isRequired,
  removeItem: PropTypes.func.isRequired,
  addItem: PropTypes.func.isRequired,
  updateItem: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(OrderList);
