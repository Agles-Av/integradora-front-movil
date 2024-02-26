import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import HomeAdmin from '../../adminhome/adapters/screens/HomeAdmin'; 
const Stack  = createStackNavigator();
export default function AdminStack() {
  return (
    <Stack.Navigator>
        <Stack.Screen
        name='HomeAdmin'
        component={HomeAdmin}
        options={{title: "Bienvenido admin"}}
        />
    </Stack.Navigator>
  )
}