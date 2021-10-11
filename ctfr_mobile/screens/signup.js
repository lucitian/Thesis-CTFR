import React from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'

function SignupScreen () {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const onSubmit = data => console.log(JSON.stringify(data)); 

    return (
        <View style = { styles.container }>
            <Controller
                control = { control }
                rules = {{
                    required: true
                }}
                name = 'Username'
                render = {({
                    field: {onChange, value, onBlur}
                })=> (
                    <TextInput
                        label = "Username"
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)} 
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
                    field: {onChange, value, onBlur}
                })=> (
                    <TextInput
                        label = "Email"
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)} 
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
                    field: {onChange, value, onBlur}
                })=> (
                    <TextInput
                        label = "Password"
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)} 
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
                    field: {onChange, value, onBlur}
                })=> (
                    <TextInput
                        label = "Confirm Password"
                        value={value}            
                        onBlur={onBlur}            
                        onChangeText={value => onChange(value)} 
                        style = { styles.registerTextInput } 
                        mode = 'outlined' 
                        secureTextEntry = { true }
                    />
                )} 
            />
            <Button 
                mode = 'contained'
                onPress = {handleSubmit(onSubmit)}
                style = { styles.registerButton }
            >
                Register
            </Button>
        </View>
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
    registerButton: {
        width: 120,
        height: 50,
        justifyContent: 'center',
        textAlign: 'center'
    },
    registerTextContainer: {
        marginTop: 15,
        flexDirection: 'row',
        alignItems: 'flex-end',
    },
    registerText: {
        color: '#6948F4'
    }
})