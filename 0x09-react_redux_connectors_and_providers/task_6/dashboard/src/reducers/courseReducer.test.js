import { Map, fromJS } from 'immutable';
import courseReducer from './courseReducer';
import { FETCH_COURSE_SUCCESS, SELECT_COURSE, UNSELECT_COURSE } from '../actions/courseActionTypes';

describe('courseReducer', () => {
  const initialState = Map({
    courses: Map()
  });

  it('should return the default state when no action is passed', () => {
    expect(courseReducer(undefined, {})).toEqual(initialState);
  });

  it('should handle FETCH_COURSE_SUCCESS action', () => {
    const action = {
      type: FETCH_COURSE_SUCCESS,
      data: [
        { id: 1, name: 'ES6', credit: 60 },
        { id: 2, name: 'Webpack', credit: 20 },
        { id: 3, name: 'React', credit: 40 }
      ]
    };
    const expectedState = fromJS({
      courses: {
        '1': { id: 1, name: 'ES6', isSelected: false, credit: 60 },
        '2': { id: 2, name: 'Webpack', isSelected: false, credit: 20 },
        '3': { id: 3, name: 'React', isSelected: false, credit: 40 }
      }
    });
    expect(courseReducer(initialState, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle SELECT_COURSE action', () => {
    const initialStateWithCourses = fromJS({
      courses: {
        '1': { id: 1, name: 'ES6', isSelected: false, credit: 60 },
        '2': { id: 2, name: 'Webpack', isSelected: false, credit: 20 },
        '3': { id: 3, name: 'React', isSelected: false, credit: 40 }
      }
    });
    const action = {
      type: SELECT_COURSE,
      index: 2
    };
    const expectedState = initialStateWithCourses.setIn(['courses', '2', 'isSelected'], true);
    expect(courseReducer(initialStateWithCourses, action).toJS()).toEqual(expectedState.toJS());
  });

  it('should handle UNSELECT_COURSE action', () => {
    const initialStateWithCourses = fromJS({
      courses: {
        '1': { id: 1, name: 'ES6', isSelected: false, credit: 60 },
        '2': { id: 2, name: 'Webpack', isSelected: true, credit: 20 },
        '3': { id: 3, name: 'React', isSelected: false, credit: 40 }
      }
    });
    const action = {
      type: UNSELECT_COURSE,
      index: 2
    };
    const expectedState = initialStateWithCourses.setIn(['courses', '2', 'isSelected'], false);
    expect(courseReducer(initialStateWithCourses, action).toJS()).toEqual(expectedState.toJS());
  });
});
