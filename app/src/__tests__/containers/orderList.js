import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';

import OrderListContainer from '../../containers/orderList';
import { OrderList } from '../../containers/orderList';

configure({adapter: new Adapter()});

const storeFake = state => {
  return {
    default: jest.fn(),
    subscribe: jest.fn(),
    dispatch: jest.fn(),
    getState: () => state,
  };
};

describe('OrderList container and component', () => {
  let wrapper;
  let component;
  let container;

  beforeEach(() => {
    jest.resetAllMocks();

    const store = storeFake({

      userOrders: {
        id:1,
        orderList: [
          {
            id:1,
            items:[
              {
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
              }
            ],
            noOfItems:3,
            total:1300,
            CreatedDate:"09.02.2018",
            status:"pending"
          }
        ]
      },
      items: [
        {
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
        }
      ]


    });

    wrapper = mount(
      <Provider store={store}>
        <Router>
          <OrderListContainer />
        </Router>
      </Provider>
    );

    container = wrapper.find(OrderListContainer);
    // component = container.find(OrderList);
  });

  it('should render both the container and the component ', () => {
    expect(container.length).toBeTruthy();
    // expect(component.length).toBeTruthy();
  });

  // it('should map state to props', () => {
  //   const expectedPropKeys = [
  //     'user'
  //   ];

  //   expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  // });

  // it('should map dispatch to props', () => {
  //   const expectedPropKeys = ['load'];

  //   expect(Object.keys(container.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  // });
});