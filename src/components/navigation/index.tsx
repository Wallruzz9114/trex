import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator, StackNavigationOptions } from '@react-navigation/stack';
import React from 'react';
import { navigationReference } from '../../utils/navigation/rootNavigation';
import AuthenticationStack from './AuthenticationStack';

type RootStackComponents = { AuthenticationStack: undefined };

const Stack = createStackNavigator<RootStackComponents>();

const index = (): JSX.Element => {
  const navigationOptions: StackNavigationOptions = { headerShown: false };

  return (
    <NavigationContainer ref={navigationReference}>
      <Stack.Navigator screenOptions={navigationOptions}>
        <Stack.Screen name="AuthenticationStack" component={AuthenticationStack} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default index;
