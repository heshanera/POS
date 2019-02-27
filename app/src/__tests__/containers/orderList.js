import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
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
  let wrapper

  beforeAll(() => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});

    const user = {
      username:'johns',
      firstName: 'John',
      lastName: 'Smith'
    };
    const userOrders = {
      id:1,
      orderList: [
        {
          _id:'12qwdgsad261eggd2513fghasd767',
          items:[
            {
              id: 1,
              name: "item1",
              price: 1.4,
              count: 1
            }
          ],
          noOfItems:1,
          total:1.4,
          CreatedDate:"09.02.2018",
          status:"pending"
        },
        {
          _id:'12qwdgsad261eggd2513fghasd345',
          items:[
            {
              id: 1,
              name: "item1",
              price: 1.4,
              count: 1
            },
            {
              id: 2,
              name: "item2",
              price: 2.3,
              count: 1
            }
          ],
          noOfItems:2,
          total:3.7,
          CreatedDate:"09.02.2018",
          status:"pending"
        }
      ]
    }
    const itemList = [
      {
        itemName:'item1', 
        price:1.4, 
        image:{
          contentType: "image/jpeg", 
          image:{
            type: "Buffer", 
            data:[255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 72, 0, 72]
          }
        }
      },
      {
        itemName:'item2', 
        price:2.3, 
        image:{
          contentType: "image/png", 
          image:{
            type: "Buffer", 
            data:[225, 206, 12, 124, 20, 34, 61, 29, 23, 70, 0, 23, 1, 9, 0, 38, 10, 73]
          }
        }
      }
    ];


    const reducer = { 
      user: user,
      userOrders: userOrders,
      items:itemList, 
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

    wrapper = shallow(
      <OrderList
        user={user}
        userOrders={userOrders}
      />
    );

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
      'addOrder', 'removeItem', 'updateItem', 'addItem', 'logout',
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it("should display the order list, header and the order add button when logged in", () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
       {user:{ username:'johns' }};
    });
    const loadOrderList = jest.spyOn(component.instance(), "loadOrderList");
    const loadHeader = jest.spyOn(component.instance(), "loadHeader");
    const loadAddContainers = jest.spyOn(component.instance(), "loadAddContainers");
    component.instance().forceUpdate();
    expect(loadOrderList).toHaveBeenCalledTimes(1);
    expect(loadHeader).toHaveBeenCalledTimes(1);
    expect(loadAddContainers).toHaveBeenCalledTimes(1);
  });  

  it("should calculate the total price from the list of items", () => {
    JSON.parse = jest.fn().mockImplementationOnce(() => {
      {user:{username:'johns'}};
    });
    const items = [
      {
        id: 1,
        name: "item1",
        price: 2.5,
        count: 1,
      },
      {
        id: 3,
        name: "item3",
        price: 1.5,
        count: 2,
      }
    ]
    const handleTotalPrice = jest.spyOn(component.instance(), "handleTotalPrice");
    component.instance().forceUpdate();
    expect(handleTotalPrice).toHaveBeenCalledTimes(2);
    expect(component.instance().handleTotalPrice(items)).toEqual("5.50");
  });

  it("should keep the details of expanded order id in the state", () => {
    component.instance().handleExpand('12qwdgsad261eggd2513fghasd767')({}, true);
    expect(component.instance().state.orderId).toEqual('12qwdgsad261eggd2513fghasd767');
  });  

});

