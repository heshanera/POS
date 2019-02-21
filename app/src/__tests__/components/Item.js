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
    component = <Item 
                    itemId={1} 
                    itemName='itemX' 
                    itemPrice={130} 
                    handleRemove={jest.fn()}
                />
  });

  it('renders without crashing', () => {
    shallow(component);
  });

  it('should display item name and price', () => {
     const wrapper = shallow(component);
     const name = 'itemX';
     const price = 130;
     expect(wrapper.contains(name)).toEqual(true);
     expect(wrapper.contains(price)).toEqual(true);
  });

  it('should display an alert when try to delete an item', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      open: false 
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.state('open')).toEqual(true);
  });

  it('should ask the messege to delete the item from the alert', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      open: false 
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
      open: false 
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
      open: false 
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.state('open')).toEqual(true);
    wrapper.find('.delete-item-cancel').simulate('click');
    expect(wrapper.state('open')).toEqual(false);
  });

  it('should delete the item when the delete is clicked from the alert', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      open: false 
    })
    wrapper.setProps({
      removeItem: jest.fn(),
    })
    wrapper.find('.delete-item').simulate('click');
    expect(wrapper.state('open')).toEqual(true);
    wrapper.find('.delete-item-delete').simulate('click');
    expect(wrapper.state('open')).toEqual(false);
  });

});
