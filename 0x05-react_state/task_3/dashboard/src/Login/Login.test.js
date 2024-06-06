import { shallow } from "enzyme";
import React from "react";
import Login from "./Login";
import { StyleSheetTestUtils } from 'aphrodite';

// Suppress style injection
StyleSheetTestUtils.suppressStyleInjection();

describe("Login", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.exists()).toEqual(true);
  });

  it("should have 2 input tags and 2 label tags", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("label")).toHaveLength(2);
    expect(wrapper.find("input")).toHaveLength(2);
  });

  it("should have the submit button disabled by default", () => {
    const wrapper = shallow(<Login />);
    expect(wrapper.find("input[type='submit']").prop("disabled")).toEqual(true);
  });

  it("should enable the submit button when both email and password fields are non-empty", () => {
    const wrapper = shallow(<Login />);
    wrapper.find("input[name='email']").simulate("change", { target: { value: "test@example.com" } });
    wrapper.find("input[name='password']").simulate("change", { target: { value: "password123" } });
    expect(wrapper.find("input[type='submit']").prop("disabled")).toEqual(false);
  });
});

// Restore style injection after all tests
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});