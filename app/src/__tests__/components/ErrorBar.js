import React from 'react';
import ReactDOM from 'react-dom';
import { configure, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import ErrorBar from '../../components/ErrorBar';

configure({ adapter: new Adapter() });

describe('ErrorBar component', () => {
  let component;

  beforeAll(() => {
    component = <ErrorBar message="This is an error message" errorCode={400} open={false} reset={jest.fn()} />;
  });

  it('renders without crashing', () => {
    shallow(component);
  });

  it('should display error message and the error code', () => {
    const wrapper = shallow(component, { disableLifecycleMethods: true });
    expect(wrapper.instance().props.message).toEqual('This is an error message');
    expect(wrapper.instance().props.errorCode).toEqual(400);
  });

  it('should close the error message bar', () => {
    const wrapper = shallow(component);
    wrapper.setState({
      close: true,
    });
    wrapper.find('.error-bar').simulate('click');
    expect(wrapper.state('close')).toEqual(false);
  });
});
