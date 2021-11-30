import React, { useContext, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import { NavigationEvents } from 'react-navigation'

import { Context as AuthContext } from '../../context/UserContext'

function ProfileScreen({ navigation }) {
    const { state, profile, signout } = useContext(AuthContext)
    console.log(state)
    return(
        <View style = { styles.container }>
            <View style = { styles.signout }>
                <TouchableOpacity onPress = {signout}><Text>Sign out</Text></TouchableOpacity>
            </View>
            <View style = { styles.titleContainer }>
                <Text style = { styles.textTitle }>CTFR</Text>
            </View>
            <View>
                <NavigationEvents onWillFocus = {profile} />
                
                <View style = { styles.card }>
                    <View style = { styles.bgHalf}></View>
                    <View style = { styles.picContainer }>
                        <View style = { styles.pic }>
                            <Image style = { styles.profilePic } source={require('../../assets/Business_Baj.jpg')}/>
                        </View>
                    </View>
                    <View>
                        <Text style = { styles.name }>{state.firstname} {state.middleinitial}. {state.lastname}</Text>
                    </View>
                    <View>
                        <View style = { styles.covidStatContainer} >
                            <TouchableOpacity style = { styles.covidStatNegative }>
                                <Text>Negative</Text>
                            </TouchableOpacity>
                            <View style = { styles.divider }></View>
                            <TouchableOpacity style = { styles.covidStatPositive }>
                                <Text>Positive</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style = { styles.cardInfo }>
                        <Text style = { styles.cardInfoText }>Contact No.{'\t'}{'\t'}{'\t'}:{'\t'}{'\t'}{'\t'}{'\t'}+{state.contact}</Text>
                        <Text style = { styles.cardInfoText }>Date of Birth{'\t'}{'\t'}{'\t'}:{'\t'}{'\t'}{'\t'}{'\t'}{state.birthdate}</Text>
                        <Text style = { styles.cardInfoText }>Vaccination{'\t'}{'\t'}{'\t'}:{'\t'}{'\t'}{'\t'}{'\t'}{state.vaxstatus}</Text>
                        <Text style = { styles.cardInfoText }>Address{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}{'\t'}:{'\t'}{'\t'}{'\t'}{'\t'}{state.address}</Text>
                    </View>
                </View>
            </View>
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
    signout: {
        position: 'absolute',
        top: 35,
        left: 10
    },
    titleContainer: {
        position: 'absolute',
        top: 50,
        justifyContent: 'center',
        alignItems: 'center'
    },
    textTitle: {
        fontSize: 60,
        fontWeight: 'bold'
    }, 
    card: {
        alignItems: 'center',
        justifyContent: 'center',
        height: 400,
        width: 325,
        borderRadius: 5,
        elevation: 5,
        backgroundColor: '#ffffff'
    },
    bgHalf: {
        position: 'absolute',
        top: 0,
        width: '100%',
        height: 105,
        backgroundColor: '#6948f4',
        borderTopLeftRadius: 5,
        borderTopRightRadius: 5,
    },
    picContainer: {
        width: 110,
        height: 110,
        backgroundColor: '#37474F',
        borderRadius: 55,
        borderWidth: 0.25,
        elevation: 4,
        justifyContent: 'center',
        alignItems: 'center',
    },  
    pic: {
        width: 100,
        height: 100,
        backgroundColor: '#ffffff',
        borderRadius: 50,
        borderWidth: 0.25,
    },  
    profilePic: {
        width: 100,
        height: 100,
        borderRadius: 50,
    },  
    name: {
        fontSize: 22,
        margin: 10
    },
    covidStatContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        width: 200,
        height: 50,
        borderRadius: 30,
        borderWidth: 0.5,
        margin: 10
    },
    covidStatNegative: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
        borderTopLeftRadius: 30,
        borderBottomLeftRadius: 30,
        backgroundColor: '#6948f4'
    },
    covidStatPositive: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 100,
        height: 50,
        borderTopRightRadius: 30,
        borderBottomRightRadius: 30,
    },
    cardInfo: {
        marginTop: 10,
    },
    cardInfoText: {
        fontSize: 15
    },
    divider: {
        height: 50,
        borderWidth: 0.5
    }
})