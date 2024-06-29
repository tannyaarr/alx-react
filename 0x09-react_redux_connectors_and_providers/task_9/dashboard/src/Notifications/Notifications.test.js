// src/components/Notifications.test.js
import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Notifications tests", () => {
  const listNotifications = [
    { id: 1, type: "default", value: "New course available" },
    { id: 2, type: "urgent", value: "New resume available" },
    { id: 3, type: "urgent", html: { __html: "Test HTML" } },
  ];

  const fetchNotifications = jest.fn();
  const setNotificationFilter = jest.fn();
  const markNotificationAsRead = jest.fn();

  it("renders Notification component without crashing", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={false} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper).toBeDefined();
  });

  it("renders correct list items", () => {
    const wrapper = shallow(<Notifications listNotifications={listNotifications} displayDrawer={true} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.find(NotificationItem)).toHaveLength(3);
  });

  it("renders an unordered list", () => {
    const wrapper = shallow(<Notifications listNotifications={listNotifications} displayDrawer={true} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.find("ul")).toHaveLength(1);
  });

  it("renders correct text", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={true} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(true);
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={false} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(true);
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={false} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(false);
  });

  it("does not display menuItem when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={true} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(false);
  });

  it("displays Notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={true} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(true);
  });

  it("calls setNotificationFilter with 'URGENT' when the urgent button is clicked", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={true} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    wrapper.find('button').at(0).simulate('click');
    expect(setNotificationFilter).toHaveBeenCalledWith('URGENT');
  });

  it("calls setNotificationFilter with 'DEFAULT' when the default button is clicked", () => {
    const wrapper = shallow(<Notifications listNotifications={[]} displayDrawer={true} fetchNotifications={fetchNotifications} setNotificationFilter={setNotificationFilter} markNotificationAsRead={markNotificationAsRead} />);
    wrapper.find('button').at(1).simulate('click');
    expect(setNotificationFilter).toHaveBeenCalledWith('DEFAULT');
  });
});
