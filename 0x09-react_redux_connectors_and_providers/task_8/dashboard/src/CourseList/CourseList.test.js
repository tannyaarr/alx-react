import React from "react";
import { shallow } from "enzyme";
import CourseList from "./CourseList";
import CourseListRow from "./CourseListRow";
import { StyleSheetTestUtils } from 'aphrodite';
import { fetchCourses, selectCourse, unSelectCourse } from '../actions/courseActionCreators';

// Mock the action creators
jest.mock('../actions/courseActionCreators');

const listCourses = [
  { id: '1', name: "ES6", credit: 60, isSelected: false },
  { id: '2', name: "Webpack", credit: 20, isSelected: false },
  { id: '3', name: "React", credit: 40, isSelected: false },
];

// Suppress style injection
beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

// Restore style injection after all tests
afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("CourseList component tests", () => {
  let fetchCoursesMock;
  let selectCourseMock;
  let unSelectCourseMock;

  beforeEach(() => {
    fetchCoursesMock = jest.fn();
    selectCourseMock = jest.fn();
    unSelectCourseMock = jest.fn();
    fetchCourses.mockImplementation(fetchCoursesMock);
    selectCourse.mockImplementation(selectCourseMock);
    unSelectCourse.mockImplementation(unSelectCourseMock);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render without crashing", () => {
    const wrapper = shallow(<CourseList listCourses={[]} fetchCourses={fetchCoursesMock} selectCourse={selectCourseMock} unSelectCourse={unSelectCourseMock} />);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders 5 different rows", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} fetchCourses={fetchCoursesMock} selectCourse={selectCourseMock} unSelectCourse={unSelectCourseMock} />);

    expect(wrapper.find("thead").children()).toHaveLength(2);
    expect(wrapper.find("tbody").children()).toHaveLength(3);
  });

  it("renders correctly when passed a list of courses", () => {
    const wrapper = shallow(<CourseList listCourses={listCourses} fetchCourses={fetchCoursesMock} selectCourse={selectCourseMock} unSelectCourse={unSelectCourseMock} />);

    expect(wrapper.find("tbody").children()).toHaveLength(3);
    expect(wrapper.find(CourseListRow)).toHaveLength(5); // Including headers
  });

  it("should call fetchCourses on mount", () => {
    shallow(<CourseList listCourses={[]} fetchCourses={fetchCoursesMock} selectCourse={selectCourseMock} unSelectCourse={unSelectCourseMock} />);
    expect(fetchCoursesMock).toHaveBeenCalled();
  });

  it("should call selectCourse and unSelectCourse on row change", () => {
    const wrapper = shallow(
      <CourseList
        listCourses={listCourses}
        fetchCourses={fetchCoursesMock}
        selectCourse={selectCourseMock}
        unSelectCourse={unSelectCourseMock}
      />
    );

    const instance = wrapper.instance();
    const row = wrapper.find(CourseListRow).at(2); // Assuming this is the row with id '3'

    row.props().onChangeRow('3', true);
    expect(selectCourseMock).toHaveBeenCalledWith('3');

    row.props().onChangeRow('3', false);
    expect(unSelectCourseMock).toHaveBeenCalledWith('3');
  });
});
