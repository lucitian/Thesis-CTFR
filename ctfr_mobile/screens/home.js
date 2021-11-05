import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { NavigationEvents } from 'react-navigation'

import { Context as AuthContext } from '../context/AuthContext'

function HomeScreen ({ navigation }) {
    const { signout } = useContext(AuthContext)

    const { control } = useForm({ mode: 'onBlur' })

    const [ firstname, setFirstName ] = useState('')
    const [ middleinitial, setMiddleInitial ] = useState('')
    const [ lastname, setLastName ] = useState('')
    const [ nationality, setNationality ] = useState('')
    const [ contact, setContact ] = useState('')
    const [ vaxstatus, setVaxStatus ] = useState('')
    const [ address, setAddress ] = useState('')

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
                    name = 'firstname'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "First Name"
                            value={firstname}            
                            onBlur={onBlur}            
                            onChangeText={setFirstName} 
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
                    name = 'middleinitial'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Middle Initial"
                            value={middleinitial}            
                            onBlur={onBlur}            
                            onChangeText={setMiddleInitial} 
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
                    name = 'lastname'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Last Name"
                            value={lastname}            
                            onBlur={onBlur}            
                            onChangeText={setLastName} 
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
                    name = 'nationality'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Nationality"
                            value={nationality}            
                            onBlur={onBlur}            
                            onChangeText={setNationality} 
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
                    name = 'contact'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Contact Number"
                            value={contact}            
                            onBlur={onBlur}            
                            onChangeText={setContact} 
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
                    name = 'vaxstatus'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Vaccination Status"
                            value={vaxstatus}            
                            onBlur={onBlur}            
                            onChangeText={setVaxStatus} 
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
                    name = 'address'
                    render = {({
                        field: {onChange, value, onBlur}
                    })=> (
                        <TextInput
                            label = "Address"
                            value={address}            
                            onBlur={onBlur}            
                            onChangeText={setAddress} 
                            style = { styles.homeTextInput } 
                            mode = 'outlined' 
                        />
                    )} 
                />
                <Button 
                    mode = 'contained'
                    //onPress = {handleSubmit(onSubmit)}
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