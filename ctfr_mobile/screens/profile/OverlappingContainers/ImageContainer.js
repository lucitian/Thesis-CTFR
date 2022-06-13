import { Alert, Animated, StyleSheet, View, Text, Modal, FlatList, Image, Pressable, TouchableOpacity as TORN, ScrollView, SafeAreaView, Dimensions} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { deviceHeight, deviceWidth } from '../helpers/constants';
import { Context as AuthContext } from '../../../context/UserContext';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { NavigationEvents } from 'react-navigation';
import * as ImagePicker from 'expo-image-picker';

const ImageContainer = ({
  scrollY,
  imageHeight,
  navigation
}) => { 
  const {state, covid_upload} = useContext(AuthContext)
  console.log(state.token)
  const [toggleN, setToggleN] = useState(true)
  const [toggleP, setToggleP] = useState(false)
  const [modalVisible, setModalVisible] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalCovid, setModalCovid] = useState(false)
  const [imageSource, setImageSource] = useState(null);

  // useEffect(() => {
  //   if ((state.token.userInfo.covidstatus).toLowerCase() == 'negative') {
  //     setToggleN(true)
  //     setToggleP(false)
  //   } else {
  //     setToggleN(false)
  //     setToggleP(true)
  //   }
  // })

  const changeVal = () => {
    if(toggleN == true){
      setModalCovid(true)
      setImageSource(null)
    } else if (toggleN == false) {
      setModalCovid(true)
      setImageSource(null)
    }
  }

  const splitFilename = function (str) {
    return str.split('\\').pop().split('/').pop()
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: false,
      aspect: [6, 9],
      quality: 1,
    });

    console.log(result);

    if (!result.cancelled) {
      setImageSource(result.uri);
    }
  }

  const Upload_Covid = () => {
    const covidFile = {
      uri: imageSource,
      name: splitFilename(imageSource),
      type: 'image/jpg',
    } 

    const formData = new FormData()

    formData.append('image', covidFile)
    covid_upload(formData)
    alert('Thank you for your cooperation! Please wait until we verify your covid test result.')
    setModalCovid(false)
  }

  return (
    <Animated.View style={[
      styles.topImage,
      {
        transform: [
          {
            scale: scrollY.interpolate({
              inputRange: [0, imageHeight],
              outputRange: [1, .9],
              extrapolate: 'clamp'
            })
          }
        ]
      }
    ]}>
      {/* <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          Alert.alert("Modal has been closed.");
          setModalVisible(!modalVisible);
        }}>
          <View style={styles.containerView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>Notifications</Text>
              <FlatList
                data={Notification}
                keyExtractor={(item, index) => index.toString()}
                renderItem={(notif) => {
                  return (
                    <View style={styles.listItem}>
                      <Text>{notif.item}</Text>
                    </View>
                      );
                    }}
              />
            </View>
          </View>
        </View>
      </Modal> */}
      <Modal 
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {setModalVisible(!modalVisible)}}
      >
        <View style = {styles.containerrrrrrrr}>
          <Pressable
            style={styles.notif1} 
            activeOpacity={1} 
            onPress ={() => {setModalVisible(false)}}
          >
          </Pressable> 
        </View>               
        <View style={styles.containerView}>
          <TouchableOpacity style = {styles.modalView}>
            <Text style = {styles.notifTitle}>Notifications</Text>
            <SafeAreaView>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.textNotif}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                  eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                  minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                  aliquip ex ea commodo consequat. Duis aute irure dolor in
                  reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                  pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                  culpa qui officia deserunt mollit anim id est laborum.
                </Text>
              </ScrollView>
            </SafeAreaView>
          </TouchableOpacity>
        </View>
      </Modal> 
      <Modal 
        animationType="slide"
        transparent={true}
        visible={modalVisible1}
        onRequestClose={() => {setModalVisible(!modalVisible1)}}
      >
        {/* <View style = {styles.containerrrrrrrr}>
          <Pressable
            style={styles.notif1} 
            activeOpacity={1} 
            onPress ={() => {setModalVisible1(false)}}
          >
          </Pressable> 
        </View> */}
        <View style={styles.containerHistory}>
          <TouchableOpacity style = {styles.modalHistory}>
            <View style={styles.headerHistory}>
              <Text style = {styles.notifTitle}> History</Text>
              <Pressable
                style={styles.closeBttn} 
                activeOpacity={1} 
                onPress ={() => {setModalVisible1(false)}}>
                <MaterialCommunityIcons name="close" size={25} color="black"/>
              </Pressable> 
            </View>
            <SafeAreaView>
              <ScrollView style={styles.scrollView}>
                <Text style={styles.textHistory}>
                </Text>
              </ScrollView>
            </SafeAreaView>
          </TouchableOpacity>
        </View>
      </Modal> 

      
      {/* Covid-19 Modal */}
      <Modal
        animationType='fade'
        transparent={true}
        visible={modalCovid}
        onRequestClose={() => {setModalCovid(!modalCovid)}}
      >
        <View style = {styles.containerCovid}>
          <View style={styles.covidHeader}>
            <Text style={styles.covidHeaderText}>You are about to change your covid status</Text>
          </View>
          <View style={styles.covidParagraph}>
            <Text style={styles.covidParagraphText}>Please upload a screenshot of the swab test result from the Red Cross website.</Text>
          </View>
          <View style={styles.documentContainer}>
            <Pressable style = {styles.button} onPress={pickImage}>
              {/* <Image style = {styles.ss} source={require('../../../assets/image-upload-placeholder.jpg')}></Image> */}
              <View style = {styles.button}>
                {imageSource === null ? (
                    <Image
                        source={require('../../../assets/image-upload-placeholder.jpg')}
                        style={styles.ss}
                        resizeMode='contain'
                    />
                    ) : (
                    <Image
                        source={{ uri: imageSource }}
                        style={styles.ss}
                        resizeMode='cover'
                    />
                    )}
              </View>    
            </Pressable>
          </View>
          <View style={styles.modalCovidButtons}>
            <TORN style={styles.modalCovidCancelButton} onPress = {() => setModalCovid(false)}>
              <Text style={styles.modalCancelButtonText}>
                Cancel
              </Text>
            </TORN>
            <TORN style={styles.modalCovidConfirmButton} onPress={()=> Upload_Covid()}>
              <Text style={styles.modalConfirmText}>
                Confirm
              </Text>
            </TORN>
          </View>
        </View>
      </Modal>
      
      {/* Main Menu */}
      <View style = {styles.containerMain}>
        <View style = {styles.notif}>
          <TouchableOpacity style = {styles.containerBttn} onPress={() => setModalVisible(true)}>
            <MaterialCommunityIcons name="bell" size={25} color="white"/>
          </TouchableOpacity>  
          <TouchableOpacity style = {styles.containerBttn} onPress={() => setModalVisible1(true)}>
            <MaterialCommunityIcons name="history" size={25} color="white"/>
          </TouchableOpacity>  
        </View>
        <View style = {styles.container}>
          <View style = {styles.hiContainer}>
            <Text style = { styles.infoText }>
              {/* {state.token.userInfo.firstname}! */}
            </Text>
          </View>
          <View style = {styles.msgContainer}>
            <Text style = { styles.message }>We advise the you update your Covid-19 status!</Text>
          </View>
          <View style = { styles.covidStatContainer}>
            <TouchableOpacity style = {[ toggleN == true ? styles.covidStatTrue : styles.covidStatFalse]} onPress = {() => changeVal()} disabled={(state.token.userInfo.covidstatus).toLowerCase() == 'negative' ? true : false}>
              <Text style = {[ toggleN == true ? styles.labelTrue : styles.labelFalse]}>Negative</Text>
            </TouchableOpacity>
            <TouchableOpacity style = {[ toggleP == true ? styles.covidStatTrue : styles.covidStatFalse]} onPress = {() => changeVal()} disabled={(state.token.userInfo.covidstatus).toLowerCase() == 'positive' ? true : false}>
              <Text style = {[ toggleP == true ? styles.labelTrue : styles.labelFalse]}>Positive</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Animated.View>
  )
}

const styles = StyleSheet.create({
  topImage: {
    width: '100%',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    overflow: 'hidden',
    height: deviceHeight,
    backgroundColor: '#A18AFF',
    // justifyContent: 'center',
    // alignItems: 'center',
  },

  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },

  containerMain: {
    // justifyContent: 'center',
    alignItems: 'flex-end',
    flex: 1
  },

  infoText: {
      fontSize: 40,
      color: 'white',
      fontWeight: 'bold',
      textAlign: 'center',
      // marginRight: 60,
      marginBottom: 10,
      // marginTop: 20,
  },

  covidStatContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: 250,
    height: 50,
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
    height: 50,
  },

  covidStatTrue:{
    justifyContent: 'center',
    alignItems: 'center',
    width: 130,
    height: 50,
    backgroundColor: 'white',
    borderRadius: 30
  },

  labelTrue: {
    color: '#A18AFF',
    fontWeight: "bold",
    fontSize: 15
  },

  labelFalse: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 15
  },

  message: {
    color: 'white',
    fontWeight: "bold",
    fontSize: 20
  },

  ss:{
    width: 280,
    height: 110,
  },

  button:{
    width: 280,
    height: 110,
  },

  msgContainer: {
    marginLeft: 60,
    marginRight: 50,
    marginBottom: 20
  },

  notif:{
    marginTop: 50,
    marginBottom: 40,
    marginRight: 20,
    direction: 'rtl'
  },

  notif1:{
    marginTop: 40,
    marginBottom: 10,
    marginRight: 35,
    direction: 'rtl',
    height: 25,
    width: 25,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    position: 'absolute',
    // direction: 'rtl',
  },
  containerView: {
    alignItems: 'flex-end',
    top: 5,
    right: 15,
  },
  modalView: {
    backgroundColor: "white",
    width: 200,
    height: 200,
    borderRadius: 20,
    paddingTop: 10,
    paddingBottom: 35,
    paddingHorizontal: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },

  containerrrrrrrr: {
    alignItems: 'flex-end',
  }, 
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  textHistory: {
    marginBottom: 15,
    textAlign: "center"
  },

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // backgroundColor: 'red'
  },

  notifTitle: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 5,
  },
  containerBttn: {
    marginBottom: 15
  },

  containerHistory:{
    width: 350,
    height: 400,
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    // height: deviceHeight/3,
    marginTop: deviceHeight/4,
    opacity: .9
  },
  headerHistory:{
    width: 350,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  modalHistory: {
    width:350,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    height: 400,
  },
  closeBttn:{
    marginTop:-25,
    alignSelf: 'flex-end',
    marginRight: 15
  },
  textHistory:{
    padding: 15
  },
  containerCovid: {
    width: 340,
    height: 350,
    flexDirection: 'column',
    backgroundColor: "white",
    borderRadius: 25,
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    // height: deviceHeight/3,
    marginTop: deviceHeight/5,
    opacity: .9
  },
  covidHeader: {
    top: 30,
    marginLeft: 30,
    marginRight: 30
  },
  covidHeaderText: {
    fontWeight: 'bold',
    fontSize: 20,
  },
  covidParagraph: {
    marginLeft: 30,
    marginRight: 30,
  },
  covidParagraphText: {
    fontSize: 15,
  },
  modalCovidButtons: {
    bottom: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    width: '100%'
  },
  modalCovidCancelButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 7.5,
    backgroundColor: '#C1C1C1',
    width: 140,
    height: 45,
    borderRadius: 30
  },
  modalCancelButtonText: {
    fontSize: 15,
  },
  modalCovidConfirmButton: {
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 7.5,
    backgroundColor: '#8CD4F5',
    width: 140,
    height: 45,
    borderRadius: 30
  },

  documentContainer:{
    height: 110,
    width: 280,
    marginTop: -20,
    marginBottom: 5 
  },

  modalConfirmText: {
    fontSize: 15
  }
})

export default ImageContainer;