import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Checkbox from '@material-ui/core/Checkbox';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Item from './Item'

import './App.css'

class AddOrder extends Component {
  state = {
    openAddOrder: false,
  };

  handleClickOpen = () => {
    this.setState({ AddOrder: true });
  };

  handleClose = () => {
    this.setState({ AddOrder: false });
  };

   handleCheck = name => event => {
    this.setState({ [name]: event.target.checked });
  };


  loadImage = (itemName) => {
    const itemData = this.props.availableItems.find(item => item.itemName == itemName);
    const image = "data:"+itemData.image.contentType+";base64," + Buffer.from(itemData.image.image).toString('base64');
    return(
      // <img className='item-image' src={image} />
      <span>test</span>
    );
  };

  loadOrderAddOrderDialog = () => {
    return(
      <Dialog
          open={this.state.AddOrder}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
          fullWidth={true}
          maxWidth = {'lg'}
        >
          <DialogTitle id="form-dialog-title">Add Order</DialogTitle>
          <DialogContent>
            <DialogContentText>

            </DialogContentText>
            
            <div className="wrapper2">
              {this.props.availableItems.map((item, index) => {
                return(
                  <div className='order-item-container'>

                    <div className='order-check-box'>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={this.state.checkedB}
                            onChange={this.handleCheck('checkedB')}
                            value="checkedB"
                            color="primary"
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
          <DialogActions>
          <Button onClick={this.handleClose} color="inherit">
            <b>Cancel</b>
          </Button>
          <Button onClick={this.handleClose} color="inherit">
            <b>Add</b>
          </Button>
        </DialogActions>
      </Dialog>
    );
  };

  loadAddOrderButton = () => {
    return(
      <div>
        <Fab variant="outlined" onClick={this.handleClickOpen}>
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