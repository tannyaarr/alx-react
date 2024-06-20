import React, { Component } from 'react';

const WithLogging = (WrappedComponent) => {
  class WithLoggingComponent extends Component {
    componentDidMount() {
      console.log(`Component ${this.getComponentName()} is mounted`);
    }

    componentWillUnmount() {
      console.log(`Component ${this.getComponentName()} is going to unmount`);
    }

    getComponentName() {
      return WrappedComponent.displayName || WrappedComponent.name || 'Component';
    }

    render() {
      return <WrappedComponent {...this.props} />;
    }
  }

  // Set displayName for better debugging
  WithLoggingComponent.displayName = `WithLogging(${WithLoggingComponent.getComponentName()})`;

  return WithLoggingComponent;
};

export default WithLogging;