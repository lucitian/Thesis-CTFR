import React, { useEffect, useState, useContext } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { NavigationEvents } from 'react-navigation'

import { Context as UserContext } from '../../context/UserContext'

function LoginScreen ({ navigation }) {
    const { state, signin, clearError } = useContext(UserContext)

    const { control } = useForm({ mode: 'onBlur' });

    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')

    const LogIn = () => {
        signin({ email, password })
    }

    return (
        <View style = { styles.container }>
            <NavigationEvents onWillBlur = {clearError} />
            <View>
                <Image
                    style = {{ width: 200, height: 200, marginBottom: 50}}
                    source={require('../../assets/logo.png')}
                />
            </View>
            <Controller
                control = { control }
                rules = {{
                    required: true
                }}
                name = 'Email'
                render = {({
                    field: {onBlur}
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
                name = 'Password'
                render = {({
                    field: {onBlur}
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
        backgroundColor: '#FFFFFF',
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