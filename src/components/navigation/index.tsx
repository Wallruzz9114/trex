import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React, { useEffect } from 'react';
import { IRootState, useSelector } from '../../redux';
import { navigationReference } from '../../utils/navigation/rootNavigation';
import AuthenticationStack, { AuthenticationStackParams } from './AuthenticationStack';
import HomeTab, { HomeTabParams } from './HomeTab';

export type RootStackParams = { AuthenticationStack: undefined; HomeTab: undefined };
export type CommonParams = AuthenticationStackParams & HomeTabParams & RootStackParams;

const Stack = createStackNavigator<RootStackParams>();

const index = (): JSX.Element => {
  const user = useSelector((state: IRootState) => state.user.user);
  const navigationOptions: StackNavigationOptions = { headerShown: false, gestureEnabled: false };

  useEffect(() => {
    if (user) return () => {};
  }, [user]);

  return (
    <NavigationContainer ref={navigationReference}>
      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} />
        <Stack.Screen name="HomeTab" component={HomeTab} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
