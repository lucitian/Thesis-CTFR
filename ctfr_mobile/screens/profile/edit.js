// import React, { useContext, useEffect, useState } from 'react';
// import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
// import { MaterialCommunityIcons } from '@expo/vector-icons';
// import { NavigationEvents } from 'react-navigation'

// import { Context as AuthContext } from '../../context/UserContext'
// import { TextInput } from 'react-native-gesture-handler';


// function EditScreen({ navigation }) {
//     const { state, profile, signout } = useContext(AuthContext)
//     // const [toggleN, setToggleN] = useState(true)
//     // const [toggleP, setToggleP] = useState(false)
    
//     // console.log(state)

//     // const changeVal = () => {
//     //     if(toggleN == true){
//     //         setToggleN(false);
//     //         setToggleP(true)
//     //     }
//     //     else if (toggleN == false) {
//     //         setToggleN(true)
//     //         setToggleP(false)
//     //     }
         
//     // }
//     return(
//         <View style = { styles.container }>
//              <View style = { styles.homeComponents }>
//                     <View style = { styles.TextContainer }>
//                         <Text style = { styles.boldText }>
//                             Hi!
//                         </Text>
//                     </View>
//                     <View>
//                         <Text style = { styles.infoText }>{'\t'} Is there an information that needs editing? Feel free to modify your information for us to continue in providing accurate reports.</Text>
//                     </View>
//                 </View>
//             <View style = {styles.infoContainer}>
//                 <View style = {styles.containerStrips}>
//                     <MaterialCommunityIcons name="shield-outline" size={20} color="white" style = {styles.icons} />
//                     {/* <Text style = {styles.info}> placeholder = {state.vaxstatus}</Text> */}
//                     <TextInput style = {styles.info} placeholder = {state.vaxstatus}></TextInput>
//                 </View>
//                     <View style = {styles.containerStrips}>
//                         <MaterialCommunityIcons name="calendar-month-outline" size={20} color="white" style = {styles.icons} />
//                         {/* <Text style = {styles.info}>placeholder = {state.birthdate}</Text> */}
//                         <TextInput style = {styles.info} placeholder = {state.birthdate}></TextInput>
//                     </View>
//                     <View style = {styles.containerStrips}>
//                         <MaterialCommunityIcons name="phone-outline" size={20} color="white" style = {styles.icons} />
//                         {/* <Text style = {styles.info}>placeholder = {state.contact}</Text> */}
//                         <TextInput style = {styles.info} placeholder = {state.contact}></TextInput>
//                     </View>
//                     <View style = {styles.containerStrips}>
//                         <MaterialCommunityIcons name="home-outline" size={20} color="white" style = {styles.icons} />
//                         {/* <Text style = {styles.info}>placeholder = {state.address}</Text> */}
//                         <TextInput style = {styles.info} placeholder = {state.address}></TextInput>
//                     </View>
//                     <TouchableOpacity style = {styles.logout} onPress = {signout}>
//                         <View style = {styles.containerSubmit}>      
//                             <Text style = {styles.submit}>Update</Text>       
//                         </View>
//                     </TouchableOpacity>
//                 </View>  
//         </View>   
//     )
// }

// export default EditScreen

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#F5F5F5',
//         justifyContent: 'center',
//         alignItems: 'center',
//     },
//     homeComponents: {
//         flexDirection: 'row',
//         flexWrap: 'wrap',
//         margin: 10
//     },
//     TextContainer: {
//         flexDirection: 'row',
//         alignSelf: 'flex-start',
//     },
//     boldText: {
//         color: '#6948f4',
//         fontWeight: 'bold',
//         fontSize: 70,
//         marginLeft: 10
//     },
//     infoText: {
//         fontSize: 17,
//         textAlign: 'left',
//         marginHorizontal: 10,
//         marginBottom: 50,
//         marginTop: 20
//     },

//     card: {
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     picContainer: {
//         marginTop: 20,
//         justifyContent: 'center',
//         alignItems: 'center',
//     },  
//     pic: {
//         width: 120,
//         height: 120,
//         borderRadius: 60,
//     },  

//     nameContainer: {
//         alignItems: "center",
//         flexDirection: "row"
//     },  
//     name: {
//         marginTop: 20,
//         marginLeft:40,
//         fontSize: 30,
//         color: "#fff",
//         fontWeight: 'bold'
//     },
//     email: {
//         fontSize: 18,
//         color: "gray",
//     },
//     covidStatContainer: {
//         flexDirection: 'row',
//         alignItems: 'center',
//         justifyContent: 'center',
//         width: 250,
//         height: 40,
//         borderRadius: 30,
//         borderWidth: 0.5,
//         margin: 30,
//         borderColor: '#fff',
//         color: '#fff'
//     },

//     covidStatFalse:{
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 120,
//         height: 40,
//     },

//     covidStatTrue:{
//         justifyContent: 'center',
//         alignItems: 'center',
//         width: 130,
//         height: 40,
//         backgroundColor: '#3aafa9',
//         borderRadius: 30
//     },


//     label: {
//         color: '#fff',
//         fontWeight: "bold",
//         fontSize: 15
//     },

//     imgBackground: {
//         width: '100%',
//         height: '100%',
//         flex: 1
//     },
//     switchContainer:{
//         flex: 1,
//         alignItems: 'center',
//         justifyContent: 'center',
//     },

//     containerStrips: {
//         backgroundColor: "#555",
//         width: 300,
//         height: 50,
//         borderRadius: 25,
//         padding: 15,
//         margin: 10,
//         flexDirection: "row"
//     },
//     containerNotif:{
//         backgroundColor: "#555",
//         width: 45,
//         height: 45,
//         borderRadius: 25,
//         padding: 10
        
//     },
//     containerSubmit: {
//         backgroundColor: "#555",
//         width: 300,
//         height: 50,
//         borderRadius: 25,
//         padding: 15,
//         margin: 10,
//     },
//     notif:{
//         justifyContent: "space-between",
//         marginTop: 80,
//         marginRight: 20,
//         marginLeft: 20,
//         flexDirection: "row"
//     },
//     logout: {
//         flexDirection: "row"
//     },
//     info: {
//         color: '#fff',
//         fontSize: 18
//     },
//     submit: {
//         color: '#fff',
//         fontSize: 18,
//         textAlign: 'center'
//     },

//     icons: {
//         marginLeft: 10,
//         marginRight: 20
//     },

//     pencil: {
//         padding: 10
//     },

//     picRim: {
//         width: 140,
//         height: 140,
//         borderRadius: 70,
//         borderWidth: 3,
//         borderColor:'#3aafa9',
//         padding: 7
//     }
// })



import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, TouchableOpacity, Platform } from 'react-native'
import { TextInput, Button, Provider } from 'react-native-paper'
import { TextInputMask } from 'react-native-masked-text'
import { useForm, Controller } from 'react-hook-form'
import DropDown from 'react-native-paper-dropdown'
import { NavigationEvents } from 'react-navigation'

import { Context as UserContext } from '../../context/UserContext'
import { Context as IntroContext } from '../../context/IntroContext'
import { Context as AuthContext } from '../../context/UserContext'

function FillScreen ({ navigation }) {
    const { fillup } = useContext(IntroContext)
    const { state, profile, signout } = useContext(AuthContext)

    const { control, reset } = useForm({ mode: 'onBlur' })

    const [ firstname, setFirstName ] = useState(state.firstname)
    const [ middleinitial, setMiddleInitial ] = useState(state.middleinitial)
    const [ lastname, setLastName ] = useState(state.lastname)
    const [ contact, setContact ] = useState(state.contact)
    const [ birthdate, setBirthdate ] = useState(state.birthdate)
    const [ vaxstatus, setVaxStatus ] = useState(state.vaxstatus)
    const [ address, setAddress ] = useState(state.address)

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

    const FillUp = () => {
        fillup({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address })
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
                        <Text style = { styles.infoText }> {'\t'} Is there an information that needs editing? Feel free to modify your information for us to continue in providing accurate reports.</Text>
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
                            name = 'Middle Initial'
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
                            name = 'Last Name'
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
                            name = 'Contact Number'
                            render = {({
                                field: {onChange, value, onBlur}
                            })=> (
                                <TextInput
                                    label = "Contact Number"
                                    placeholder = "639xxxxxxxxx"
                                    maxLength={12}
                                    keyboardType = 'numeric'
                                    value={contact}            
                                    onBlur={onBlur}         
                                    onChangeText={setContact} 
                                    style = { styles.infoTextInput } 
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
                                    label = "Date of Birth"                                   
                                    placeholder = "mm/dd/yyyy"
                                    keyboardType ='numeric'
                                    onBlur = {onBlur}
                                    render = { (props) => (
                                        <TextInputMask
                                            {...props}
                                            type={'datetime'}
                                            options={{
                                                format: 'MM/DD/YYYY'
                                            }}
                                            value = {birthdate}
                                            onChangeText={(text) => {
                                                props.onChangeText?.(text) 
                                                setBirthdate(text)
                                            }}
                                        />
                                    )}
                                    style = { styles.infoTextInput }
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
                        onPress = {FillUp}
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