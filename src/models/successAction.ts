import { USER_ACTION_TYPES } from '../constants';
import { IUserPayload } from './user';

export interface SuccessAction {
  type: typeof USER_ACTION_TYPES.LOGIN_SUCCESS;
  payload: IUserPayload;
}
