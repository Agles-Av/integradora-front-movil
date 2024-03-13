import { StyleSheet, Text, View, Image, Button } from 'react-native'
import React, { useState } from 'react'
import { Input, Icon, Avatar } from '@rneui/base'
import { ColorPicker } from 'react-native-color-picker';


export default function System() {

    const changeAvatar = () => {
        console.log("AAAAAAAh");
    }
    const [selectedColor, setSelectedColor] = useState('#000000');
    const [colorA, setColorA] = useState('#000000');
    const [colorB, setColorB] = useState('#000000');
    const [colorC, setColorC] = useState('#000000');
    const [openModal, setOpenModal] = useState(false);

    return (
        <View style={styles.container}>
            <Avatar
                source={{ uri: 'data:image/png;base64,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' }}
                resizeMode='contain'
                size={230}
                rounded
            >
                <Avatar.Accessory size={24} onPress={changeAvatar} />
            </Avatar>
            <View style={styles.row}>
                <Button title="Color A" style={{backgroundColor:colorA}} onPress={() => setOpenModal(true)}/>
                <Button title="Color B" style={{backgroundColor:colorB}} onPress={() => setOpenModal(true)}/>
                <Button title="Color C" style={{backgroundColor:colorC}} onPress={() => setOpenModal(true)}/>

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'start',
        alignItems: 'center',
        padding: 32,
        backgroundColor: '#fff'
    },
    title: {
        fontWeight: "bold",
        fontSize: 24,
        textAlign: 'center',
        color: '#13505B'
    },
    row: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        padding: 18,
        marginBottom: 12,
    }
})