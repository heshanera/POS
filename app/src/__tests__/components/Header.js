import React from 'react';
import { configure } from 'enzyme';
import { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Header from '../../components/Header';

configure({adapter: new Adapter()});

describe('Header component', () => {
  let component;

  beforeAll(() => {
    component = <Header 
                    logout = {jest.fn()}
                    firstName='Heshan' 
                    lastName='Eranga'
                />
  });

  it('renders without crashing', () => {
    shallow(component);
  });

  it('should display the users first name and last name', () => {
    const wrapper = shallow(component);
    expect(wrapper.find('.nameUser').containsMatchingElement(<span>Heshan Eranga</span>)).toBeTruthy()
  });

  it('should display an alert when the logout button is clicked', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      open: false 
    })
    wrapper.find('.exit-icon').simulate('click');
    expect(wrapper.state('open')).toEqual(true);
  });  

  it('should close the logout alert when the cancel is clicked', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      open: false 
    })
    wrapper.find('.exit-icon').simulate('click');
    expect(wrapper.state('open')).toEqual(true);
    wrapper.find('.logout-cancel').simulate('click');
    expect(wrapper.state('open')).toEqual(false);
  });

  it('should call the logout function when the logout button is clicked', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      open: false 
    })
    wrapper.find('.exit-icon').simulate('click');
    const logout = jest.spyOn(wrapper.instance(), "handleLogout");
    wrapper.instance().forceUpdate();
    wrapper.find('.logout-logout').simulate('click');
    expect(logout).toHaveBeenCalledTimes(1);
  });

});