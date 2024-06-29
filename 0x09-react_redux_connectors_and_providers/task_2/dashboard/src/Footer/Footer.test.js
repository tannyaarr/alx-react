import React from "react";
import { shallow } from "enzyme";
import Footer from "./Footer";
import { getFullYear, getFooterCopy } from "../utils/utils";

// Define default props for Footer
Footer.defaultProps = {
  user: {
    isLoggedIn: false,
    email: '',
    password: '',
  },
};

// PropTypes for Footer
Footer.propTypes = {
  user: PropTypes.shape({
    isLoggedIn: PropTypes.bool,
    email: PropTypes.string,
    password: PropTypes.string,
  }),
};

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
    const wrapper = shallow(<Footer user={{ isLoggedIn: false }} />);
    expect(wrapper.find("#contactUs").exists()).toBe(false);
  });

  it("should display the contact link when the user is logged in", () => {
    const wrapper = shallow(<Footer user={{ isLoggedIn: true, email: 'test@test.com' }} />);
    expect(wrapper.find("#contactUs").exists()).toBe(true);
    expect(wrapper.find("#contactUs").text()).toBe("Contact us");
  });
});