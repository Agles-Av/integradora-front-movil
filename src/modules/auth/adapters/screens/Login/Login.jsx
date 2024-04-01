import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState } from 'react'
import { Image, Input, Button, Icon } from '@rneui/base'
import { isEmpty } from 'lodash';
import Loading from '../../../../../kernel/components/Loading';
import ErrorAlert from '../../../../../kernel/components/ErrorAlert';
import { LoginStyles } from './constants/Index';
import AxiosClient from '../../../../../config/http-gateway/http-cleint';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AuthContext from '../../../../../config/context/auth-context';



export default function Login() {
  const {user,dispatch} = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showMessage, setShowMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  //const navigation = useNavigation();

  

  const sigin = { email, password };

  const login = async () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      //proceso de inicio de sesión
      setShowMessage('');
      setVisible(true);
      try {
        const response = await AxiosClient({
          url: '/auth/signin',
          method: 'POST',
          data: JSON.stringify(sigin)
        })
          //hacer mipropio formato de datos
          const userdata = response.data;
          await AsyncStorage.setItem("user",JSON.stringify(userdata));
          dispatch({ type: 'SIGNIN', token: userdata.token, role: userdata.roles.name });
          console.log("rol desde admin",userdata.roles.name);
      } catch (error) {
        console.error("error login",error);
        setShowMessage("Usuario o contraseña incorrectos");
        setVisible(false);
        setErrorAlert(true);
        setTimeout(() => {
          setErrorAlert(false);
        }, 2000);
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
        <ErrorAlert
          visibleError={errorAlert}
          titleError={"Usuario o contraseña incorrectos"}
        />
      </View>
    </View>
  )
  /**
   *  const userdata = {
            token: response.data.token,
            role: response.data.usuario.role.name,
            id: response.data.usuario.id,
            name: response.data.usuario.person.name
          };
   */
}
