import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native'
import { Icon } from '@rneui/base';
import React, { useEffect, useState } from 'react'
import FlatlistUser from '../components/FlatlistUser'
import AsyncStorage from '@react-native-async-storage/async-storage';
import AxiosClient from '../../../../config/http-gateway/http-cleint';
import { useNavigation } from '@react-navigation/native';


export default function UsersLists() {
    const navigation = useNavigation();
    const [users, setUsers] = useState([]);

    useEffect(() => {
        getUsers();
    }, []);

    const getUsers = async () => {
        try {
            const response = await AxiosClient({
                url: '/usuario/',
                method:"GET",
              })
              setUsers(response.data);
        } catch (error) {
            console.error('Error:', error);
        }
    }


    const goCreate = () => {
        navigation.navigate('CreateUser');
    }
    const goEdit = (data) => {
        navigation.navigate('UpdateUser', {data});
    }

    return (
        <View style={styles.container}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                <TouchableHighlight

                    activeOpacity={0.6}
                    underlayColor="#DDDDDD"
                    onPress={goCreate}
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
                        onPress={() => goEdit(item)}>
                        <FlatlistUser rol={item.role.name} name={item.person.name} status={item.status}/>
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