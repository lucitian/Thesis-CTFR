import React, { useContext, useEffect, useState } from 'react';
import { Animated, StyleSheet,TouchableOpacity, Image, ImageBackground, View, Text,} from 'react-native';
import { deviceHeight, deviceWidth } from '../helpers/constants';
import { Context as AuthContext } from '../../../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation'


const BottomContainer = ({
    navigation,
    scrollY, 
    imageHeight,
    ...props
}) => {  
    const { state, profile, signout} = useContext(AuthContext)
    const animateBorderRadius = scrollY.interpolate({
        inputRange: [0, 450 - 100],
        outputRange: [40, 0],
  })
    
  return (
    <Animated.ScrollView
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{
        paddingBottom: 200,
        backgroundColor: 'transparent',
        marginTop: -100,
      }}
      onScroll={Animated.event(
        [{ nativeEvent: { contentOffset: { y: scrollY } } }],
        { useNativeDriver: true },
        () => { },          // Optional async listener
      )}
      style={[{ paddingTop: imageHeight }]}>
      <Animated.View style={[
        styles.block,
        {
          borderTopLeftRadius: animateBorderRadius,
          borderTopRightRadius: animateBorderRadius
        }
      ]}>
        {/* {props.children} */}
        <View style = {styles.card}>
                        <View style = {styles.picContainer}>
                            <View style = {styles.picRim}>
                                <Image style = { styles.pic } source={require('../../../assets/Cars-2006.jpg')}/>
                            </View>
                        </View>
                        <View style = {styles.nameContainer}>
                            <Text style = { styles.name }>{state.firstname} {state.middleinitial}. {state.lastname}</Text>  
                            {/* <Text style = { styles.name }>James B. Dela Pena</Text>  */}
                            <TouchableOpacity onPress={() => navigation.navigate('edit')}>
                                <MaterialCommunityIcons name="pencil" size={20} color="#A18AFF" style = {styles.pencil} />
                            </TouchableOpacity>  
                        </View>
                        <View>
                            <Text style = { styles.email }>james.delapena@tup.edu.ph</Text>
                        </View>
                        
                        <View style = {styles.infoContainer}>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="shield-outline" size={20} color="white" style = {styles.icons} />
                                {/* <Text style = {styles.info}>{state.vaxstatus}</Text> */}
                                <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>Fully Vaccinated</Text>
                            </View>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="calendar-month-outline" size={20} color="white" style = {styles.icons} />
                                {/* <Text style = {styles.info}>{state.birthdate}</Text> */}
                                <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>03/25/2000</Text>
                            </View>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="phone-outline" size={20} color="white" style = {styles.icons} />
                                {/* <Text style = {styles.info}>{state.contact}</Text> */}
                                <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>09550259942</Text>
                            </View>
                            <View style = {styles.containerStrips}>
                                <MaterialCommunityIcons name="home-outline" size={20} color="white" style = {styles.icons} />
                                {/* <Text style = {styles.info}>{state.address}</Text> */}
                                <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>Noveleta, Cavite, asdasdh askdhas jkkdhakjsdhaksjdas</Text>
                            </View>
                            <TouchableOpacity style = {styles.logout} onPress = {signout}>
                                <View style = {styles.containerStrips}>      
                                    <MaterialCommunityIcons name="logout" size={20} color="white" style = {styles.icons} />
                                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>Logout</Text>
       
                                </View>
                            </TouchableOpacity>
                        </View>
        </View>
      </Animated.View>
      <View style={{ height: 0.4 * deviceHeight }}></View>
    </Animated.ScrollView>
  )
}


export default BottomContainer;

const styles = StyleSheet.create({
  block: {
    backgroundColor: 'white',
    width: deviceWidth,
    height: deviceHeight,
  },




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
    marginTop: 40,
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
    color: "#A18AFF",
    fontWeight: 'bold'
},
email: {
    fontSize: 18,
    color: "gray",
    marginBottom: 30,
},
covidStatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 40,
    borderRadius: 30,
    borderWidth: 0.5,
    margin: 30,
    borderColor: '#C3BBE5',
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
    backgroundColor: '#A18AFF',
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
    backgroundColor: "#C3BBE5",
    width: 300,
    height: 50,
    borderRadius: 25,
    padding: 15,
    margin: 10,
    flexDirection: "row"
},
containerNotif:{
    width: 45,
    height: 45,
    
},
notif:{
    justifyContent: "space-between",
    marginTop: 80,
    marginRight: 20,
    marginLeft: 20,
    flexDirection: "row"
},
logout: {
    flexDirection: "row"
},
info: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center'

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
    borderColor:'#A18AFF',
    padding: 7
},
})
