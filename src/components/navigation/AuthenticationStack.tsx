import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';
import WelcomeScreen, { WelcomeParams } from '../../screens/WelcomeScreen';

export type AuthenticationStackParams = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
  WelcomeScreen: WelcomeParams;
};

const Stack = createStackNavigator<AuthenticationStackParams>();

const AuthenticationStack = () => {
  const navigationOptions: StackNavigationOptions = { headerShown: false, gestureEnabled: false };

  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
      <Stack.Screen component={ForgotPasswordScreen} name="ForgotPasswordScreen" />
      <Stack.Screen component={WelcomeScreen} name="WelcomeScreen" />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
