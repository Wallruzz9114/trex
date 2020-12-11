import { USER_ACTION_TYPES } from '../constants';
import { IUserPayload } from '../redux/refucers/userReducer';

export interface SuccessAction {
  type: typeof USER_ACTION_TYPES.LOGIN_SUCCESS;
  payload: IUserPayload;
}
