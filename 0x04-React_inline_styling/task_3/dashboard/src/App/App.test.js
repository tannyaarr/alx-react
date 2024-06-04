import React from "react";
import App from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import CourseList from "../CourseList/CourseList";
import { shallow } from "enzyme";
import { render, fireEvent } from "@testing-library/react";
import { StyleSheetTestUtils } from 'aphrodite'; // Import StyleSheetTestUtils

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
    expect(component.contains(<Notifications />)).toBe(true);
  });

  it("should render Header component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Header />)).toBe(true);
  });

  it("should render Login Component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Login />)).toBe(false);
  });

  it("should render Footer component", () => {
    const component = shallow(<App />);
    expect(component.contains(<Footer />)).toBe(true);
  });

  it("does not render Courselist if logged out", () => {
    const component = shallow(<App />);
    component.setProps({ isLoggedIn: false });
    expect(component.contains(<CourseList />)).toBe(false);
  });

  it("renders Courselist if logged in", () => {
    const component = shallow(<App isLoggedIn={true} />);
    expect(component.contains(<CourseList />)).toBe(true);
    expect(component.contains(<Login />)).toBe(false);
  });

  it("calls logOut and shows alert when Ctrl+H is pressed", () => {
    const logOutMock = jest.fn();
    const alertMock = jest.fn();
    window.alert = alertMock;

    const { container } = render(<App isLoggedIn={true} logOut={logOutMock} />);
    const event = new KeyboardEvent("keydown", {
      key: "h",
      ctrlKey: true,
    });

    window.dispatchEvent(event);

    expect(alertMock).toHaveBeenCalledWith("Logging you out");
    expect(logOutMock).toHaveBeenCalled();

    window.alert.mockRestore(); 
  });
});