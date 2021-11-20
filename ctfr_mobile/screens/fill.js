import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { NavigationEvents } from 'react-navigation'

import { Context as AuthContext } from '../context/AuthContext'
import { Context as FillContext } from '../context/UserContext'

function FillScreen ({ navigation }) {
    const { signout } = useContext(AuthContext)
    const { fillup } = useContext(FillContext)

    const { control } = useForm({ mode: 'onBlur' })

    const [ firstname, setFirstName ] = useState('')
    const [ middleinitial, setMiddleInitial ] = useState('')
    const [ lastname, setLastName ] = useState('')
    const [ contact, setContact ] = useState('')
    const [ address, setAddress ] = useState('')

    const FillUp = () => {
        fillup({ firstname, middleinitial, lastname, contact, address })
    }

    return (
        <View style = { styles.container }>
            <View style = { styles.signout }>
                <TouchableOpacity onPress = {signout}><Text>Sign out</Text></TouchableOpacity>
            </View>
            <View style = { styles.homeComponents }>
                <View style = { styles.TextContainer }>
                    <Text style = { styles.boldText }>
                        Hello!
                    </Text>
                </View>
                <View>
                    <Text style = { styles.infoText }>{'\t'} First, we would like to know your personal information to conduct a proper contact tracing.</Text>
                </View>
            </View>
                <View style = {styles.formContainer}>
                    <View style = {styles.pairContainer}>
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
                                    style = { styles.infoTextInput} 
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
                                    style = { styles.infoTextInput} 
                                    mode = 'outlined' 
                                />
                            )} 
                        />
                    </View>
                    <View style = {styles.pairContainer}>
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
                                    style = { styles.infoTextInput} 
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
                                    style = { styles.infoTextInput} 
                                    mode = 'outlined' 
                                />
                            )} 
                        />
                    </View>          
                    <View>
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
                                    style = {styles.homeTextInput}
                                    mode = 'outlined' 
                                />
                            )} 
                        />
                    </View>
                </View>
                <View>
                    <Button 
                        mode = 'contained'
                        onPress = {FillUp}
                        style = { styles.proceedButton }
                    >
                        <Text style = { styles.textButton } > Proceed</Text>
                    </Button>
                </View>
            
        </View>
    )
}

export default FillScreen

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
        margin: 10
    },
    homeTextInput: {
        width: 350,
        height: 50,
        padding: 5
    },
    infoTextInput: {
        width: 175,
        height: 50,
        padding: 5,
    },
    infoTextInput1: {
        width: 175,
        height: 50,
        padding: 5,
    },
    proceedButton: {
        marginTop: 20,
        width: 340,
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
        marginLeft: 10
    },
    infoText: {
        fontSize: 17,
        textAlign: 'left',
        marginHorizontal: 10,
        marginBottom: 50,
        marginTop: 20
    },

    formContainer:{
        flexWrap: 'wrap',
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center'
    },
    pairContainer:{
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        
    }
})