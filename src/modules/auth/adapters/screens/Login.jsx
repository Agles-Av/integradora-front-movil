import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Image, Input, Button, Icon } from '@rneui/base'
import { isEmpty } from 'lodash';
import Loading from '../../../../kernel/components/Loading';
import Axios from "axios";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showMessage, setShowMessage] = useState("");
  const [visible, setVisible] = useState(false);

  const sigin = { email, password };
  const login = async () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      //proceso de inicio de sesión
      setShowMessage('');
      setVisible(true);
      try {
        fetch('http://192.168.1.69:8080/api/auth/signin', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(sigin)
        })
          .then(response => response.json())
          .then(data => {
            console.log('POST Request Result:', data);
          })
          .catch(error => {
            console.error('POST Request Error:', error);
          });

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
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://cdn-icons-png.flaticon.com/512/987/987815.png"
        }}
        style={styles.image}
      />
      <Text style={styles.text}>SIGEU</Text>
      <Text style={styles.text}>Sistema Gestor de Exámenes Universitarios </Text>
      <View style={styles.login}>
        <Input
          placeholder='Email'
          label="correo electronico *"
          keyboardType="email-address"
          labelStyle={styles.label}
          inputStyle={styles.input}
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
          labelStyle={styles.label}
          inputStyle={styles.input}
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
          containerStyle={styles.btnContainer}
          buttonStyle={styles.btnStyle}
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

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 16,
    backgroundColor: '#119DA4'
  },
  image: {
    width: 120,
    height: 120,
    resizeMode: "contain"
  },
  text: {
    fontSize: 24,
    color: "white",
    textAlign: "center"
  },
  login: {
    padding: 16,
    marginTop: 16,
    width: 350,
    alignItems: "center",
    justifyContent: "center",
  },
  label: {
    color: "white"
  },
  input: {
    color: "white"
  },
  btnContainer: {
    width: '80%',
  },
  btnStyle: {
    backgroundColor: '#039A00',
    shadowColor: "black",
    borderRadius: 5,
  }
})