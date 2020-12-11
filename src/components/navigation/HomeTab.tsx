import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import React from 'react';
import HomeScreen from '../../screens/HomeScreen';

export type HomeTabParams = {
  HomeScreen: undefined;
};

const Tab = createBottomTabNavigator<HomeTabParams>();

const HomeTab = () => {
  const navigationOptions: BottomTabNavigationOptions = {};

  return (
    <Tab.Navigator screenOptions={navigationOptions}>
      <Tab.Screen component={HomeScreen} name="HomeScreen" />
    </Tab.Navigator>
  );
};

export default HomeTab;
