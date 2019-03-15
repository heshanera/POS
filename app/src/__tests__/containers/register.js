import React from 'react';
import { Provider } from 'react-redux';
import { mount } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowserRouter as Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk'
import RegisterContainer from '../../containers/register';
import { Register } from '../../containers/register';

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
          <RegisterContainer history={history}/>
        </Router>
      </Provider>)
    component = container.find(Register);

  });

  it("should render the container and component successfully", () => {
    expect(container.length).toBeTruthy();
    expect(component.length).toBeTruthy();
  });

  it("should map states to props", () => {
    const expectedPropKeys = [
      'errors'
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it("should map dispatch to props", () => {
    const expectedPropKeys = [
      'onRegister', 'receiveError', 'resetError'
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
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

    component.find('#confirmedPass').at(5).simulate('change', {
      target: {id: 'confirmedPass', value: 'pass'}
    });
    component.instance().forceUpdate();
    expect(component.state('confirmedPass')).toEqual('pass');

    component.find('#firstName').at(5).simulate('change', {
      target: {id: 'firstName', value: 'John'}
    });
    component.instance().forceUpdate();
    expect(component.state('firstName')).toEqual('John');

    component.find('#lastName').at(5).simulate('change', {
      target: {id: 'lastName', value: 'Smith'}
    });
    component.instance().forceUpdate();
    expect(component.state('lastName')).toEqual('Smith');
  });  

  it("should validate the form when login button is clicked", () => { 

    const validateForm = jest.spyOn(component.instance(), 'validateForm');
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm).toHaveBeenCalledTimes(1);

    component.setState({
      username: ''
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please enter a valid username');

    component.setState({
      username: 'johns',
      password: ''
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please enter a valid password');

    component.setState({
      username: 'johns',
      password: 'pass',
      confirmedPass: ''  
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please confirm the password');

    component.setState({
      username: 'johns',
      password: 'pass',
      confirmedPass: 'pass', 
      firstName: ''
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please enter the first name');

    component.setState({
      username: 'johns',
      password: 'pass',
      confirmedPass: 'pass',
      firstName: 'johns', 
      lastName: ''
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Please enter the last name');

    component.setState({
      username: 'johns',
      password: 'pass',
      confirmedPass: 'passs',
      firstName: 'johns',
      lastName: 'smith'
    });
    component.instance().forceUpdate();
    component.find('.login-button').at(0).simulate('click');
    expect(validateForm()).toEqual('Passwords does not match');
  });   

  it('should be able to call resetError function', () => {
    const resetError = jest.spyOn(component.props(), 'resetError');
    resetError();
    expect(resetError).toHaveBeenCalledTimes(1);
  });

  it("should load the login page when the link is clicked", () => {
      const loadLoginForm = jest.spyOn(component.instance(), 'loadLoginForm');
      component.instance().forceUpdate();
      component.find('.registerLink').simulate('click');
      expect(loadLoginForm).toHaveBeenCalledTimes(1);
  });

  it("should redirect to orders page if alraedy logged in", () => {
    const localStorageUserData = JSON.stringify({ username:'johns' });
    Storage.prototype.getItem = jest.fn((data) => {
      if (data === 'user') return localStorageUserData;
    });
    component.instance().forceUpdate();
    expect(component.length).toBeTruthy();
    Storage.prototype.getItem = jest.fn((data) => {
      if (data === 'user') return null;
    });
    component.instance().forceUpdate();
    Storage.prototype.getItem.mockRestore();
  });
});
