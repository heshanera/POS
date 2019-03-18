import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Divider from '@material-ui/core/Divider';

import Styles from './Styles'
import './App.css'

class AddOrder extends Component {
  state = {
    openAddOrder: false,
    selected: {},
    orderItems: [],
  };

  handleClickOpen = () => {
    const selected = this.state.selected;
    this.props.availableItems.map(item => selected[item._id] = false );
    this.setState({ 
      openAddOrder: true,
      selected:selected 
    });
  };

  handleClose = () => {
    this.setState({ openAddOrder: false });
  };

  handleCheck = item => event => {

    let orderItems = this.state.orderItems
    const selected = this.state.selected;
    selected[item._id] = !selected[item._id]

    if(selected[item._id]) {
      // add item to the order
      orderItems.push({
        name: item.itemName,
        price: item.price,
        count: 1
      });
    } else {
      // remove item from the order
      orderItems = orderItems.filter(orderItem => orderItem.name !== item.itemName);
    }

    this.setState({
      selected: selected, 
      orderItems: orderItems
    });
  };

  handleOrderCreate = () => {
    if (this.state.orderItems.length > 0) {
      const order = {
        items:this.state.orderItems,
        status: "pending"
      }
      this.props.addOrder(order);
      this.setState({ openAddOrder: false });  
    }   
  };


  loadImage = (itemName) => {
    const itemData = this.props.availableItems.find(item => item.itemName === itemName);
    const image = "data:"+itemData.image.contentType+";base64," + Buffer.from(itemData.image.image).toString('base64');
    return(
      // <img className='item-image' src={image} alt='Img'/>
      <img className='item-image' alt='Img'/>
    );
  };

  loadOrderAddOrderDialog = () => {
    return(
      <Dialog
          open={this.state.openAddOrder}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth = {'lg'}
        >
          <DialogTitle id="form-dialog-title">Order</DialogTitle>
          <Divider style={Styles.titleDivider}/>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            
            <div className="wrapper2">
              {this.props.availableItems.map((item, index) => {
                return(
                  <div 
                    key={index}
                    className='order-item-container' 
                    onClick={this.handleCheck(item)}
                    variant="contained"
                  >
                    <div className='order-check-box'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.selected[item._id]}
                            value={item._id}
                            color="default"
                          />
                        }
                      />
                    </div>  

                    <div className="order-item-container-header"> 
                      <p>{this.loadImage(item.itemName)}</p>
                    </div>
                    <div className="order-item-info">
                      <p className="order-item-name">{item.itemName}</p>
                      <p className="order-item-price">${item.itemPrice}</p>
                    </div>
                  </div>
                )
              })}
            </div>

          </DialogContent>
          <Divider />
          <DialogActions className="add-order-action-container">
          <Button style={Styles.secondary} onClick={this.handleClose} className="cancel-create-order-button">
            Cancel
          </Button>
          <Button style={Styles.primary} onClick={this.handleOrderCreate} className="create-order-button">
            <b>Create Order</b>
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  loadAddOrderButton = () => {
    return(
      <div>
        <Fab  style={Styles.primary} className="add-order-button" onClick={this.handleClickOpen}>
          <AddIcon />
        </Fab>
        {this.loadOrderAddOrderDialog()}
      </div>
    );
  };

  render() {
    return (
      <div className="add-order-button-container">
        {this.loadAddOrderButton()}
      </div>
    );
  }
}

export default AddOrder;