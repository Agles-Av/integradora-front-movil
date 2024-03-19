import { View, Text } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import HomeStack from './stackEstudiante/HomeStack';
import { NavigationContainer } from '@react-navigation/native';
const Tab = createBottomTabNavigator();
const NavigationEstudiante = () => {
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
      <Tab.Screen name="HomeEstudianteStack"
       component={HomeStack} 
      options={{ title: 'EstudianteHome' }} />
    </Tab.Navigator>
    </NavigationContainer>

  )
}

export default NavigationEstudiante

const getIconName=(routeName, focused)=>{
    let iconName = '';
    let iconType='';
  
    switch (routeName) {
      case 'HomeEstudianteStack':
        iconName = focused ? 'home' : 'home-outline'
        iconType = 'material-community'
        break;
    }
  
    return {iconName, iconType};
  }