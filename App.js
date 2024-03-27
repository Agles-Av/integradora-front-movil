import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import NavigationAdmin from './src/modules/navigation/navigationAdmin/NavigationAdmin';
import { NavigationContainer } from '@react-navigation/native'
import { Icon } from '@rneui/base';
import { createStackNavigator } from '@react-navigation/stack'
import NavigationEstudiante from './src/modules/navigation/navigationEstudiante/NavigationEstudiante';
import Login from './src/modules/auth/adapters/screens/Login';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';
import HomeEstudiante from './src/modules/estudiantehome/adapters/screens/HomeEstudiante';

export default function App() {
  const Stack = createStackNavigator();
  const Tab = createBottomTabNavigator();

  const [student, setStudent] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [login, setLogin] = useState(true);
  const [reload, setReload] = useState(false);



  const getRole = async () => {
    const role =  await AsyncStorage.getItem('role');
    console.log("Recibiendo rol desde app", role);
    if (role === 'ADMIN_ROLE') {
      setAdmin(true);
      setStudent(false);
      setLogin(false);
    } else if (role === 'ESTUDIANTE_ROLE') {
      setStudent(true);
      setAdmin(false);
      setLogin(false);
    } else {  
      setAdmin(false);
      setStudent(false);
      setLogin(true);
    }
  }


  useEffect(() => {
    getRole();
    setReload(false);
  }, [reload]);


  console.log("Admin", admin);
  console.log("Estudiante", student);
  if (login) { 
    return (
      <Login setReload={setReload}   />
    )
  }else if (admin) {
    return (
      <NavigationAdmin />
    )
  }else if (student) {
    return (
      <NavigationEstudiante />
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
