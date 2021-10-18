import React, { useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'

import { Context as AuthContext } from '../context/AuthContext'

function HomeScreen ({ navigation }) {
    const { signout } = useContext(AuthContext)

    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const onSubmit = data => console.log(JSON.stringify(data)); 

    return (
        <View style = { styles.container }>
            <View style = { styles.signout }>
                <TouchableOpacity onPress = {signout}><Text>Sign out</Text></TouchableOpacity>
            </View>
            <View style = { styles.homeComponents }>
                <View style = { styles.TextContainer }>
                    <Text style = { styles.boldText }>Hello!</Text>
                </View>
                <View>
                    <Text style = { styles.infoText }>First, we would like to know your personal information to conduct a proper contact tracing.</Text>
                </View>
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Name'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Name"
                            value={value}            
                            onBlur={onBlur}            
                            onChangeText={value => onChange(value)} 
                            style = { styles.lefthomeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Middle'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Middle"
                            value={value}            
                            onBlur={onBlur}            
                            onChangeText={value => onChange(value)} 
                            style = { styles.lefthomeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Last Name'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Last Name"
                            value={value}            
                            onBlur={onBlur}            
                            onChangeText={value => onChange(value)} 
                            style = { styles.lefthomeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Nationality'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Nationality"
                            value={value}            
                            onBlur={onBlur}            
                            onChangeText={value => onChange(value)} 
                            style = { styles.righthomeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Contact Number'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Contact Number"
                            value={value}            
                            onBlur={onBlur}            
                            onChangeText={value => onChange(value)} 
                            style = { styles.righthomeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Vaccination Status'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Vaccination Status"
                            value={value}            
                            onBlur={onBlur}            
                            onChangeText={value => onChange(value)} 
                            style = { styles.righthomeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Controller
                    control = { control }
                    rules = {{
                        required: true
                    }}
                    name = 'Address'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Address"
                            value={value}            
                            onBlur={onBlur}            
                            onChangeText={value => onChange(value)} 
                            style = { styles.homeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Button 
                    mode = 'contained'
                    onPress = {handleSubmit(onSubmit)}
                    style = { styles.proceedButton }
                >
                    <Text style = { styles.textButton } > Proceed</Text>
                </Button>
            </View>
        </View>
    )
}

export default HomeScreen

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
    homeComponents: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    homeTextInput: {
        width: '91%',
        height: 50,
        marginBottom: 15,
    },
    lefthomeTextInput: {
        width: '43%',
        height: 50,
        marginBottom: 15,
        marginHorizontal: 10,
        alignSelf: 'flex-start'
    },
    righthomeTextInput: {
        width: '43%',
        height: 50,
        marginBottom: 10,
        marginHorizontal:10,
        alignSelf: 'flex-end'
    },
    proceedButton: {
        marginTop: 25,
        width: '85%',
        height: 50,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#C3BBE5',
        
    },
    textButton: {
        color: '#6948f4'
    },
    TextContainer: {
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    boldText: {
        color: '#6948f4',
        fontWeight: 'bold',
        fontSize: 70,
    },
    infoText: {
        fontSize: 17,
        justifyContent: 'center',
        textAlign: 'center',
        marginHorizontal: 10,
        marginBottom: 50,
        marginTop: 40
    }
})