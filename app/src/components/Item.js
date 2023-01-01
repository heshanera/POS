/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DeleteIcon from '@material-ui/icons/CancelSharp';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import Divider from '@material-ui/core/Divider';
import Styles from './Styles';
import './App.css';

class Item extends Component {
  constructor() {
    super();

    const { itemCount, itemPrice } = this.props;
    this.state = {
      openDeleteAlert: false,
      openEditAlert: false,
      itemCount,
      totalPrice: (itemPrice * itemCount).toFixed(2),
    };
  }

  handleAlertOpen = (state) => () => {
    this.setState({ [state]: true });
  };

  handleAlertClose = (state) => () => {
    this.setState({ [state]: false });
  };

  handleCountChange = (event) => {
    const { itemPrice } = this.props;

    this.setState({
      itemCount: event.target.value,
      totalPrice: (itemPrice * event.target.value).toFixed(2),
    });
  };

  handleRemoveMessage = (orderSize) => {
    const { itemName } = this.props;

    if (orderSize === 1) {
      return (
        <span>
          Are you sure want to remove <b>{itemName}</b> from the order? Removing this will delete this order!
        </span>
      );
    }
    return (
      <span>
        Are you sure want to remove <b>{itemName}</b> from the order?
      </span>
    );
  };

  handleRemoveItem = () => {
    const { removeItem, orderId, itemId } = this.props;

    removeItem(orderId, itemId);
    this.setState({ openDeleteAlert: false });
  };

  handleUpdateItem = () => {
    const { updateItem, orderId, itemName, itemPrice, itemCount } = this.props;

    updateItem(orderId, itemName, itemPrice, itemCount);
    this.setState({ openEditAlert: false });
  };

  loadDeleteAlert = () => {
    const { orderSize } = this.props;
    const { openDeleteAlert } = this.state;

    return (
      <Dialog
        open={openDeleteAlert}
        onClose={this.handleAlertClose('openDeleteAlert')}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="delete-dialog-title">Remove Item</DialogTitle>
        <Divider style={Styles.titleDivider} />
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{this.handleRemoveMessage(orderSize)}</DialogContentText>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            style={Styles.secondary}
            onClick={this.handleAlertClose('openDeleteAlert')}
            color="inherit"
            className="delete-item-cancel"
          >
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
    const { availableItems } = this.props;

    const itemData = availableItems.find((item) => item.itemName === itemName);
    if (itemData) {
      if (itemData.image !== undefined) {
        const image = `data:${itemData.image.contentType};base64,${Buffer.from(itemData.image.image).toString(
          'base64',
        )}`;
        return (
          <img className="item-image" src={image} alt="Img" />
          // <img className='item-image'alt='Img'/>
        );
      }
      return <img className="item-image" alt="Img" />;
    }
    return null;
  };

  loadItemCountAlert = () => {
    const { openEditAlert, itemCount, totalPrice } = this.state;
    const { itemName } = this.props;

    return (
      <Dialog open={openEditAlert} onClose={this.handleAlertClose('openEditAlert')} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">{itemName}</DialogTitle>
        <Divider style={Styles.titleDivider} />
        <DialogContent>
          <DialogContentText> </DialogContentText>

          <div className="update-item-img">{this.loadImage(itemName)}</div>
          <div className="update-item-counter">
            <p className="total-price">${totalPrice} </p>
            <TextField
              label="Count: "
              value={itemCount}
              onChange={this.handleCountChange}
              type="number"
              className="item-counter"
              InputLabelProps={{ shrink: true }}
              inputProps={{ min: '1', step: '1' }}
              margin="normal"
            />
          </div>
        </DialogContent>
        <Divider />
        <DialogActions>
          <Button
            style={Styles.secondary}
            onClick={this.handleAlertClose('openEditAlert')}
            className="update-item-cancel"
          >
            Cancel
          </Button>
          <Button style={Styles.primary} onClick={this.handleUpdateItem} className="update-item-update">
            Update
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  loadItemCounter = (itemCount) => (
    <span>
      <p className="item-count" onClick={this.handleAlertOpen('openEditAlert')}>
        {itemCount}
      </p>
      {this.loadItemCountAlert()}
    </span>
  );

  loadItem = () => {
    const { itemId, itemName, itemCount, itemPrice } = this.props;

    return (
      <div key={itemId} className="order-item-container">
        <span className="delete-item" onClick={this.handleAlertOpen('openDeleteAlert')}>
          <DeleteIcon />
        </span>
        <div className="item-count-container">{this.loadItemCounter(itemCount)}</div>
        <div className="order-item-container-header">
          <p>{this.loadImage(itemName)}</p>
        </div>
        <div className="order-item-info">
          <p className="order-item-name">{itemName}</p>
          <p className="order-item-price">${itemPrice}</p>
        </div>
        {this.loadDeleteAlert()}
      </div>
    );
  };

  render() {
    return <div>{this.loadItem()}</div>;
  }
}

Item.propTypes = {
  itemPrice: PropTypes.number.isRequired,
  itemName: PropTypes.string.isRequired,
  removeItem: PropTypes.func.isRequired,
  orderId: PropTypes.string.isRequired,
  itemId: PropTypes.string.isRequired,
  itemCount: PropTypes.number.isRequired,
  updateItem: PropTypes.func.isRequired,
  orderSize: PropTypes.number.isRequired,
  availableItems: PropTypes.array.isRequired,
};

export default Item;
