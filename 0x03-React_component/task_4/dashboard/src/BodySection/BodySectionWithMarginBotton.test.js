import React from 'react';
import { shallow } from 'enzyme';
import BodySectionWithMarginBottom from './BodySectionWithMarginBottom';
import BodySection from './BodySection/BodySection';

describe('<BodySectionWithMarginBottom />', () => {
  it('renders a BodySection component with correct props', () => {
    const title = 'test title';
    const children = <p>test children node</p>;
    const wrapper = shallow(
      <BodySectionWithMarginBottom title={title}>
        {children}
      </BodySectionWithMarginBottom>
    );
    expect(wrapper.find(BodySection)).toHaveLength(1);
    expect(wrapper.find(BodySection).prop('title')).toEqual(title);
    expect(wrapper.find(BodySection).prop('children')).toEqual(children);
  });

  it('applies CSS margin-bottom correctly', () => {
    const title = 'test title';
    const children = <p>test children node</p>;
    const wrapper = shallow(
      <BodySectionWithMarginBottom title={title}>
        {children}
      </BodySectionWithMarginBottom>
    );
    expect(wrapper.hasClass('bodySectionWithMargin')).toBe(true);
    expect(wrapper.find(BodySection).hasClass('bodySection')).toBe(true);
  });
});