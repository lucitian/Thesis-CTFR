import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { Context as AuthContext } from '../context/AuthContext'

function ProfileScreen({ navigation }) {
    const { signout } = useContext(AuthContext)

    return(
        <View style = { styles.container }>
            <View style = { styles.signout }>
                <TouchableOpacity onPress = {signout}><Text>Sign out</Text></TouchableOpacity>
            </View>
        </View>
        
    )
        
    
   
}

export default ProfileScreen

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