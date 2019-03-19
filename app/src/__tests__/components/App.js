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
import 'jest-localstorage-mock';

configure({adapter: new Adapter()});

describe('App component', () => {
  let component;
  let container;

  beforeAll(() => {  
    const mockStore = configureStore([thunk]);
    const store = mockStore({
      errors: {
        open: false
      }
    });
    container = mount(
      <Provider store={store}>
        <Router>
          <App />
        </Router>
      </Provider>
    )
    component = container.find(App);

  });

  it('should renders without crashing', () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

});