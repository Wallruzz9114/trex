import { Alert } from 'react-native';
import { USER_ACTION_TYPES } from '../../constants';
import { ErrorAction } from './../../models/errorAction';
import { SuccessAction } from './../../models/successAction';
import { IUserInfo } from './../../models/userInfo';

export type UserAction = SuccessAction | ErrorAction;

const initialState: IUserInfo = {
  user: {},
  photos: [],
};

const reducer = (state: IUserInfo = initialState, action: UserAction) => {
  switch (action.type) {
    case USER_ACTION_TYPES.LOGIN_REQUEST:
      state = { ...state, user: {} };
      return state;
    case USER_ACTION_TYPES.LOGIN_SUCCESS:
      action = action as SuccessAction;
      state = { ...state, user: { ...action.payload } };
      return state;
    case USER_ACTION_TYPES.LOGIN_FAILURE:
      action = action as ErrorAction;
      const { message } = action.payload;
      Alert.alert('Error', message);
      return state;
    default:
      return state;
  }
};

export default reducer;
