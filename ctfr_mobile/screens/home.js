import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'
import { NavigationEvents } from 'react-navigation'
import DropDownPicker from 'react-native-dropdown-picker';

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

    const [open, setOpen] = useState(false);
    const [items, setItems] = useState([
      {label: 'Unvaccinated', value: 'unvaxx'},
      {label: 'Partially Vaccinated', value: 'partialvaxx'},
      {label: 'Fully Vaccinated', value: 'fullyvaxx'},
    ]);
  

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
                            name = 'nationality'
                            render = {({
                                field: {onChange, value, onBlur}
                            })=> (
                                <TextInput
                                    label = "Nationality"
                                    value={nationality}            
                                    onBlur={onBlur}            
                                    onChangeText={setNationality} 
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
                         <Controller
                            control = { control }
                            rules = {{
                                required: true
                            }}
                            name = 'vaxstatus'
                            render = {({
                                field: {onChange, value, onBlur}
                            })=> (
                                <View style = {styles.infoTextInput1}>
                                    <DropDownPicker
                                        open={open}
                                        value={vaxstatus}
                                        items={items}
                                        setOpen={setOpen}
                                        setValue={setVaxStatus}
                                        setItems={setItems}
                                        placeholder="Vaccination Status"
                                        zIndex = {1000}
                                        style={{
                                            marginTop: 6,
                                            borderColor: 'gray',
                                            borderRadius: 5,
                                            backgroundColor: '#F5F5F5',
                                            
                                          }}
                                        containerStyle={{
                                            
                                        }}
                                        textStyle={{
                                            color: 'gray',
                                            fontSize: 16
                                        }}
                                  
                                        />
                                </View>
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
        margin: 10
    },
    homeTextInput: {
        width: 380,
        height: 50,
        margin: 10
    },

    infoTextInput: {
        width: 180,
        height: 50,
        margin: 10
    },
    infoTextInput1: {
        width: 180,
        height: 50,
        margin: 10,
        zIndex: 1000,

    },
    proceedButton: {
        marginTop: 25,
        width: 380,
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