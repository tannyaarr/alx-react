import { fromJS } from 'immutable';
import { getAllCourses } from './courseSelector';

const mockState = {
  courses: fromJS({
    entities: {
      1: { id: 1, name: 'Course 1' },
      2: { id: 2, name: 'Course 2' },
      3: { id: 3, name: 'Course 3' },
    }
  })
};

describe('Course Selectors', () => {
  it('should return all courses as a List', () => {
    const expectedCourses = fromJS([
      { id: 1, name: 'Course 1' },
      { id: 2, name: 'Course 2' },
      { id: 3, name: 'Course 3' },
    ]);

    expect(getAllCourses(mockState)).toEqual(expectedCourses);
  });
});
