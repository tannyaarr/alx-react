import React from "react";
import CourseListRow from "./CourseListRow";
import { shallow } from "enzyme";

describe("Course List Row component test", () => {
  it("should render without crashing", () => {
    const wrapper = shallow(<CourseListRow textFirstCell="test" />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render one cell with colspan = 2 when textSecondCell null", () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" textSecondCell={null} />);
    expect(wrapper.find("th")).toHaveLength(1);
    expect(wrapper.find("th").prop('colSpan')).toEqual(2);
    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', 'rgba(222, 181, 181, 0.27)');
  });

  it("should render two cells when textSecondCell not null and isHeader is true", () => {
    const wrapper = shallow(<CourseListRow isHeader={true} textFirstCell="test" textSecondCell="test" />);
    expect(wrapper.find("th")).toHaveLength(2);
    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', 'rgba(222, 181, 181, 0.27)');
  });

  it("should render two cells when textSecondCell not null and isHeader is false", () => {
    const wrapper = shallow(<CourseListRow isHeader={false} textFirstCell="test" textSecondCell="test" />);
    expect(wrapper.find("td")).toHaveLength(2);
    expect(wrapper.prop('style')).toHaveProperty('backgroundColor', 'rgba(245, 245, 245, 0.67)');
  });
});