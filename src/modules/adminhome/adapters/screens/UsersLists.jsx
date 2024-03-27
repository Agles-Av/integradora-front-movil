import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native'
import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react'
import FlatlistUser from '../components/FlatlistUser'
import AsyncStorage from '@react-native-async-storage/async-storage';

const DATA = [
    {
        role: 'Docente',
        name: 'Huico',
    },
    {
        role: 'Docente',
        name: 'Migue',
    },
    {
        role: 'Docente',
        name: 'Sebastian',
    },
    {
        role: 'Estudiante',
        name: 'Agles',
    },
    {
        role: 'Estudiante',
        name: 'Víctor',
    },
];


export default function UsersLists() {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const token = await AsyncStorage.getItem('token');
            const response = await fetch('http://192.168.109.102:8080/api/usuario/', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + token
                }
            }).then(response => response.json())
            .then(data => {
              console.log('POST Request Result:', data.data);
            })
            if (response === 'OK') {
                setUsers(response.data);
            } else {
                console.error('Error:', responseData.message);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableHighlight

                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={() => alert(('Aah'))}
                >
                    <Icon name="plus-circle" type='material-community' size={44} color="#13505B" />
                </TouchableHighlight>
            </View>
            <FlatList
                data={users}
                renderItem={({ item }) =>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => alert(item)}>
                        <FlatlistUser rol={item.role.name} name={item.name} />
                    </TouchableHighlight>
                }
            />
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 16,
    },
    storiesContainer: {
        flexDirection: 'row',
        padding: 8,
    },
    storyItem: {
        marginRight: 12,
        alignItems: 'center',
    },
});