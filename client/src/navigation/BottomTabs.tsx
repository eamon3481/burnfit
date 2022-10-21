import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Calendar from '../screens/Calendar';
import Home from '../screens/Home';
import Library from '../screens/Library';
import MyPage from '../screens/MyPage';

const Tab = createBottomTabNavigator();
const TabNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HOME">
        <Tab.Screen name="HOME" component={Home} />
        <Tab.Screen name="CALENDAR" component={Calendar} />
        <Tab.Screen name="LIBRARY" component={Library} />
        <Tab.Screen name="MyPage" component={MyPage} />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
