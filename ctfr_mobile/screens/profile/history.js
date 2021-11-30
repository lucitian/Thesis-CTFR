import React, { useContext } from 'react'
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native'

import { Context as AuthContext } from '../../context/UserContext'

function HistoryScreen ({ navigation }) {
    const { signout } = useContext(AuthContext)

    return(
        <View style = { styles.container }>
            <View style = { styles.signout }>
                <TouchableOpacity onPress = {signout}><Text>Sign out</Text></TouchableOpacity>
            </View>
            <View style = { styles.titleContainer }>
                <Text style = { styles.textTitle }>CTFR</Text>
            </View>
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
    titleContainer: {
        position: 'absolute',
        top: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 60,
        fontWeight: 'bold'
    }, 
})