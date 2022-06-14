import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { TextInput, Button, Provider } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useForm, Controller } from 'react-hook-form'
import DropDown from 'react-native-paper-dropdown'
import { Context as AuthContext } from '../../context/UserContext'

function FillScreen ({ navigation }) {
    const { state, update, signout } = useContext(AuthContext)
    const { control, reset } = useForm({ mode: 'onBlur' })

    const [ firstname, setFirstName ] = useState(state.token.userInfo.firstname)
    const [ middleinitial, setMiddleInitial ] = useState(state.token.userInfo.middleinitial)
    const [ lastname, setLastName ] = useState(state.token.userInfo.lastname)
    const [ contact, setContact ] = useState(state.token.userInfo.contact)
    const [ birthdate, setBirthdate ] = useState(state.token.userInfo.birthdate)
    const [ vaxstatus, setVaxStatus ] = useState(state.token.userInfo.vaxstatus)
    const [ address, setAddress ] = useState(state.token.userInfo.address)

    const [showDropDown, setShowDropDown] = useState(false);
    const vaxOptions = [
        {
            label: 'Fully Vaccinated',
            value: 'Fully Vaccinated'
        },
        {
            label: 'Partially Vaccinated',
            value: 'Partially Vaccinated'
        },
        {
            label: 'Not yet Vaccinated',
            value: 'Not yet Vaccinated'
        }
    ]

    const updateButton = () => {
        update({firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address})
        navigation.navigate('profile')
    }

    return (
        <Provider>
            <View style = { styles.container }>
                <View style = { styles.homeComponents }>
                    <View style = { styles.TextContainer }>
                        <Text style = { styles.boldText }>
                            Hi!
                        </Text>
                    </View>
                    <View>
                        <Text style = { styles.infoText }>Is there an information that needs editing? Feel free to modify your information for us to continue in providing accurate reports.</Text>
                    </View>
                </View>
                <View style = {styles.formContainer}>
                    <View style = {styles.pairContainer}>
                        <Controller
                            control = { control }
                            rules = {{
                                required: true
                            }}
                            name = 'Firstname'
                            render = {({
                                field: {onChange, value, onBlur}
                            })=> (
                                <TextInput
                                    label = "First Name"
                                    value = {firstname}
                                    onBlur={onBlur}            
                                    onChangeText={setFirstName} 
                                    style = {styles.infoTextInput} 
                                    mode = 'outlined' 
                                />
                            )} 
                        />
                        <Controller
                            control = { control }
                            rules = {{
                                required: true
                            }}
                            name = 'Middle Initial'
                            render = {({
                                field: {onChange, value, onBlur}
                            })=> (
                                <TextInput
                                    label = "Middle Initial"           
                                    value={middleinitial}
                                    onBlur={onBlur}            
                                    onChangeText={setMiddleInitial} 
                                    style = {styles.infoTextInput} 
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
                            name = 'Last Name'
                            render = {({
                                field: {onChange, value, onBlur}
                            })=> (
                                <TextInput
                                    label = "Last Name"            
                                    value={lastname}
                                    onBlur={onBlur}            
                                    onChangeText={setLastName} 
                                    style = {styles.infoTextInput} 
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
                                    placeholder = "639xxxxxxxxx"
                                    maxLength={12}
                                    keyboardType = 'numeric'
                                    value={(contact).toString()}
                                    onBlur={onBlur}         
                                    onChangeText={setContact} 
                                    style = {styles.infoTextInput } 
                                    mode = 'outlined' 
                                />
                            )} 
                        />
                    </View> 
                    <View style = { styles.pairContainer }>
                        <Controller
                            control = { control }
                            rules = {{
                                required: true
                            }}
                            name = 'Date of Birth'
                            render = {({
                                field: { onChange, value, onBlur }
                            }) => (
                                <TextInput                                
                                    placeholder = "yyyy/mm/dd"
                                    keyboardType ='numeric'
                                    onBlur = {onBlur}
                                    render = { (props) => (
                                        <TextInputMask
                                            {...props}
                                            type={'datetime'}
                                            options={{
                                                format: 'YYYY/MM/DD'
                                            }}                                            
                                            value={birthdate}
                                            onChangeText={(text) => {
                                                props.onChangeText?.(text) 
                                                setBirthdate(text)
                                            }}
                                        />
                                    )}
                                    style = {styles.infoTextInput}
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
                                field: { onChange, value, onBlur }
                            }) => (
                                <DropDown
                                    label = "Vaccination Status"
                                    visible = {showDropDown}
                                    showDropDown = {() => setShowDropDown(true)}
                                    onDismiss = {() => setShowDropDown(false)}
                                    onBlur = { onBlur }
                                    list = {vaxOptions}    
                                    value = {vaxstatus}
                                    setValue = {setVaxStatus}
                                    inputProps = {{
                                        style: {
                                            width: 175,
                                            height: 50,
                                            padding: 5,
                                        }
                                    }}   
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
                            name = 'Address'
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
                        onPress = {updateButton}
                        style = { styles.proceedButton }
                    >
                        <Text style = { styles.textButton }> Update</Text>
                    </Button>
                </View>
            </View>
        </Provider>
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