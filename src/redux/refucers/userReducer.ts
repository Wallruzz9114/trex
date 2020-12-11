import { Alert } from 'react-native';
import { USER_ACTION_TYPES } from '../../constants';
import { IPhoto } from '../../models/photo';
import { SuccessAction } from '../../models/successAction';
import { ErrorAction } from './../../models/errorAction';

export type UserAction = SuccessAction | ErrorAction;

export interface IUserPayload {
  user: {
    email?: string | null;
    loggedIn?: boolean;
  };
  photos?: [] | IPhoto[];
}

const initialState: IUserPayload = {
  user: {},
  photos: [],
};

const reducer = (state: IUserPayload = initialState, action: UserAction) => {
  switch (action.type) {
    case USER_ACTION_TYPES.LOGIN_REQUEST:
      state = { ...state, user: {} };
      return state;
    case USER_ACTION_TYPES.LOGIN_SUCCESS:
      action = <SuccessAction>action;
      state = { ...state, user: { ...action.payload.user } };
      return state;
    case USER_ACTION_TYPES.LOGIN_FAILURE:
      action = <ErrorAction>action;
      const message = action.payload.message;
      Alert.alert('Error', message);
      return state;
    case USER_ACTION_TYPES.REGISTER_REQUEST:
      state = { ...state, user: {} };
      return state;
    case USER_ACTION_TYPES.REGISTER_SUCCESS:
      action = <SuccessAction>action;
      state = { ...state, user: { ...action.payload.user } };
      return state;
    case USER_ACTION_TYPES.REGISTER_FAILURE:
      action = <ErrorAction>action;
      const message2 = action.payload.message;
      Alert.alert('Error', message2);
      return state;
    default:
      return state;
  }
};

export default reducer;
