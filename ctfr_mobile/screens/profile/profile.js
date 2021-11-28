import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import { Context as AuthContext } from '../../context/UserContext'

function ProfileScreen({ navigation }) {
    const { state, profile, signout } = useContext(AuthContext)
    console.log(state)
    return(
        <View style = { styles.container }>
            <View style = { styles.signout }>
                <TouchableOpacity onPress = {signout}><Text>Sign out</Text></TouchableOpacity>
            </View>
            <View>
                <NavigationEvents onWillFocus = {profile} />

                <Image source={{ uri: state.image[2] }}></Image>
                <Text>Yo. Id: {state.userId}</Text>
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