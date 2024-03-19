import { View, Text } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeEstudiante from "../../../estudiantehome/adapters/screens/HomeEstudiante";
const Stack = createStackNavigator();

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="index"
      component={HomeEstudiante}
      options={{title: 'Home'}}
      />
    </Stack.Navigator>
  )
}

export default HomeStack