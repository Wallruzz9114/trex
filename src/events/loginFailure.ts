import { UserAction } from '../redux/refucers/userReducer';
import { USER_ACTION_TYPES } from './../constants';

export const loginFailure = (): UserAction => {
  return {
    type: USER_ACTION_TYPES.LOGIN_FAILURE,
    payload: { message: 'xxx' },
  };
};
