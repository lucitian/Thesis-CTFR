import React, { useContext, useEffect, useState } from 'react';
import { Animated, StyleSheet,TouchableOpacity, Image, ImageBackground, View, Text,} from 'react-native';
import { deviceHeight, deviceWidth } from '../helpers/constants';
import { Context as AuthContext } from '../../../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation'
import * as ImagePicker from 'expo-image-picker';


const BottomContainer = ({
    navigation,
    scrollY, 
    imageHeight,
    ...props
}) => {  
    const { state, signout} = useContext(AuthContext)
    const [imageSource, setImageSource] = useState(null);
    const animateBorderRadius = scrollY.interpolate({
        inputRange: [0, 450 - 100],
        outputRange: [40, 0],
  })

    // function selectImage() {
    //     let options = {
    //     title: 'You can choose one image',
    //     maxWidth: 256,
    //     maxHeight: 256,
    //     noData: true,
    //     mediaType: 'photo',
    //     storageOptions: {
    //         skipBackup: true
    //     }
    //     };

    //     ImagePicker.launchImageLibrary(options, response => {
    //     if (response.didCancel) {
    //         console.log('User cancelled photo picker');
    //         Alert.alert('You did not select any image');
    //     } else if (response.error) {
    //         console.log('ImagePicker Error: ', response.error);
    //     } else if (response.customButton) {
    //         console.log('User tapped custom button: ', response.customButton);
    //     } else {
    //         let source = { uri: response.uri };

    //         // ADD THIS
    //         setImageSource(source.uri);
    //     }
    //     });
    // }

    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        }); 
    
        console.log(result);
    
        if (!result.cancelled) {
          setImageSource(result.uri);
        }
      };

      
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
        <View style = {styles.card}>
            <View style = {styles.picContainer}>
                <View style = {styles.picRim}>
                    {imageSource === null ? (
                    <Image
                        source={require('../../../assets/placeholderimage.png')}
                        style={styles.pic}
                        resizeMode='contain'
                    />
                    ) : (
                    <Image
                        source={{ uri: imageSource }}
                        style={styles.pic}
                        resizeMode='cover'
                    />
                    )}
                </View>
            </View>
            <TouchableOpacity onPress={pickImage}>
                <Text style = {styles.change}>change picture</Text>
            </TouchableOpacity>
            <View style = {styles.nameContainer}>
                <Text style = { styles.name }>
                    {state.token.userInfo.userInfo.firstname} {state.token.userInfo.userInfo.middleinitial}. {state.token.userInfo.userInfo.lastname}
                    </Text>
                <TouchableOpacity onPress={() => navigation.navigate('edit')}>
                    <MaterialCommunityIcons name="pencil" size={20} color="#A18AFF" style = {styles.pencil} />
                </TouchableOpacity>  
            </View>
            <View>
                <Text style = {styles.email}>
                    {state.token.userInfo.userInfo.email}
                    </Text>
            </View>
            
            <View style = {styles.infoContainer}>
                <View style = {styles.containerStrips}>
                    <MaterialCommunityIcons name="shield-outline" size={20} color="white" style = {styles.icons} />
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>
                        {state.token.userInfo.userInfo.vaxstatus}
                        </Text>
                </View>
                <View style = {styles.containerStrips}>
                    <MaterialCommunityIcons name="calendar-month-outline" size={20} color="white" style = {styles.icons} />
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>
                        {state.token.userInfo.userInfo.birthdate}
                        </Text>
                </View>
                <View style = {styles.containerStrips}>
                    <MaterialCommunityIcons name="phone-outline" size={20} color="white" style = {styles.icons} />
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>
                        {state.token.userInfo.userInfo.contact}
                        </Text>
                </View>
                <View style = {styles.containerStrips}>
                    <MaterialCommunityIcons name="home-outline" size={20} color="white" style = {styles.icons} />
                    <Text numberOfLines={1} adjustsFontSizeToFit={true} style = {styles.info}>
                        {state.token.userInfo.userInfo.address}
                        </Text>
                </View>
                <TouchableOpacity style = {styles.logout} onPress = {signout}>
                    <View style = {styles.containerStripsLogout}>      
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
        // backgroundColor: 'black'
    },  
    pic: {
        width: 100,
        height: 100,
        borderRadius: 280,
        alignSelf: 'center'
    },  
    change: {
        fontSize: 15,
        color: '#A18AFF',
        margin: 5 
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
        fontSize: 16,
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
    containerStripsLogout: {
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
        flexDirection: "row",
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
        width: 110,
        height: 110,
        borderRadius: 70,
        borderWidth: 5,
        borderColor:'#A18AFF',
        alignSelf: 'center'
    },
})
