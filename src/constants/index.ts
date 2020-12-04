import { Dimensions } from 'react-native';
import { getStatusBarHeight } from 'react-native-status-bar-height';

// export const DATABASE_INSTANCE: FirebaseFirestoreTypes.Module = firestore();
export const STATUS_BAR_HEIGHT: number = getStatusBarHeight();
export const SCREEN_HEIGHT: number = Math.round(Dimensions.get('window').height);
export const SCREEN_WIDTH: number = Math.round(Dimensions.get('window').width);
export const USER_ACTION_TYPES = {
  LOGIN_REQUEST: 'LOGIN_REQUEST',
  LOGIN_SUCCESS: 'LOGIN_SUCCESS',
  LOGIN_FAILURE: 'LOGIN_FAILURE',
};
