import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from 'aphrodite';
import { fetchNotifications, setNotificationFilter } from '../actions/notificationActionCreators';

// Suppress style injection
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Notification tests", () => {
  it("renders Notification component without crashing", () => {
    const wrapper = shallow(<Notifications fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper).toBeDefined();
  });

  it("renders correct list items", () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "Test HTML" } },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it("renders an unordered list", () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: "Test HTML" } },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper.find("ul")).toHaveLength(1);
  });

  it("renders correct text", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(true);
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(true);
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(false);
  });

  it("does not display menuItem when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(false);
  });

  it("displays Notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(true);
  });

  it('calls console.log when markNotificationAsRead is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const notifications = [
      { id: 1, type: 'default', value: 'Test notification' }
    ];
    const mockMarkNotificationAsRead = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={notifications} markNotificationAsRead={mockMarkNotificationAsRead} fetchNotifications={jest.fn()} setNotificationFilter={jest.fn()} />);
    wrapper.instance().props.markNotificationAsRead(1);
    expect(mockMarkNotificationAsRead).toHaveBeenCalledWith(1);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });

  it("calls setNotificationFilter with 'URGENT' when the urgent button is clicked", () => {
    const setNotificationFilterMock = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={jest.fn()} setNotificationFilter={setNotificationFilterMock} />);
    wrapper.find('button').at(0).simulate('click');
    expect(setNotificationFilterMock).toHaveBeenCalledWith('URGENT');
  });

  it("calls setNotificationFilter with 'DEFAULT' when the default button is clicked", () => {
    const setNotificationFilterMock = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={true} fetchNotifications={jest.fn()} setNotificationFilter={setNotificationFilterMock} />);
    wrapper.find('button').at(1).simulate('click');
    expect(setNotificationFilterMock).toHaveBeenCalledWith('DEFAULT');
  });
});
