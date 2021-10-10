import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

class LoginScreen extends React.Component {
    render() {
        return (
            <View style = { styles.container }>
                <TextInput
                    label = "Email"
                    mode = 'outlined'
                    style = { styles.loginTextInput }
                />
                <TextInput
                    label = "Password"
                    mode = 'outlined'
                    style = { styles.loginTextInput }
                />
                <Button 
                    mode = 'contained'
                    onPress = {() => console.log('Hahaha tangina mo Rovic')}
                    style = { styles.loginButton }
                >
                    Login
                </Button>
                <View style = { styles.loginTextContainer }>
                    <Text>Don't have an account?</Text>
                    <Text style = { styles.registerText }> Register.</Text>
                </View>
                
            </View>
        )
    }
}

export default LoginScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    loginTextInput: {
        width: '80%',
        height: 50,
        marginBottom: 15,
    },
    loginButton: {
        width: 120,
        height: 50,
        justifyContent: 'center',
        textAlign: 'center'
    },
    loginTextContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    registerText: {
        color: '#6948F4'
    }
})