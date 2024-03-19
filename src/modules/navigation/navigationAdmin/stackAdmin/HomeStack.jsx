import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import HomeAdmin from '../../../adminhome/adapters/screens/HomeAdmin'
import { Header, getHeaderTitle } from '@react-navigation/elements';
import { Icon } from '@rneui/base';
import Login from '../../../auth/adapters/screens/Login';
const Stack = createStackNavigator();

export default function HomeStack() {
    return (
        <Stack.Navigator
            screenOptions={{
                header: ({ options, route }) => (
                    <Header {...options} title={getHeaderTitle(options, route.name)} />
                ),
            }}
        >
            <Stack.Screen
                name="HomeAdmin"
                component={HomeAdmin}
                options={{
                    headerLeft: () => (
                        <Icon name="account-circle" type='material-community' color={'#13505B'} size={44} />
                    ),
                    headerTitle: 'SIGEU - Administrador', headerTintColor: '#13505B'
                }}
            />
        </Stack.Navigator>
    )
}
/**

 */
const styles = StyleSheet.create({})