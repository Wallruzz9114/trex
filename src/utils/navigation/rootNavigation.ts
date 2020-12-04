import { NavigationAction, NavigationContainerRef, StackActions } from '@react-navigation/native';
import * as React from 'react';

export const navigationReference: React.RefObject<NavigationContainerRef> = React.createRef();

export const navigate = (name: string, params?: object): void =>
  navigationReference.current?.navigate(name, params);

export const dispatch = (action: NavigationAction): void =>
  navigationReference.current?.dispatch(action);

export const replace = (name: string, params?: object): void =>
  navigationReference.current?.dispatch(StackActions.replace(name, params));

export const push = (name: string, params?: object): void =>
  navigationReference.current?.dispatch(StackActions.push(name, params));

export const goBack = (): void => navigationReference.current?.goBack();

export const navigation = {
  navigate,
  dispatch,
  replace,
  push,
  goBack,
};
