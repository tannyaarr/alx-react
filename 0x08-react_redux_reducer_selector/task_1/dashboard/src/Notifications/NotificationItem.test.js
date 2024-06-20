import React from "react";
import NotificationItem from "./NotificationItem";
import { shallow } from "enzyme";

describe("NotificationItem component tests", () => {
  it("renders NotificationItem component without crashing", () => {
    const wrapper = shallow(<NotificationItem />);

    expect(wrapper.exists()).toBe(true);
  });

  it('renders correct html from type="default" value="test" props', () => {
    const wrapper = shallow(<NotificationItem id={1} type="default" value="test" />);

    expect(wrapper.find('li').prop('className')).toEqual('NotificationItem_default');
    expect(wrapper.find('li').prop('onClick')).toBeDefined();
    expect(wrapper.html()).toEqual('<li class="NotificationItem_default">test</li>');
  });

  it('renders correct html from html="<u>test</u>" props', () => {
    const wrapper = shallow(<NotificationItem id={1} html="<u>test</u>" />);

    expect(wrapper.find('li').prop('className')).toEqual('NotificationItem_urgent');
    expect(wrapper.find('li').prop('onClick')).toBeDefined();
    expect(wrapper.html()).toEqual('<li class="NotificationItem_urgent"><u>test</u></li>');
  });

  it('calls markAsRead with the right ID argument when clicked', () => {
    const markAsReadSpy = jest.fn();
    const wrapper = shallow(
      <NotificationItem id={1} type="default" value="Test notification" markAsRead={markAsReadSpy} />
    );
    wrapper.find('li').simulate('click');
    expect(markAsReadSpy).toHaveBeenCalledWith(1);
  });
});