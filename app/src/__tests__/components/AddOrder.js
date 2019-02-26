import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddOrder from '../../components/AddOrder';

configure({adapter: new Adapter()});

describe('AddOrder component', () => {
  let component;

  beforeAll(() => {
    component = <AddOrder 
                  availableItems = {[
                      {
                        _id:1,
                        itemName:"item1",
                        price:1.5,
                        image:{
                          contentType: "image/jpeg", 
                          image:{
                            type: "Buffer", 
                            data:[255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 72, 0, 72]
                          }
                        }
                      },
                      {
                        _id:2,
                        itemName:"item2",
                        price:2.3,
                        image:{
                          contentType: "image/png", 
                          image:{
                            type: "Buffer", 
                            data:[225, 206, 12, 124, 20, 34, 61, 29, 23, 70, 0, 23, 1, 9, 0, 38, 10, 73]
                          }
                        }
                      },
                      {
                        _id:3,
                        itemName:"item3",
                        price:1.8,
                        image:{
                          contentType: "image/jpg", 
                          image:{
                            type: "Buffer", 
                            data:[23, 65, 45, 98, 56, 34, 56, 67, 98, 56, 23, 23, 1, 156, 0, 38, 233, 56]
                          }
                        }
                      }
                  ]}
                  addOrder={jest.fn()}
                />
  });

  it('should renders without crashing', () => {
    shallow(component);
  });


  it('should display all available items when the button is clicked', () => {
    const wrapper = shallow(component);
    wrapper.setState({ 
      openAddOrder: false,
      selected: {},
      orderItems: [],
    })
    wrapper.find('.add-order-button').simulate('click');
    expect(wrapper.state('openAddOrder')).toEqual(true);
  });

  it('should not add order no items are selected', () => {
    const wrapper = shallow(component);
    wrapper.setState({ 
      openAddOrder: false,
      selected: {},
      orderItems: [],
    })
    wrapper.find('.add-order-button').simulate('click');
    wrapper.find('.create-order-button').simulate('click');
    expect(wrapper.state('openAddOrder')).toEqual(true);
  })  

  it('should add the item to the order item list when the item is clicked', () => {
    const wrapper = shallow(component);
    wrapper.setState({ 
      openAddOrder: false,
      selected: {},
      orderItems: [],
    })
    wrapper.find('.add-order-button').simulate('click');
    wrapper.find('.order-item-container').at(0).simulate('click', { _id: 1, itemName: 'item1', price: 1.5 })
    wrapper.find('.order-item-container').at(1).simulate('click', { _id: 2, itemName: 'item2', price: 2.3 })
    wrapper.find('.order-item-container').at(0).simulate('click', { _id: 1, itemName: 'item1', price: 1.5 })
    expect(wrapper.state('selected')).toEqual({ '1': false, '2': true, '3': false });
    expect(wrapper.state('orderItems').length).toEqual(1);
    expect(wrapper.state('orderItems')[0]).toEqual({ name: 'item2', price: 2.3, count: 1 });    
  });

});