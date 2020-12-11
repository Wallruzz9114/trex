import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import agent from '../api/agent';
import { USER_ACTION_TYPES } from '../constants';
import { ErrorAction } from '../models/errorAction';
import { ILoginFormInput } from '../models/loginFormInput';
import { SuccessAction } from '../models/successAction';
import { IUserPayload, UserAction } from '../redux/refucers/userReducer';
import { RegisterParams } from './../models/registerFormInputs';

export const LoginSuccess = (payload: IUserPayload): SuccessAction => {
  return {
    type: USER_ACTION_TYPES.LOGIN_SUCCESS,
    payload: payload,
  };
};

export const LoginRequest = (
  loginInput: ILoginFormInput
): ThunkAction<Promise<void>, {}, {}, UserAction> => async (
  dispatch: ThunkDispatch<{}, {}, UserAction>
) => {
  const user = await agent.Users.login(loginInput);

  try {
    if (user != null) {
      dispatch(LoginSuccess(user));
    }
  } catch (error) {
    dispatch(LoginFailure());
  }
};

export const LoginFailure = (): UserAction => {
  return {
    type: USER_ACTION_TYPES.LOGIN_FAILURE,
    payload: { message: 'xxx' },
  };
};

export const RegisterRequest = (
  registerInput: RegisterParams
): ThunkAction<Promise<void>, {}, {}, UserAction> => async (
  dispatch: ThunkDispatch<{}, {}, UserAction>
) => {
  const user = await agent.Users.register(registerInput);

  try {
    if (user != null) {
      dispatch(LoginRequest({ email: registerInput.email, password: registerInput.password }));
    }
  } catch (error) {
    dispatch(RegisterFailure(`${error}`));
  }
};

export const RegisterFailure = (error: string): ErrorAction => {
  return {
    payload: {
      message: error,
    },
    type: USER_ACTION_TYPES.REGISTER_FAILURE,
  };
};
