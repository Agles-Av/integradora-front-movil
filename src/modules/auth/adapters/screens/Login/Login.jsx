import { StyleSheet, Text, View } from 'react-native'
import React, { useContext, useState, useEffect } from 'react'
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
  const [colors, setColors] = useState([]);
  const [photoURL, setPhotoURL] = useState([{id:"1",logo:""}]);
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(true);
  const [showMessage, setShowMessage] = useState("");
  const [visible, setVisible] = useState(false);
  const [errorAlert, setErrorAlert] = useState(false);
  //const navigation = useNavigation();

  const sigin = { email, password };
  console.log("AEAAH");

  useEffect(() => {
    const fetchColors = async () => {
      const colors = await getColorsFromStorage();
      const logo = await getLogoFromStorage();
      if (colors) {
        // Hacer algo con los colores obtenidos, como actualizar el estado
        setPhotoURL(logo);
        setColors(colors);
      }
    };
  
    fetchColors();
  }, []);
  console.log("colors", colors);
  console.log("photoURL", photoURL);
  const getLogoFromStorage = async () => {
    try {
      const logoData = await AsyncStorage.getItem('logo');
      if (logoData !== null) {
        return JSON.parse(logoData);
      }
    } catch (error) {
      console.error('Error al obtener logo de AsyncStorage:', error);
    }
  }

  const getColorsFromStorage = async () => {
    try {
      const colorsData = await AsyncStorage.getItem('colors');
      if (colorsData !== null) {
        return JSON.parse(colorsData);
      }
    } catch (error) {
      console.error('Error al obtener colores de AsyncStorage:', error);
    }
  };

  const login = async () => {
    if (!isEmpty(email) && !isEmpty(password)) {
      //proceso de inicio de sesión
      setShowMessage('');
      setVisible(true);
      try {
        const response = await AxiosClient({
          url: '/auth/signin',
          method: 'POST',
          data: JSON.stringify(sigin),
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
    <View style={[LoginStyles.container, { backgroundColor: colors.length > 0 ? colors[0].color1 : '#119DA4' }]}>
      <Image
        source={{
          uri: photoURL.length > 0 ? photoURL[0].logo : "https://cdn-icons-png.flaticon.com/512/987/987815.png"
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
