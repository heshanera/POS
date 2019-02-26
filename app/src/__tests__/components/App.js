import React from 'react';
import ReactDOM from 'react-dom';
import { configure } from 'enzyme';
import { mount } from 'enzyme';
import { shallow } from 'enzyme';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import { BrowserRouter as Router } from 'react-router-dom';
import thunk from 'redux-thunk'
import Adapter from 'enzyme-adapter-react-16';
import App from '../../components/App';
import OrderList from '../../containers/orderList';
import Login from '../../containers/login';

configure({adapter: new Adapter()});

describe('App component', () => {
	let component;
	let container;

	beforeAll(() => {  
	const mockStore = configureStore([thunk]);
    const store = mockStore({});
 //    const user = {username:'johns'};
 //    const userOrders = {
 //      id:1,
 //      orderList: [
 //        {
 //          _id:'12qwdgsad261eggd2513fghasd767',
 //          items:[
 //            {
 //              id: 1,
 //              name: "item1",
 //              price: 1.4,
 //              count: 1
 //            }
 //          ],
 //          noOfItems:1,
 //          total:1.4,
 //          CreatedDate:"09.02.2018",
 //          status:"pending"
 //        },
 //        {
 //          _id:'12qwdgsad261eggd2513fghasd345',
 //          items:[
 //            {
 //              id: 1,
 //              name: "item1",
 //              price: 1.4,
 //              count: 1
 //            },
 //            {
 //              id: 2,
 //              name: "item2",
 //              price: 2.3,
 //              count: 1
 //            }
 //          ],
 //          noOfItems:2,
 //          total:3.7,
 //          CreatedDate:"09.02.2018",
 //          status:"pending"
 //        }
 //      ]
 //    }
 //    const itemList = [
 //      {
 //        itemName:'item1', 
 //        price:1.4, 
 //        image:{
 //          contentType: "image/jpeg", 
 //          image:{
 //            type: "Buffer", 
 //            data:[255, 216, 255, 224, 0, 16, 74, 70, 73, 70, 0, 1, 1, 1, 0, 72, 0, 72]
 //          }
 //        }
 //      },
 //      {
 //        itemName:'item2', 
 //        price:2.3, 
 //        image:{
 //          contentType: "image/png", 
 //          image:{
 //            type: "Buffer", 
 //            data:[225, 206, 12, 124, 20, 34, 61, 29, 23, 70, 0, 23, 1, 9, 0, 38, 10, 73]
 //          }
 //        }
 //      }
 //    ];


 //    const reducer = { 
 //      user: user,
 //      userOrders: userOrders,
 //      items:itemList, 
 //    }

 //    store.dispatch = jest.fn();
 //    store.getState = jest.fn(() => reducer);
 //    store.default = jest.fn();

    container = mount(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>)
    component = container.find(App);






	});

	it('should renders without crashing', () => {
		expect(container.length).toBeTruthy();
    	expect(component.length).toBeTruthy();
	});

	it('routes / to Login', () => {
	  expect(container.find('Route[exact=true][path="/"]').first().prop('component')).toBe(Login);
	});

	it('routes /login to Login', () => {
	  // const wrapper = shallow(component);
	  // expect(wrapper.find('Route[exact=true][path="/login"]').first().prop('component')).toBe(Login);
	});

	// it('routes /orders to Order List', () => {
	//   const wrapper = shallow(component);
	//   expect(wrapper.find('Route[path="/orders"]').first().prop('component')).toBe(OrderList);
	// });

});