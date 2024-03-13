import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import UsersLists from '../../../adminhome/adapters/screens/UsersLists'
 import { createStackNavigator } from '@react-navigation/stack'
 import { Header, getHeaderTitle } from '@react-navigation/elements';
 import { Icon } from '@rneui/base';
 const Stack = createStackNavigator();

export default function UsersStack() {
  return (
    
    <Stack.Navigator
    screenOptions={{
        header: ({ options, route }) => (
            <Header {...options} title={getHeaderTitle(options, route.name)} />
        ),
    }}
>
    <Stack.Screen
        name="UsersLists"
        component={UsersLists}
        options={{headerLeft: () => (
            <Icon name="account-circle" type='material-community' color={'#13505B'} size={44}/>
        ),
            headerTitle:'SIGEU - Administrador', headerTintColor:'#13505B'
    }}
    />
</Stack.Navigator>
  )
}

const styles = StyleSheet.create({})