import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { NavigationEvents } from 'react-navigation'

import { Context as AuthContext } from '../context/AuthContext'

function LoginScreen ({ navigation }) {
    const { state, signin, clearError } = useContext(AuthContext)

    const { control } = useForm({ mode: 'onBlur' });

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const LogIn = () => {
        signin({ email, password })
    }

    return (
        <View style = { styles.container }>
            <NavigationEvents onWillBlur = {clearError} />
            <Controller
                control = { control }
                rules = {{
                    required: true
                }}
                name = 'email'
                render = {({
                    field: {onChange, value, onBlur}
                })=> (
                    <TextInput
                        label = "Email"
                        value={email}            
                        onBlur={onBlur}            
                        onChangeText={setEmail} 
                        style = { styles.loginTextInput } 
                        mode = 'outlined' 
                    />
                )} 
            />

            <Controller
                control = { control }
                name = 'password'
                render = {({
                    field: {onChange, value, onBlur}
                })=> (
                    <TextInput
                        label = "Password"
                        value={password}            
                        onBlur={onBlur}            
                        onChangeText={setPassword} 
                        style = {[ state.errorMessage == 0 ? styles.loginTextInput : styles.loginTextInputEM]} 
                        mode = 'outlined' 
                        secureTextEntry = { true }
                    />
                )} 
            />
            {state.errorMessage ? (
                <Text style = { styles.errorMessage }>
                    {state.errorMessage}
                </Text>
            ) : null}
            <Button 
                mode = 'contained'
                onPress = {LogIn}
                style = { styles.loginButton }
            >
                Login
            </Button>
            <View style = { styles.loginTextContainer }>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={() => navigation.navigate('signup')}><Text style = { styles.registerText }> Register.</Text></TouchableOpacity>
            </View>
        </View>
    )
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
    loginTextInputEM: {
        width: '80%',
        height: 50,
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
    },
    errorMessage: {
        margin: 5,
        color: 'red',
    }
})