import React from "react";
import Header from "./Header";
import { shallow } from "enzyme";
import { StyleSheetTestUtils } from 'aphrodite'; // Import StyleSheetTestUtils
import PropTypes from 'prop-types';

// Suppress style injection
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Restore style injection after all tests
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

// Define default props for Header
Header.defaultProps = {
  user: {
    isLoggedIn: false,
    email: '',
    password: '',
  },
  logOut: () => {},
};

// PropTypes for Header
Header.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
  logOut: PropTypes.func,
};

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
    const wrapper = shallow(<Header user={{ isLoggedIn: false }} />);
    expect(wrapper.find('#logoutSection').exists()).toEqual(false);
  });

  it("renders logout section when user is logged in", () => {
    const wrapper = shallow(<Header user={{ isLoggedIn: true, email: "test@test.com" }} />);
    expect(wrapper.find('#logoutSection').exists()).toEqual(true);
    expect(wrapper.find('#logoutSection').text()).toContain("Welcome test@test.com");
  });

  it("calls logOut function when logout link is clicked", () => {
    const logOut = jest.fn();
    const wrapper = shallow(<Header user={{ isLoggedIn: true, email: "test@test.com" }} logOut={logOut} />);

    wrapper.find('#logoutSection span').simulate('click');
    expect(logOut).toHaveBeenCalled();
  });
});