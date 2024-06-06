import React from "react";
import { shallow } from "enzyme";
import { getLatestNotification } from "../utils/utils";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem";
import { StyleSheetTestUtils } from 'aphrodite';

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("Notification tests", () => {
  it("renders Notification component without crashing", () => {
    const wrapper = shallow(<Notifications />);
    expect(wrapper).toBeDefined();
  });

  it("renders correct list items", () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    expect(wrapper.find("ul").children()).toHaveLength(3);
    wrapper.find("ul").forEach((node) => {
      expect(node.equals(<NotificationItem />));
    });
    expect(wrapper.find("ul").childAt(0).html()).toEqual('<li data-notification-type="default">New course available</li>');
    expect(wrapper.find("ul").childAt(1).html()).toEqual('<li data-notification-type="urgent">New resume available</li>');
    expect(wrapper.find("ul").childAt(2).html()).toEqual(`<li data-notification-type="urgent">${getLatestNotification()}</li>`);
  });

  it("renders an unordered list", () => {
    const listNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: { __html: getLatestNotification() } },
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={listNotifications} />);
    expect(wrapper.find("ul").children()).toHaveLength(3);
    wrapper.find("ul").forEach((node) => {
      expect(node.equals(<NotificationItem />));
    });
  });

  it("renders correct text", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.contains(<p>Here is the list of notifications</p>)).toBe(true);
  });

  it("displays menu item when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(true);
    expect(wrapper.find("div.menuItem").html()).toEqual('<div class="menuItem"><p>Your notifications</p></div>');
  });

  it("does not display notifications when displayDrawer is false", () => {
    const wrapper = shallow(<Notifications displayDrawer={false} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(false);
  });

  it("does not display menuItem when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("div.menuItem").exists()).toBe(false);
  });

  it("displays Notifications when displayDrawer is true", () => {
    const wrapper = shallow(<Notifications displayDrawer={true} />);
    expect(wrapper.find("div.Notifications").exists()).toBe(true);
  });

  it('calls console.log when markAsRead is called', () => {
    const consoleSpy = jest.spyOn(console, 'log');
    const notifications = [
      { id: 1, type: 'default', value: 'Test notification' }
    ];
    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={notifications} />);
    wrapper.instance().markAsRead(1);
    expect(consoleSpy).toHaveBeenCalledWith('Notification 1 has been marked as read');
    consoleSpy.mockRestore();
  });

  it("does not rerender with the same list of notifications", () => {
    const notifications = [
      { id: 1, type: "default", value: "Test notification" },
      { id: 2, type: "urgent", value: "Urgent notification" },
    ];

    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={notifications} />);
    const instance = wrapper.instance();

    // Stub the render method to track whether it's called
    const renderSpy = jest.spyOn(instance, 'render');

    // Update with the same list
    wrapper.setProps({ listNotifications: notifications });

    // Expect render method not to be called again
    expect(renderSpy).not.toHaveBeenCalled();
  });

  it("rerenders with a longer list of notifications", () => {
    const notifications1 = [
      { id: 1, type: "default", value: "Test notification" },
    ];

    const notifications2 = [
      { id: 1, type: "default", value: "Test notification" },
      { id: 2, type: "urgent", value: "Urgent notification" },
    ];

    const wrapper = shallow(<Notifications displayDrawer={true} listNotifications={notifications1} />);
    const instance = wrapper.instance();

    // Stub the render method to track whether it's called
    const renderSpy = jest.spyOn(instance, 'render');

    // Update with a longer list
    wrapper.setProps({ listNotifications: notifications2 });

    // Expect render method to be called again
    expect(renderSpy).toHaveBeenCalled();
  });

  it("calls handleDisplayDrawer when menu item is clicked", () => {
    const handleDisplayDrawer = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={false} handleDisplayDrawer={handleDisplayDrawer} />);
    wrapper.find("div.menuItem").simulate("click");
    expect(handleDisplayDrawer).toHaveBeenCalled();
  });

  it("calls handleHideDrawer when close button is clicked", () => {
    const handleHideDrawer = jest.fn();
    const wrapper = shallow(<Notifications displayDrawer={true} handleHideDrawer={handleHideDrawer} />);
    wrapper.find("button").simulate("click");
    expect(handleHideDrawer).toHaveBeenCalled();
  });
});