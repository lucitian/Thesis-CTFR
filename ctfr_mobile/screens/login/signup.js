import React, { useState, useContext } from 'react'
import { ScrollView, View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { NavigationEvents } from 'react-navigation'

import { Context as UserContext } from '../../context/UserContext'

function SignupScreen ({ navigation }) {
    const { control, reset } = useForm({ mode: 'onBlur' });

    const { state, signup, clearError } = useContext(UserContext)
    const [ username, setUsername ] = useState('')
    const [ email, setEmail ] = useState('')
    const [ password, setPassword ] = useState('')
    const [ c_password, setC_Password ] = useState('')

    const SignUp = () => {
        if (password !== c_password) {
            reset({
                password: '',
                c_password: ''
            })
        }
        else {
            signup({ username, email, password })
        }
    }

    return (
        <KeyboardAvoidingView style = {{ flex: 1 }}>
            <ScrollView contentContainerStyle = { styles.container }>
                <NavigationEvents onWillBlur = {clearError} />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Username'
                    render = {({
                        field: {onBlur}
                    })=> (
                        <TextInput
                            label = "Username"
                            value={username}            
                            onBlur={onBlur}            
                            onChangeText={setUsername} 
                            style = { styles.registerTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
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
                            style = { styles.registerTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Password'
                    render = {({
                        field: {onBlur}
                    })=> (
                        <TextInput
                            label = "Password"
                            value={password}            
                            onBlur={onBlur}            
                            onChangeText={setPassword} 
                            style = { styles.registerTextInput } 
                            mode = 'outlined' 
                            secureTextEntry = { true }
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Confirm Password'
                    render = {({
                        field: {onBlur}
                    })=> (
                        <TextInput
                            label = "Confirm Password"
                            value={c_password}            
                            onBlur={onBlur}            
                            onChangeText={setC_Password} 
                            style = {[ state.errorMessage == 0 ? styles.registerTextInput : styles.registerTextInputEM]} 
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
                    onPress = {SignUp}
                    style = { styles.registerButton }
                >
                    Register
                </Button>
                <View style = { styles.registerTextContainer }>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('login')}><Text style = { styles.registerText }> Sign in instead.</Text></TouchableOpacity>
                </View>
            </ScrollView>
        </KeyboardAvoidingView>
    )
}

export default SignupScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    registerTextInput: {
        width: '80%',
        height: 50,
        marginBottom: 15,
    },
    registerTextInputEM: {
        width: '80%',
        height: 50,
    },
    registerButton: {
        width: 120,
        height: 50,
        justifyContent: 'center',
        textAlign: 'center',
    },
    registerTextContainer: {
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