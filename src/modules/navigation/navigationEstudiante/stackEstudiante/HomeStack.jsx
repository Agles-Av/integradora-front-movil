import { View, Text } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Icon } from '@rneui/base';
import { createStackNavigator } from '@react-navigation/stack'
import { Header, getHeaderTitle } from '@react-navigation/elements';
import HomeEstudiante from "../../../estudiantehome/adapters/screens/HomeEstudiante";
import AsyncStorage from '@react-native-async-storage/async-storage';
import ExamenHistory from '../../../estudiantehome/components/ExamenHistory';

const Stack = createStackNavigator();

const HomeStack = () => {
  const [namePerson, setNamePerson] = useState("");

  const getPersonName = async () => {
    const dataUser = JSON.parse(await AsyncStorage.getItem("user"));
    const namePerson = dataUser.user.person.name;
    setNamePerson(namePerson);
  }
  useEffect(() => {
    getPersonName();
  });

  return (
    <Stack.Navigator
      screenOptions={{
        header: ({ options, route }) => (
          <Header {...options} title={getHeaderTitle(options, route.name)} />
        ),
      }}
    >
      <Stack.Screen name="index"
        component={HomeEstudiante}
        options={{
          headerLeft: () => (
            <Icon name="account-circle" type='material-community' color={'#13505B'} size={44} />
          ),
          headerTitle: "SIGEU - Estudiante " + namePerson, headerTintColor: '#13505B'
        }}
      />
      <Stack.Screen name="ExamenHistory"
        component={ExamenHistory}
        options={{
          headerLeft: () => (
            <Icon name="account-circle" type='material-community' color={'#13505B'} size={44} />
          ),
          headerTitle: "SIGEU - Estudiante " + namePerson, headerTintColor: '#13505B'
        }}
      />
    </Stack.Navigator>
  )
}

export default HomeStack