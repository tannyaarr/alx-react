import React from 'react';
import { mount } from 'enzyme';
import WithLogging from './WithLogging';

// Mock console.log
console.log = jest.fn();

describe('WithLogging HOC', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should log mount and unmount messages with "Component" when wrapped element is pure HTML', () => {
    const WrappedComponent = () => <div>Hello World</div>;
    const WithLoggingComponent = WithLogging(WrappedComponent);
    const wrapper = mount(<WithLoggingComponent />);

    expect(console.log).toHaveBeenCalledWith('Component is mounted');
    
    wrapper.unmount();
    expect(console.log).toHaveBeenCalledWith('Component is going to unmount');
  });

  it('should log mount and unmount messages with component name when wrapped element is Login', () => {
    const Login = () => <div>Login Component</div>;
    const WithLoggingLogin = WithLogging(Login);
    const wrapper = mount(<WithLoggingLogin />);

    expect(console.log).toHaveBeenCalledWith('Component Login is mounted');

    wrapper.unmount();
    expect(console.log).toHaveBeenCalledWith('Component Login is going to unmount');
  });
});