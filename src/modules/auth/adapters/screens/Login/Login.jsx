import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image, Input, Button, Icon } from '@rneui/base'
import { isEmpty } from 'lodash';
import Loading from '../../../../../kernel/components/Loading';
import { LoginStyles } from './constants/Index';
//import { useNavigation } from '@react-navigation/native';
import { StackActions } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';



export default function Login(props) {
  const { setReload } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showMessage, setShowMessage] = useState("");
  const [visible, setVisible] = useState(false);
  //const navigation = useNavigation();

  const sigin = { email, password };
  const login = async () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      //proceso de inicio de sesión
      setShowMessage('');
      setVisible(true);
      try {
        fetch('http://192.168.109.102:8080/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sigin)
        })
          .then(response => response.json())
          .then(data => {
            const token = data.data.token;
            console.log('POST Request Result:', data.data.roles.name);
            setVisible(false);
            AsyncStorage.setItem('token', token);

            if (data.data.roles.name === 'ADMIN_ROLE') {
              console.log("entre");
              AsyncStorage.setItem('role', data.data.roles.name);
              //navigation.dispatch("HomeAdmin");
            } else if (data.data.roles.name === 'ESTUDIANTE_ROLE') {
              AsyncStorage.setItem('role', data.data.roles.name);
              //navigation.dispatch("HomeEstudiante");

            }
            setReload(true);
          })
      } catch (error) {
        console.log('Error: ', error);
        setShowMessage("Usuario o contraseña incorrectos")
      } finally {
        setVisible(false);
      }
    } else {
      setShowMessage('Campo obligatorio')
    }
  }

  return (
    <View style={LoginStyles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/987/987815.png"
        }}
        style={LoginStyles.image}
      /> 
      <Text style={LoginStyles.text}>SIGEU</Text>
      <Text style={LoginStyles.text}>Sistema Gestor de Exámenes Universitarios </Text>
      <View style={LoginStyles.login}>
        <Input
          placeholder='Email'
          label="correo electronico *"
          keyboardType="email-address"
          labelStyle={LoginStyles.label}
          inputStyle={LoginStyles.input}
          placeholderTextColor="#D9D9D9"
          onChange={({ nativeEvent: { text } }) => setEmail(text)}
          rightIcon={
            <Icon
              type="material-community"
              name="email-outline"
              color='white'
            />
          }
          errorMessage={showMessage}
        />
        <Input
          placeholder='contraseña'
          label="contraseña *"
          labelStyle={LoginStyles.label}
          inputStyle={LoginStyles.input}
          placeholderTextColor="#D9D9D9"
          secureTextEntry={showPassword}
          onChange={({ nativeEvent: { text } }) => setPassword(text)}
          rightIcon={
            <Icon
              type="material-community"
              name={showPassword ? 'eye-outline' : 'eye-off-outline'}
              color='white'
              onPress={() => setShowPassword(!showPassword)}
            />
          }
          errorMessage={showMessage}
        />
        <Button
          title='Iniciar Sesión'
          containerStyle={LoginStyles.btnContainer}
          buttonStyle={LoginStyles.btnStyle}
          titleStyle={{ color: 'white' }}
          onPress={login}
        />
        <Loading
          visible={visible}
          title={"iniciando sesión"}
        />
      </View>
    </View>
  )
}
