import React from "react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { shallow, mount } from "enzyme";
import { fromJS } from "immutable";
import App, { mapStateToProps } from "./App";
import Login from "../Login/Login";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Notifications from "../Notifications/Notifications";
import CourseList from "../CourseList/CourseList";
import { StyleSheetTestUtils } from 'aphrodite';

const mockStore = configureStore([]);

beforeAll(() => {
  StyleSheetTestUtils.suppressStyleInjection();
});

afterAll(() => {
  StyleSheetTestUtils.clearBufferAndResumeStyleInjection();
});

describe("App tests", () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      ui: fromJS({
        isUserLoggedIn: false,
        isNotificationDrawerVisible: false,
      }),
    });
  });

  it("renders without crashing", () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component).toBeDefined();
  });

  it("should render Notifications component", () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.find(Notifications)).toHaveLength(1);
  });

  it("should render Header component", () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.find(Header)).toHaveLength(1);
  });

  it("should render Login Component", () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.find(Login)).toHaveLength(1);
  });

  it("should render Footer component", () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.find(Footer)).toHaveLength(1);
  });

  it("does not render CourseList if logged out", () => {
    const component = shallow(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.find(CourseList)).toHaveLength(0);
  });

  it("renders CourseList if logged in", () => {
    store = mockStore({
      ui: fromJS({
        isUserLoggedIn: true,
        isNotificationDrawerVisible: false,
      }),
    });
    const component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    expect(component.find(CourseList)).toHaveLength(1);
    expect(component.find(Login)).toHaveLength(0);
  });

  it("mapStateToProps returns the correct state", () => {
    const state = fromJS({
      isUserLoggedIn: true,
      isNotificationDrawerVisible: true,
    });
    const expectedProps = {
      isLoggedIn: true,
      displayDrawer: true,
    };
    expect(mapStateToProps(state)).toEqual(expectedProps);
  });

  it("markNotificationAsRead function updates state correctly", () => {
    const component = mount(
      <Provider store={store}>
        <App />
      </Provider>
    );
    const initialNotifications = [
      { id: 1, type: "default", value: "New course available" },
      { id: 2, type: "urgent", value: "New resume available" },
      { id: 3, type: "urgent", html: "<strong>Urgent requirement</strong>" },
    ];
    component.setState({ listNotifications: initialNotifications });
    component.instance().markNotificationAsRead(2);
    expect(component.state('listNotifications')).toEqual([
      { id: 1, type: "default", value: "New course available" },
      { id: 3, type: "urgent", html: "<strong>Urgent requirement</strong>" },
    ]);
  });
});