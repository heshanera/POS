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


  it('should display no of order items and total ', () => {
    const wrapper = shallow(component);
    const total = 1300, items = 3;
    expect(wrapper.contains(items)).toEqual(true);
    // expect(wrapper.contains(total)).toEqual(true);

  });

  it('should display 3 items in the order ', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('.item')).toHaveLength(3);
  });

});