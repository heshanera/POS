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
    }

    store.dispatch = jest.fn();
    store.getState = jest.fn(() => reducer);
    store.default = jest.fn();

    container = mount(
      <Provider store={store}>
        <Router>
          <LoginContainer />
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
      'user'
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  it("should map dispatch to props", () => {
    const expectedPropKeys = [
      'onLogin'
    ];
    expect(Object.keys(component.props())).toEqual(expect.arrayContaining(expectedPropKeys));
  });

  // it("should disable the login button until username and password fields are filed", () => {
  //   expect(component.find('Button').props().disabled).toEqual(true);
  //   component.instance().setState({
  //     username: 'johns',
  //     password: 'test' 
  //   });
  //   const validateForm = jest.spyOn(component.instance(), "validateForm");
  //   expect(component.instance().validateForm()).toBeTruthy();
  // });  
});
