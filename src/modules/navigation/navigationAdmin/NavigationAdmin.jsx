import { StyleSheet, Text, View } from 'react-native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import React from 'react'
import { Icon } from '@rneui/base'
import HomeStack from './stackAdmin/HomeStack'
import UsersStack from './stackAdmin/UsersStack'
import SystemStack from './stackAdmin/SystemStack'
import { NavigationContainer } from '@react-navigation/native'

const Tab = createBottomTabNavigator();

export default function NavigationAdmin() {
  return (
    <NavigationContainer>
          <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          const { iconName, iconType } = getIconName(route.name, focused);
          // Retornar un Icon de React Native Elements
          return <Icon name={iconName} type={iconType} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#0C7489',
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
      })}
    >
      <Tab.Screen
        name='UsersStack'
        component={UsersStack}
        options={{ title: 'Users' }}
      />
      <Tab.Screen
        name='SystemStack'
        component={SystemStack}
        options={{ title: 'System' }}
      />

    </Tab.Navigator>
    </NavigationContainer>

  )
}

const getIconName = (routeName, focused) => {
  let iconName = '';
  let iconType = '';

  switch (routeName) {
    case 'index':
      iconName = focused ? 'home' : 'home-outline'
      iconType = 'material-community'
      break;
    case 'UsersStack':
      iconName = focused ? 'account-group' : 'account-group-outline'
      iconType = 'material-community'
      break;
    case 'SystemStack':
      iconName = focused ? 'cog' : 'cog-outline'
      iconType = 'material-community'
      break;
  }

  return { iconName, iconType };
}