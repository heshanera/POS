import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Item from '../../components/Item';

configure({adapter: new Adapter()});

describe('Item component', () => {
  let component;

  beforeAll(() => {

    const itemList = [{
      itemName:'itemX', 
      price:1.3, 
      image:{
        contentType: "image/jpeg", 
        image:{
          type: "Buffer", 
          data:[255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 72, 0, 72]
        }
      }
    }]

    component = <Item 
                    itemId={1} 
                    itemName='itemX' 
                    itemPrice={1.3} 
                    handleRemove={jest.fn()}
                    handleUpdateItem={jest.fn()}
                    availableItems={itemList}
                    itemCount={2}
                />
  });

  it('renders without crashing', () => {
    shallow(component);
  });

  it('should display image of the item', () => {
     const wrapper = shallow(component);
     expect(wrapper.find('.item-image').containsMatchingElement(<img />)).toBeTruthy();
  });

  it('should display empty image container if the image data is not given', () => {
    const itemData = [{
      itemName:'itemX', 
      price:1.3, 
    }]

    const item = <Item 
        itemId={1} 
        itemName='itemX' 
        itemPrice={1.3} 
        handleRemove={jest.fn()}
        handleUpdateItem={jest.fn()}
        availableItems={itemData}
        itemCount={2}
    />
    const wrapper = shallow(item);
    expect(wrapper.find('.item-image').find('img').first().props('src')).toEqual({"alt": "Img", "className": "item-image"});
  });  

  it('should not load image when item details are not given', () => {

    const itemData = [{
      itemName:'itemY', 
      price:1.3, 
    }]
    const item = <Item 
        itemId={1} 
        itemName='itemX' 
        itemPrice={1.3} 
        handleRemove={jest.fn()}
        handleUpdateItem={jest.fn()}
        availableItems={itemData}
        itemCount={2}
    />    
    const wrapper = shallow(item);
    expect(wrapper.find('.item-image').containsMatchingElement(<img />)).toBeFalsy();
  });  

  it('should display item count', () => {
     const wrapper = shallow(component);
     expect(wrapper.find('.item-count').containsMatchingElement(2)).toBeTruthy();
  });  

  it('should display item name and price', () => {
     const wrapper = shallow(component);
     const name = 'itemX';
     const price = 1.3;
     expect(wrapper.contains(name)).toEqual(true);
     expect(wrapper.contains(price)).toEqual(true);
  });

  it('should display a dialog when clicked on the item count', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openEditAlert: false 
    })
    wrapper.find('.item-count').simulate('click');
    expect(wrapper.state('openEditAlert')).toEqual(true);
  });

  it('should display the item image, counter and the price in the dialog', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openEditAlert: false 
    })
    wrapper.find('.item-count').simulate('click');
    expect(wrapper.state('openEditAlert')).toEqual(true);
    expect(wrapper.find('.update-item-img').containsMatchingElement(<img />)).toBeTruthy();
    expect(wrapper.find('.total-price').containsMatchingElement(<p>$2.60</p>)).toBeTruthy();
    expect(wrapper.find('.item-counter').props().value).toEqual(2);
  });

  it('should update the item count from the dialog update button', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openEditAlert: false 
    })
    wrapper.setProps({
      updateItem: jest.fn(),
    })
    wrapper.find('.item-count').simulate('click');
    wrapper.find('.item-counter').simulate('change', { target: { value: 4 } })
    wrapper.find('.update-item-update').simulate('click');
    expect(wrapper.state('openEditAlert')).toEqual(false);
    expect(wrapper.state('itemCount')).toEqual(4);
  });  

  it('should display an alert when try to delete an item', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openDeleteAlert: false 
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.state('openDeleteAlert')).toEqual(true);
  });

  it('should ask the messege to delete the item from the alert', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openDeleteAlert: false 
    })
    wrapper.setProps({
      orderSize: 2,
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.find('#alert-dialog-description').containsMatchingElement(
      <span>Are you sure want to remove <b>itemX</b> from the order?</span>
    )).toBeTruthy()
  }); 

  it('should ask the messege to delete the order if the last item of the order is deleted', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openDeleteAlert: false 
    })
    wrapper.setProps({
      orderSize: 1,
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.find('#alert-dialog-description').containsMatchingElement(
      <span>Are you sure want to remove <b>itemX</b> from the order? Removing this will delete this order!</span>
    )).toBeTruthy()
  });  

  it('should close the delete alert when the cancel is clicked', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openDeleteAlert: false 
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.state('openDeleteAlert')).toEqual(true);
    wrapper.find('.delete-item-cancel').simulate('click');
    expect(wrapper.state('openDeleteAlert')).toEqual(false);
  });

  it('should delete the item when the delete is clicked from the alert', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      openDeleteAlert: false 
    })
    wrapper.setProps({
      removeItem: jest.fn(),
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.state('openDeleteAlert')).toEqual(true);
    wrapper.find('.delete-item-delete').simulate('click');
    expect(wrapper.state('openDeleteAlert')).toEqual(false);
  });

});
