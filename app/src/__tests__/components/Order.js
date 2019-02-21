import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Order from '../../components/Order';

configure({adapter: new Adapter()});

describe('Order component', () => {
  let component;

  beforeAll(() => {
    component = <Order 
                  orderId = "12qwdgsad261eggd2513fghasd"
                  noOfItems = {3} 
                  orderTotal = {1300} 
                  orderItems = {[{
                                    id: 1,
                                    name: "item1",
                                    price: 300
                                  },
                                  {
                                    id: 2,
                                    name: "item2",
                                    price: 400
                                  },
                                  {
                                    id: 3,
                                    name: "item3",
                                    price: 600
                                  }]} 
                  availableItems = {[{
                                        id:1,
                                        itemName:"item1",
                                        price:"$300",
                                      },
                                      {
                                        id:2,
                                        itemName:"item2",
                                        price:"$400",
                                      },
                                      {
                                        id:3,
                                        itemName:"item3",
                                        price:"$600",
                                      }]} 
                  orderExpanded = {true}
                  handleExpand = {jest.fn()}
                />
  });

  it('renders without crashing', () => {
    shallow(component);
  });


  it('should display order id, number of items and total', () => {
    const wrapper = shallow(component);
    const orderId = '#'+("12qwdgsad261eggd2513fghasd".substring(15));
    expect(wrapper.find('.order-id').containsMatchingElement(orderId)).toBeTruthy();
    expect(wrapper.find('.order-items').containsMatchingElement(3)).toBeTruthy();
    expect(wrapper.find('.order-total').containsMatchingElement('$ 1300')).toBeTruthy();
  });

  it('should display 3 items in the order', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('.item')).toHaveLength(3);
  });

  it('should display item name and the price', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('.item')).toHaveLength(3);
  });

});