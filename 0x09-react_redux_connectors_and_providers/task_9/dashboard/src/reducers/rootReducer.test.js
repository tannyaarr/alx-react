import { Map } from 'immutable';
import rootReducer from './rootReducer';

describe('rootReducer', () => {
  it('should return the initial state', () => {
    const initialState = {
      courses: Map({}),
      notifications: Map({}),
      ui: Map({
        isUserLoggedIn: false,
        isNotificationDrawerVisible: false,
      }),
    };

    const state = rootReducer(undefined, {});

    expect(state).toEqual(initialState);
  });
});