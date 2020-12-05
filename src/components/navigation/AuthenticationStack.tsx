import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import ForgotPasswordScreen from '../../screens/ForgotPasswordScreen';
import LoginScreen from '../../screens/LoginScreen';
import RegisterScreen from '../../screens/RegisterScreen';

type AuthenticationStackComponents = {
  LoginScreen: undefined;
  RegisterScreen: undefined;
  ForgotPasswordScreen: undefined;
};

const Stack = createStackNavigator<AuthenticationStackComponents>();

const AuthenticationStack = () => {
  const navigationOptions: StackNavigationOptions = { headerShown: false, gestureEnabled: false };

  return (
    <Stack.Navigator screenOptions={navigationOptions}>
      <Stack.Screen component={LoginScreen} name="LoginScreen" />
      <Stack.Screen component={RegisterScreen} name="RegisterScreen" />
      <Stack.Screen component={ForgotPasswordScreen} name="ForgotPasswordScreen" />
    </Stack.Navigator>
  );
};

export default AuthenticationStack;
