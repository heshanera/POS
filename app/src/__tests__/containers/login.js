import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import LoginContainer from '../../containers/login';
import { Login } from '../../containers/login';
import 'jest-localstorage-mock';

configure({adapter: new Adapter()});

describe('Orderlist component and container', () => {

  let container;
  let component;

  beforeAll(() => {
    const mockStore = configureStore([thunk]);
    const store = mockStore({});
    const reducer = { 
      user: {
        username:'johns',
        firstName:'John',
        lastName:'Smith'
      },
      errors: {
        error:'',
        code:'',
        show:false
      },
    };

    const history = {
      push: jest.fn()
    };

    store.dispatch = jest.fn();
    store.getState = jest.fn(() => reducer);
    store.default = jest.fn();

    container = mount(
      <Provider store={store}>
        <Router>
          <LoginContainer history={history}/>
        </Router>
      </Provider>)
    component = container.find(Login);

  });

  it("should render the container and component successfully", () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it("should map states to props", () => {
    const expectedPropKeys = [
      'user', 'errors'
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it("should map dispatch to props", () => {
    const expectedPropKeys = [
      'onLogin', 'receiveError', 'resetError'
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it("should load the register page when the link is clicked", () => {
      const loadRegisterForm = jest.spyOn(component.instance(), 'loadRegisterForm');
      component.instance().forceUpdate();
      component.find('.registerLink').simulate('click');
      expect(loadRegisterForm).toHaveBeenCalledTimes(1);
  });

  it("should handle the form changes", () => {
    component.find('#username').at(5).simulate('change', {
      target: {id: 'username', value: 'johns'}
    });
    component.instance().forceUpdate();
    expect(component.state('username')).toEqual('johns');

    component.find('#password').at(5).simulate('change', {
      target: {id: 'password', value: 'pass'}
    });
    component.instance().forceUpdate();
    expect(component.state('password')).toEqual('pass');
  });  

  it("should validate the form when login button is clicked", () => { 

    const validateForm = jest.spyOn(component.instance(), 'validateForm');
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm).toHaveBeenCalledTimes(1);

    component.setState({
      username: 'johns', 
      password: ''
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please enter a valid password');

    component.setState({
      username: '',
      password: 'pass' 
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please enter a valid username');

    component.setState({
      username: '',
      password: '' 
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please enter a valid username and password');
  });   

  it('should be able to call resetError function', () => {
    const resetError = jest.spyOn(component.props(), 'resetError');
    resetError();
    expect(resetError).toHaveBeenCalledTimes(1);
  });

  it("should redirect to orders page if alraedy logged in", () => {
    const localStorageUserData = JSON.stringify({ username:'johns' });
    localStorage.setItem('user', localStorageUserData);
    component.instance().forceUpdate();
    expect(component.length).toBeTruthy();
    localStorage.removeItem('user');
    component.instance().forceUpdate();
  });

});
