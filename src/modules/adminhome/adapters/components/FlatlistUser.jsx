import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Icon } from '@rneui/base'

export default function FlatlistUser(props) {
    const {rol, name} = props
  return (
    <View style={styles.row}>
        <Icon name="account" type='material-community' size={24} color="#fff" />
        <Text style={styles.title}>{rol}</Text>
        <Text style={styles.title}>{name}</Text>
        <Icon name="account-cog" type='material-community' size={24} color="#fff" />
    </View>
  )
}


const styles = StyleSheet.create({
    
    title: {
      fontSize: 14,
      fontWeight: 'bold',
      color: '#fff',
    },
    row: {
        justifyContent: 'space-between' ,
      flexDirection: 'row',
      padding: 18,
      marginBottom: 12,
      backgroundColor:'#119DA4',
  
      // shadow ios
      shadowColor: 'black',
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
  
      // shadow android
      elevation:3,
      borderRadius: 8,
    },
    image: {
      width: 124,
      height: 124,
      borderRadius: 12,
    },
  })