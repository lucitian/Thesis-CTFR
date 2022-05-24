import React, { useState, useEffect, useContext } from 'react'
<<<<<<< HEAD
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable, SafeAreaView, ScrollView, ImageBackground } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'

function CameraScreen () {
    const [hasCameraPermission, setHasCameraPermission ] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission ] = useState(false)
    const [galleryItems, setGalleryItems] = useState([])
    const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.front)
    const [ cameraRef, setCameraRef ] = useState(null)
    const [ isCameraReady, setIsCameraReady ] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(true);
    
=======
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable } from 'react-native'
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import instance from '../../api/api'

function CameraScreen ({ navigation }) {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false)

    const [galleryItems, setGalleryItems] = useState([])

    const [cameraRef, setCameraRef] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)
    const [isCameraReady, setIsCameraReady] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(true);

>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4

    useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync()
<<<<<<< HEAD
            setHasCameraPermission(cameraStatus.status == 'granted')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermission(galleryStatus.status == 'granted')

            if(galleryStatus.status == 'granted'){
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({sortBy: ['creationTime'], mediaType: ['video']})
                setGalleryItems(userGalleryMedia.assets)
            }
        })()     
    }, [])

    const recordVideo = async () => {
        if(cameraRef){
            try{
                const options = {maxDuration: 10, quality: Camera.Constants.VideoQuality['720'], mute: true}
                const videoRecordPromise = cameraRef.recordAsync(options)
                if(videoRecordPromise){
                    const data = await videoRecordPromise;
                    const source = data.uri
                }
            } catch(error) {
=======
            setHasCameraPermissions(cameraStatus.status == 'granted')

            const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync()
            setHasGalleryPermissions(galleryStatus.status == 'granted')

            if (galleryStatus.status == 'granted') {
                const userGalleryMedia = await MediaLibrary.getAssetsAsync({ sortBy: ['creationTime'], mediaType: ['video'] })
                setGalleryItems(userGalleryMedia.assets)
            }
        })()
    }, [])

    const recordVideo = async () => {
        if (cameraRef) {
            try {
                const options = { maxDuration: 10, quality: Camera.Constants.VideoQuality['720'], mute: true }
                const videoRecordPromise = cameraRef.recordAsync(options)
                if (videoRecordPromise) {
                    const data = await videoRecordPromise;
                    const source = data.uri
                    let sourceThumb = await generateThumbnail(source)
                    navigation.navigate('savePost', { source, sourceThumb })
                }
            } catch (error) {
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
<<<<<<< HEAD
        if(cameraRef){
           cameraRef.stopRecording()
=======
        if (cameraRef) {
            cameraRef.stopRecording()
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
        }
    }

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
<<<<<<< HEAD
            aspect: [1,1],
            quality: 1
        })
        if(!result.cancelled){
            //NOTE: dito yung pag save sa database @tian  
            //iyak nanaman mga kakampwet wahaha
        }
    }


    if(!hasCameraPermission || !hasGalleryPermission){
=======
            aspect: [1, 1],
            quality: 1
        })
        if (!result.cancelled) {
            //@boss Lucitianism, try mo dito magcreate nung para sa db para di na siguro tayo gagawa pa panibagong button alaws na kasi pwesto wahahahahhaa
        }
    }

    if (!hasCameraPermissions || !hasGalleryPermissions) {
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
        return (
            <View>
                <Text>You do not have permissions</Text>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
            <Modal 
                animationType="slide"
                transparent={true}
                visible={modalVisible1}
<<<<<<< HEAD
                onRequestClose={() => {setModalVisible1(!modalVisible1)}}
            >
                <View style={styles.containerHistory}>
                    <View style={styles.headerHistory}>
=======
                onRequestClose={() => {setModalVisible(!modalVisible1)}}
            >
                <View style={styles.containerHistory}>
                    <View style={styles.headerHistory}>
                        <Text style = {styles.notifTitle}> Instruction</Text>
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
                        <Pressable
                            style={styles.closeBttn} 
                            activeOpacity={1} 
                            onPress ={() => {setModalVisible1(false)}}>
<<<<<<< HEAD
                            <MaterialCommunityIcons name="close" size={25} color="black"/>
                        </Pressable> 
                    </View>
                    <View>
                        <Text style = {styles.Tip}>Instruction</Text>
                    </View>
                    <View>
                        <Text style = {styles.instruction}>Follow the pattern below when taking the video of your face. This will help us optimize our feature extraction as a part of our facial recognition.</Text>
=======
                            <MaterialCommunityIcons name="close" size={16} color="black"/>
                        </Pressable> 
                    </View>
                    <View>
                        <Text style={styles.textHistory}>
                        Follow the pattern seen below when taking video of your face as a part of our requirements. This is to optimize our feature extraction process as a part of our facial recognition.
                        </Text>
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
                    </View>
                    <View>
                        <Image style = {styles.gif} source={require('../../assets/rotating-head.gif')}/>
                    </View>
                </View>
<<<<<<< HEAD
            </Modal>
=======
            </Modal> 
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
            <View style = { styles.TextContainer }>
                <Text style = { styles.boldText }>Almost!</Text>
            </View>
            <View>
                <Text style = { styles.infoText }>Now, we need to see your face to perform our face recognition</Text>
            </View>
            <View style={styles.camContainer}>
                <Camera
<<<<<<< HEAD
                    ref = {ref => setCameraRef(ref)}  
                    style={styles.camera} 
                    type={cameraType}
                    ratio= {'1:1'}
                    onMountError={(error) => {
                        console.log("cammera error", error);
                      }}
                />
            </View>
=======
                   ref={ref => setCameraRef(ref)}
                   style={styles.camera}
                   ratio={'1:1'}
                   type={cameraType}
                   onCameraReady={() => setIsCameraReady(true)}
                />
            </View>   
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
            <View style={styles.buttonContainer} >
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        title = "Flip Camera"
<<<<<<< HEAD
                        onPress={() => {
                        setCameraType(
                            cameraType === Camera.Constants.Type.front
                            ? Camera.Constants.Type.back
                            : Camera.Constants.Type.front
                        );
                        }}>
=======
                        onPress={() => setCameraType(cameraType === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front)}>
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
                        <Image style = {styles.button} source={require('../../assets/flip.png')}/>
                    </TouchableOpacity>
                </View>
                <View>
<<<<<<< HEAD
                    <TouchableOpacity 
                        style={styles.button2} title = 'Take Picture'
                        disabled={!isCameraReady} 
                        onLongPress = {() => recordVideo()}
                        onPressOut = {() => stopVideo()}>
=======
                    <TouchableOpacity style={styles.button2} title = 'Take Picture' 
                        disabled={!isCameraReady}
                        onLongPress={() => recordVideo()}
                        onPressOut={() => stopVideo()}>
                        {/* <Image style = {styles.button} source={require('../../assets/flip.png')}/> */}
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
                    </TouchableOpacity>
                </View>  
                <View>
<<<<<<< HEAD
                    <TouchableOpacity 
                        onPress={() => pickFromGallery()}
                        style= {styles.galleryButton}>
                        {galleryItems[0] == undefined ?
                        <></>:
                        <Image 
                            style = {styles.galleryButtonImage}
                            source = {{uri: galleryItems[0].uri}}/>
                        }
=======
                    <TouchableOpacity style={styles.button3} title = 'Submit Photos' onPress={() => pickFromGallery()}>
                            {galleryItems[0] == undefined ?
                            <></>
                            :
                            <Image
                                style={styles.galleryButtonImage}
                                source={{ uri: galleryItems[0].uri }}
                            />} 
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
                    </TouchableOpacity>
                </View>  
            </View>   
        </View>
    )


    
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },

    camContainer: {
        flex: 1,
        alignSelf: 'center',
<<<<<<< HEAD
        padding: 30
=======
        margin: 30
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
    },

    camera: {
        flex: 1,
        aspectRatio: 1,
    },

    buttonContainer:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
<<<<<<< HEAD
      bottom: 0
=======
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
      
    },
    button: {
      width: 50,
      height: 50,
        
    },
    button2: {
      borderWidth:8,
      borderColor:'#ff404087',
      width:80,
      height:80,
      backgroundColor:'#ff4040',
      borderRadius:100,
<<<<<<< HEAD
=======
    },
    button3: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 10,
      overflow: 'hidden'
      
    },
<<<<<<< HEAD
    placeholder: {
        width: 50,
        height: 50,
    },

    placeholderPNG: {
        width: 300,
        height: 300,
        opacity: 0.5
>>>>>>> 8c8bbbff13a730f099555630f5936af5188779f9
    },

    TextContainer: {
        marginTop: 20,
        marginHorizontal: 10
=======
    TextContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'flex-start',
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
    },
    boldText: {
        color: '#6948f4',
        fontWeight: 'bold',
        fontSize: 50,
<<<<<<< HEAD
=======
        marginLeft: 10
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
    },
    infoText: {
        fontSize: 17,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
<<<<<<< HEAD
        marginBottom: 10
    },
    galleryButton: {
        borderWidth: 2,
        borderColor: 'white',
        borderRadius: 10,
        overflow: 'hidden',
        height: 50,
        width: 50
    },
    galleryButtonImage:{
        height: 50,
        width: 50
    },
    containerHistory:{
        width: 350,
        height: 420,
        backgroundColor: "white",
        borderRadius: 25,
        alignItems: 'center',
        alignSelf: 'center',
        // height: deviceHeight/3,
        marginTop: 130,
        opacity: 1,
        padding: 20

    },
    headerHistory:{
        width: 350,
    },
    modalHistory: {
        width:350,
    },
    closeBttn:{
        alignSelf: 'flex-end',
        marginRight: 20
    },
    gif: { 
        marginTop: 15,
        height: 200,
        width: 200
    },

    instruction: {
        margin: 10,
        // fontWeight: 'bold',
        fontSize: 15,
        textAlign: 'justify'
    },
    Tip: {
        fontWeight: 'bold',
        fontSize: 20,
        color: '#A18AFF'
    }

      
=======
        marginBottom: 10,
        textAlign: 'justify',
        margin: 10
    },

    galleryButtonImage: {
        width: 50,
        height: 50,
    },

    containerHistory:{
        width: 350,
        height: 400,
        backgroundColor: "white",
        borderRadius: 25,
        alignSelf: 'center',
        marginTop: 150,
        opacity: 1
      },
      headerHistory:{
        width: 350,
        alignItems: 'center',
        marginTop: 10
      },

      closeBttn:{
        marginTop:-25,
        alignSelf: 'flex-end',
        marginRight: 15
      },
      textHistory:{
        // padding: 15,
        textAlign: 'justify',
        marginHorizontal: 25,
        marginVertical: 15
      },

      notifTitle: {
        fontWeight: 'bold',
        fontSize: 16,
        marginBottom: 5,
        color: '#A18AFF'
      },

      gif: {
          width: 210,
          height: 210,
          alignSelf: 'center'
      }
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
})