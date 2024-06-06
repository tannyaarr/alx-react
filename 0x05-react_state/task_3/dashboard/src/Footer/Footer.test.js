import React from "react";
import { shallow, mount } from "enzyme";
import Footer from "./Footer";
import { getFullYear, getFooterCopy } from "../utils/utils";
import AppContext, { AppProvider } from "../App/AppContext";

describe("Footer test", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should render the text Copyright", () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.text()).toContain(`Copyright ${getFullYear()} - ${getFooterCopy()}`);
  });

  it("should not display the contact link when the user is logged out", () => {
    const contextValue = {
      user: {
        isLoggedIn: false,
        email: '',
        password: '',
      },
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find("#contactUs").exists()).toBe(false);
  });

  it("should display the contact link when the user is logged in", () => {
    const contextValue = {
      user: {
        isLoggedIn: true,
        email: 'test@test.com',
        password: 'password123',
      },
    };
    const wrapper = mount(
      <AppContext.Provider value={contextValue}>
        <Footer />
      </AppContext.Provider>
    );
    expect(wrapper.find("#contactUs").exists()).toBe(true);
    expect(wrapper.find("#contactUs").text()).toBe("Contact us");
  });
});