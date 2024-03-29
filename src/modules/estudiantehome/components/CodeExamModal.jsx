import { Modal, StyleSheet, Text, Pressable, View, TextInput, Button } from 'react-native';
import React ,{useState,useEffect}from 'react'

const CodeExamModal = ({ visibleCode }) => {
    const [inputText, setInputText] = useState('');

    return (
      <Modal
        animationType="slide"
        transparent={true}
        visible={visibleCode}
        >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TextInput
              style={styles.modalText}
              placeholder="Escribe algo aquí..."
              onChangeText={setInputText}
              value={inputText}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
             
              >
              <Text style={styles.textStyle}>Aceptar</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
             
              >
              <Text style={styles.textStyle}>Cancelar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
  );
}

export default CodeExamModal

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
      marginVertical: 5,
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
    }
  });