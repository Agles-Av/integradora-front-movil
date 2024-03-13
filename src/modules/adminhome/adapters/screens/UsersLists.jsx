import { StyleSheet, Text, View, FlatList, TouchableHighlight } from 'react-native'
import React from 'react'
import FlatlistUser from '../components/FlatlistUser'

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
    return (
        <View style={styles.container}>
            <FlatList
                data={DATA}
                renderItem={({ item }) =>
                    <TouchableHighlight
                        activeOpacity={0.6}
                        underlayColor="#DDDDDD"
                        onPress={() => alert('Booooooooo')}>
                        <FlatlistUser rol={item.role} name={item.name} />

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