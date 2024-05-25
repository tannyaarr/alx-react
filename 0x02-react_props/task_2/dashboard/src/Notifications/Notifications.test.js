import React from "react";
import { shallow } from "enzyme";
import Notifications from "./Notifications";
import NotificationItem from "./NotificationItem"; // Import the NotificationItem component

describe("Notification component tests", () => {
  it("renders Notification component without crashing", () => {
    const notification = shallow(<Notifications />);

    expect(notification).toBeDefined();
  });

  it("renders ul", () => {
    const notification = shallow(<Notifications />);

    expect(notification.find("ul")).toBeDefined();
  });

  it("renders NotificationItem components", () => { // Update the test to check for NotificationItem components
    const notification = shallow(<Notifications />);

    expect(notification.find(NotificationItem)).toHaveLength(3); // Expect three NotificationItem components
  });

  it("renders correct text", () => {
    const notification = shallow(<Notifications />);

    expect(notification.find("p").text()).toBe("Here is the list of notifications");
  });
});