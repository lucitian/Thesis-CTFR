import React from 'react'
import { View, StyleSheet, Text } from 'react-native'

function HistoryScreen ({ navigation }) {
    return(
        <View>
            <Text>Hello</Text>
        </View>
    )
}

export default HistoryScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    signout: {
        position: 'absolute',
        top: 35,
        left: 10
    },
})