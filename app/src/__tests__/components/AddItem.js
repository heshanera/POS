import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import AddItem from '../../components/AddItem';

configure({adapter: new Adapter()});

describe('AddItem component', () => {
  let component;

  beforeAll(() => {
    component = <AddItem 
                  orderId = {1} 
                  availableItems = {[{
                        itemName:"item1",
                        price:1.5,
                      },
                      {
                        itemName:"item2",
                        price:2.3,
                      },
                      {
                        itemName:"item3",
                        price:1.8,
                      }
                  ]}
                  orderItems = {[{
                        itemName:"item1",
                        price:1.5,
                        count: 1,
                      },
                      {
                        itemName:"item2",
                        price:2.3,
                        count: 1
                      }
                  ]} 
                />
  });

  it('renders without crashing', () => {
    shallow(component);
  });


  it('should display list of all available items ', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('.menuItem')).toHaveLength(3);
  });

  it('should be able to select an item from the item list', () => {
    const wrapper = shallow(component);
    wrapper.find('.add-item-select').simulate('change', {
      target: {
        value: 'itemX,1.6'
      }
    })
    expect(wrapper.state('value')).toEqual('itemX,1.6');
    expect(wrapper.state('itemName')).toEqual('itemX');
    expect(wrapper.state('price')).toEqual('1.6');
  })  

  it('should not add item when the selected item is None', () => {
    const wrapper = shallow(component);
    wrapper.setState({ 
      value:"",
      itemName: "",
      price:"",
      open: false 
    })
    wrapper.find('.add-item-button').simulate('click');
    expect(wrapper.state('open')).toEqual(false);
  })  

  it('should display an alert before adding a selected item', () => {
    const wrapper = shallow(component);
    wrapper.setState({ 
      value:"item1,1.4",
      itemName: "item1",
      price:"1.4",
      open: false 
    })
    wrapper.find('.add-item-button').simulate('click');
    expect(wrapper.state('open')).toEqual(true);
  });

  it('should not add item, but the selected item details should be visible when the alert dialog is canceled', () => {
    const wrapper = shallow(component);
    wrapper.setState({ 
      value:"item1,1.4",
      itemName: "item1",
      price:"1.4",
      open: false 
    })
    wrapper.find('.add-item-button').simulate('click');
    wrapper.find('.cancel-add-item-button').simulate('click');
    expect(wrapper.state('open')).toEqual(false);
    expect(wrapper.state('itemName')).toEqual('item1');
    expect(wrapper.state('price')).toEqual('1.4');
  })

  it('should add the selected item and clear the details when ADD is clicked from the alert dialog', () => {
    const wrapper = shallow(component);
    wrapper.setState({ 
      value:"item1,1.4",
      itemName: "item1",
      price:"1.4",
      open: false 
    })
    wrapper.setProps({ 
      orderId: '5c668dcfa2bf5c19abf5de47',
      addItem: jest.fn(),
    })
    wrapper.find('.add-item-button').simulate('click');
    wrapper.find('.add-add-item-button').simulate('click');
    expect(wrapper.state('open')).toEqual(false);
    expect(wrapper.state('itemName')).toEqual('');
    expect(wrapper.state('price')).toEqual('');
  });

});