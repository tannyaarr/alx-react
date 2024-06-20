import React from "react";
import Header from "./Header";
import { shallow, mount } from "enzyme";
import { StyleSheetTestUtils } from 'aphrodite'; // Import StyleSheetTestUtils
import AppContext from "../App/AppContext";

// Suppress style injection
StyleSheetTestUtils.suppressStyleInjection();

describe("Header", () => {
  it("renders without crashing", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should render an image and h1", () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.exists("img")).toEqual(true);
    expect(wrapper.containsMatchingElement(<h1>School dashboard</h1>)).toEqual(true);
  });

  it("does not render logout section when user is not logged in", () => {
    const contextValue = { user: { isLoggedIn: false } };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').exists()).toEqual(false);
  });

  it("renders logout section when user is logged in", () => {
    const contextValue = { user: { isLoggedIn: true, email: "test@test.com" } };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );
    expect(wrapper.find('#logoutSection').exists()).toEqual(true);
    expect(wrapper.find('#logoutSection').text()).toContain("Welcome test@test.com");
  });

  it("calls logOut function when logout link is clicked", () => {
    const logOut = jest.fn();
    const contextValue = { user: { isLoggedIn: true, email: "test@test.com" }, logOut };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Header />
      </AppContext.Provider>
    );

    wrapper.find('#logoutSection span').simulate('click');
    expect(logOut).toHaveBeenCalled();
  });
});

// Restore style injection after all tests
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});