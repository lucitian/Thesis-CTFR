import React from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'

import { Actions } from 'react-native-router-flux'
import { useForm, Controller } from 'react-hook-form'

function LoginScreen () {
    const SignUp = () => {
        Actions.signup()
    }
    
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const onSubmit = data => console.log(data); 

    return (
        <View style = { styles.container }>
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
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)} 
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
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)} 
                        style = { styles.loginTextInput } 
                        mode = 'outlined' 
                        secureTextEntry = { true }
                    />
                )} 
            />
            <Button 
                mode = 'contained'
                onPress = {handleSubmit(onSubmit)}
                style = { styles.loginButton }
            >
                Login
            </Button>
            <View style = { styles.loginTextContainer }>
                <Text>Don't have an account?</Text>
                <TouchableOpacity onPress={SignUp}><Text style = { styles.registerText }> Register.</Text></TouchableOpacity>
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