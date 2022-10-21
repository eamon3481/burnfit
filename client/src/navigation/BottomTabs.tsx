import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import Calendar from '../screens/Calendar';
import Home from '../screens/Home';
import Library from '../screens/Library';
import MyPage from '../screens/MyPage';
import Ionicons from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();
const TabNavigation: React.FC = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator initialRouteName="HOME">
        <Tab.Screen
          name="HOME"
          component={Home}
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons size={24} name="home" />,
          }}
        />
        <Tab.Screen
          name="CALENDAR"
          component={Calendar}
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons size={24} name="calendar" />,
          }}
        />
        <Tab.Screen
          name="LIBRARY"
          component={Library}
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons size={24} name="library" />,
          }}
        />
        <Tab.Screen
          name="MYPAGE"
          component={MyPage}
          options={{
            headerShown: false,
            tabBarIcon: () => <Ionicons size={24} name="people" />,
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default TabNavigation;
