import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import OrderListContainer from '../../containers/orderList';
import { OrderList } from '../../containers/orderList';

configure({adapter: new Adapter()});

describe('Orderlist component and container', () => {

  let container;
  let component;

  beforeAll(() => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    const reducer = { 
      user: {username:'johns'},
      userOrders: {
        id:1,
        orderList: [
          {
            _id:'12qwdgsad261eggd2513fghasd767',
            items:[
              {
                id: 1,
                name: "item1",
                price: 300
              },
              {
                id: 3,
                name: "item3",
                price: 600
              }
            ],
            noOfItems:2,
            total:900,
            CreatedDate:"09.02.2018",
            status:"pending"
          },
          {
            _id:'12qwdgsad261eggd2513fghasd345',
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
              }
            ],
            noOfItems:2,
            total:700,
            CreatedDate:"09.02.2018",
            status:"pending"
          }
        ]
      },
      items:[], 
    }

    store.dispatch = jest.fn();
    store.getState = jest.fn(() => reducer);
    store.default = jest.fn();

    container = mount(
      <Provider store={store}>
        <Router>
          <OrderListContainer />
        </Router>
      </Provider>)
    component = container.find(OrderList);

  });

  it("should render the container and component successfully", () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it("should map states to props", () => {
    const expectedPropKeys = [
      'user', 'userOrders', 'items',
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it("should map dispatch to props", () => {
    const expectedPropKeys = [
      'removeItem', 'addItem', 'logout',
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it("should display the order list and the header when logged in", () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      {user:{username:'johns'}};
    });
    const loadOrderList = jest.spyOn(component.instance(), "loadOrderList");
    const loadHeader = jest.spyOn(component.instance(), "loadHeader");
    component.instance().forceUpdate();
    expect(loadOrderList).toHaveBeenCalledTimes(1);
    expect(loadHeader).toHaveBeenCalledTimes(1);
  });  

  it("should calculate the total price from the list of items", () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      {user:{username:'johns'}};
    });
    const items = [
      {
        id: 1,
        name: "item1",
        price: 300
      },
      {
        id: 3,
        name: "item3",
        price: 600
      }
    ]
    const handleTotalPrice = jest.spyOn(component.instance(), "handleTotalPrice");
    component.instance().forceUpdate();
    expect(handleTotalPrice).toHaveBeenCalledTimes(2);
    expect(component.instance().handleTotalPrice(items)).toEqual(900);
  });


});

