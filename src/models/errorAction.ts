import { USER_ACTION_TYPES } from '../constants';

export interface ErrorAction {
  type: typeof USER_ACTION_TYPES.LOGIN_FAILURE;
  payload: { message: string };
}
