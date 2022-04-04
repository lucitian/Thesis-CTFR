import React, { useContext, useEffect, useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image, ImageBackground} from 'react-native';
import { NavigationEvents } from 'react-navigation'
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { Context as AuthContext } from '../../context/UserContext'


function ProfileScreen({ navigation }) {
    const { state, profile, signout } = useContext(AuthContext)
    const [toggleN, setToggleN] = useState(true)
    const [toggleP, setToggleP] = useState(false)
    
    console.log(state)

    const changeVal = () => {
        if(toggleN == true){
            setToggleN(false);
            setToggleP(true)
        }
        else if (toggleN == false) {
            setToggleN(true)
            setToggleP(false)
        }
         
    }
    return(
        <View style = { styles.container }>
            <ImageBackground style={ styles.imgBackground } 
                 resizeMode='stretch' 
                 source={require('../../assets/bg.png')}>
                <View>
                    <NavigationEvents onWillFocus = {profile} />

                    <View style = {styles.notif}>
                            <View style = {styles.containerNotif}>
                                <MaterialCommunityIcons name="bell-outline" size={25} color="white"/>
                            </View>
                            <View style = {styles.containerNotif}>
                                <MaterialCommunityIcons name="history" size={25} color="white"/>
                            </View>  
                    </View> 
                    <View style = {styles.card}>
                        
                        <View style = {styles.picContainer}>
                            <View style = {styles.picRim}>
                                <Image style = { styles.pic } source={require('../../assets/Cars-2006.jpg')}/>
                            </View>
                        </View>
                        <View style = {styles.nameContainer}>
                            <Text style = { styles.name }>{state.firstname} {state.middleinitial}. {state.lastname}</Text>  
                            <MaterialCommunityIcons name="pencil" size={20} color="#3aafa9" style = {styles.pencil} />             
                        </View>
                        <View>
                            <Text style = { styles.email }>marcrovic.baja@tup.edu.ph</Text>
                        </View>
                        <View style = { styles.covidStatContainer}>
                            <TouchableOpacity style = {[ toggleN == true ? styles.covidStatTrue : styles.covidStatFalse]} onPress = {() => changeVal()}>
                                <Text style = {styles.label}>Negative</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style = {[ toggleP == true ? styles.covidStatTrue : styles.covidStatFalse]} onPress = {() => changeVal()}>
                                <Text style = {styles.label}>Positive</Text>
                            </TouchableOpacity>
                        </View>
                        <View style = {styles.infoContainer}>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="shield-outline" size={20} color="white" style = {styles.icons} />
                                <Text style = {styles.info}>{state.vaxstatus}</Text>
                            </View>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="calendar-month-outline" size={20} color="white" style = {styles.icons} />
                                <Text style = {styles.info}>{state.birthdate}</Text>
                            </View>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="phone-outline" size={20} color="white" style = {styles.icons} />
                                <Text style = {styles.info}>{state.contact}</Text>
                            </View>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="home-outline" size={20} color="white" style = {styles.icons} />
                                <Text style = {styles.info}>{state.address}</Text>
                            </View>
                            <TouchableOpacity style = {styles.logout} onPress = {signout}>
                                <View style = {styles.containerStrips}>      
                                    <MaterialCommunityIcons name="logout" size={20} color="white" style = {styles.icons} />
                                    <Text style = {styles.info}>Logout</Text>       
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </ImageBackground>    
        </View>   
    )
}

export default ProfileScreen


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
 
    card: {
        alignItems: 'center',
        justifyContent: 'center',
    },

    picContainer: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    pic: {
        width: 120,
        height: 120,
        borderRadius: 60,
    },  

    nameContainer: {
        alignItems: "center",
        flexDirection: "row"
    },  
    name: {
        marginTop: 20,
        marginLeft:40,
        fontSize: 30,
        color: "#fff",
        fontWeight: 'bold'
    },
    email: {
        fontSize: 18,
        color: "gray",
    },
    covidStatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 250,
        height: 40,
        borderRadius: 30,
        borderWidth: 0.5,
        margin: 20,
        borderColor: '#fff',
        color: '#fff'
    },

    covidStatFalse:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 120,
        height: 40,
    },

    covidStatTrue:{
        justifyContent: 'center',
        alignItems: 'center',
        width: 130,
        height: 40,
        backgroundColor: '#3aafa9',
        borderRadius: 30
    },


    label: {
        color: '#fff',
        fontWeight: "bold",
        fontSize: 15
    },

    imgBackground: {
        width: '100%',
        height: '100%',
        flex: 1
    },
    switchContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },

    containerStrips: {
        backgroundColor: "#555",
        width: 300,
        height: 50,
        borderRadius: 25,
        padding: 15,
        margin: 10,
        flexDirection: "row"
    },
    containerNotif:{
        backgroundColor: "#555",
        width: 45,
        height: 45,
        borderRadius: 25,
        padding: 10
    },
    notif:{
        justifyContent: "space-between",
        marginTop: 45,
        marginRight: 20,
        marginLeft: 20,
        flexDirection: "row"
    },
    logout: {
        flexDirection: "row"
    },
    info: {
        color: '#fff',
        fontSize: 18
    },

    icons: {
        marginLeft: 10,
        marginRight: 20
    },

    pencil: {
        padding: 10
    },

    picRim: {
        width: 140,
        height: 140,
        borderRadius: 70,
        borderWidth: 3,
        borderColor:'#3aafa9',
        padding: 7
    }
})