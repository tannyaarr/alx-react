import { bindActionCreators } from 'redux';
import { SELECT_COURSE, UNSELECT_COURSE, SET_COURSES } from './courseActionTypes';
import axios from 'axios';

// Action creators
export function selectCourse(index) {
  return { type: SELECT_COURSE, index };
}

export function unSelectCourse(index) {
  return { type: UNSELECT_COURSE, index };
}

export function setCourses(courses) {
  return { type: SET_COURSES, courses };
}

// Thunk action creator for fetching courses
export function fetchCourses() {
  return async (dispatch) => {
    try {
      const response = await axios.get('/courses.json');
      const courses = response.data;
      dispatch(setCourses(courses));
    } catch (error) {
      console.error('Error fetching courses:', error);
    }
  };
}

export const boundCourseActionCreators = (dispatch) => bindActionCreators({
  selectCourse,
  unSelectCourse,
  fetchCourses,
}, dispatch);
