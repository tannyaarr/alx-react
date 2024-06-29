import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { selectCourse, unSelectCourse, fetchCourses, setCourses } from './courseActionCreators';
import { SELECT_COURSE, UNSELECT_COURSE, SET_COURSES } from './courseActionTypes';

const middlewares = [thunk];
const mockStore = configureMockStore(middlewares);
const mock = new MockAdapter(axios);

describe('course action creators', () => {
  afterEach(() => {
    mock.reset();
  });

  test('selectCourse action', () => {
    const index = 1;
    const expectedAction = { type: SELECT_COURSE, index };
    expect(selectCourse(index)).toEqual(expectedAction);
  });

  test('unSelectCourse action', () => {
    const index = 1;
    const expectedAction = { type: UNSELECT_COURSE, index };
    expect(unSelectCourse(index)).toEqual(expectedAction);
  });

  test('setCourses action', () => {
    const courses = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ];
    const expectedAction = { type: SET_COURSES, courses };
    expect(setCourses(courses)).toEqual(expectedAction);
  });

  test('fetchCourses action', async () => {
    const courses = [
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
    ];
    mock.onGet('/courses.json').reply(200, courses);

    const expectedActions = [
      { type: SET_COURSES, courses }
    ];

    const store = mockStore({});
    await store.dispatch(fetchCourses());
    expect(store.getActions()).toEqual(expectedActions);
  });
});
