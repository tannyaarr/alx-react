import React from 'react';
import { render } from '@testing-library/react';
import NotificationItem from './NotificationItem';

describe('<NotificationItem />', () => {
  it('renders without crashing', () => {
    render(<NotificationItem />);
  });

  it('renders with dummy type and value props', () => {
    const { getByText } = render(<NotificationItem type="default" value="test" />);
    expect(getByText('test')).toBeInTheDocument();
  });

  it('renders with dummy html prop', () => {
    const html = { __html: '<u>test</u>' };
    const { getByText } = render(<NotificationItem html={html} />);
    expect(getByText('test')).toBeInTheDocument();
  });
});