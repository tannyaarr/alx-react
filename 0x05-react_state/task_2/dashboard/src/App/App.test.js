import React from "react";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import CourseList from "../CourseList/CourseList";
import { shallow, mount } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { StyleSheetTestUtils } from 'aphrodite';

// Suppress style injection
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Restore style injection after all tests
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("App tests", () => {
  it("renders without crashing", () => {
    const component = shallow(<App />);
    expect(component).toBeDefined();
  });

  it("should render Notifications component", () => {
    const component = shallow(<App />);
    expect(component.find(Notifications)).toHaveLength(1);
  });

  it("should render Header component", () => {
    const component = shallow(<App />);
    expect(component.find(Header)).toHaveLength(1);
  });

  it("should render Login Component", () => {
    const component = shallow(<App />);
    expect(component.find(Login)).toHaveLength(1);
  });

  it("should render Footer component", () => {
    const component = shallow(<App />);
    expect(component.find(Footer)).toHaveLength(1);
  });

  it("does not render CourseList if logged out", () => {
    const component = shallow(<App />);
    expect(component.find(CourseList)).toHaveLength(0);
  });

  it("renders CourseList if logged in", () => {
    const component = shallow(<App />);
    component.setState({ user: { isLoggedIn: true } });
    expect(component.find(CourseList)).toHaveLength(1);
    expect(component.find(Login)).toHaveLength(0);
  });

  it("calls logOut and shows alert when Ctrl+H is pressed", () => {
    const alertMock = jest.fn();
    window.alert = alertMock;

    const component = mount(<App />);
    const event = new KeyboardEvent("keydown", {
      key: "h",
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith("Logging you out");
    expect(component.state('user').isLoggedIn).toBe(false);

    window.alert.mockRestore();
  });

  // New tests for displayDrawer state
  it("default state for displayDrawer is false", () => {
    const component = shallow(<App />);
    expect(component.state('displayDrawer')).toBe(false);
  });

  it("handleDisplayDrawer sets displayDrawer to true", () => {
    const component = shallow(<App />);
    component.instance().handleDisplayDrawer();
    expect(component.state('displayDrawer')).toBe(true);
  });

  it("handleHideDrawer sets displayDrawer to false", () => {
    const component = shallow(<App />);
    component.setState({ displayDrawer: true });
    component.instance().handleHideDrawer();
    expect(component.state('displayDrawer')).toBe(false);
  });

  // Test for logIn function
  it("logIn function updates state correctly", () => {
    const component = shallow(<App />);
    component.instance().logIn("test@test.com", "password");
    expect(component.state('user')).toEqual({
      email: "test@test.com",
      password: "password",
      isLoggedIn: true
    });
  });

  // Test for logOut function
  it("logOut function updates state correctly", () => {
    const component = shallow(<App />);
    component.setState({ user: { isLoggedIn: true, email: "test@test.com" } });
    component.instance().logOut();
    expect(component.state('user')).toEqual({
      email: "",
      password: "",
      isLoggedIn: false
    });
  });
});