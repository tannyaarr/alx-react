import { createSelector } from 'reselect';
import { List } from 'immutable';

const getCoursesState = (state) => state.courses;

export const getAllCourses = createSelector(
  [getCoursesState],
  (coursesState) => coursesState.get('entities').valueSeq().toList()
);
