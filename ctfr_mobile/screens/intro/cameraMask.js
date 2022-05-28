import React, { useState, useEffect, useRef, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ToastAndroid, Modal, Pressable, SafeAreaView, ScrollView, ImageBackground } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { useNavigation } from '@react-navigation/native'

import { Context as IntroContext } from '../../context/IntroContext'

import instance from '../../api/api'

function CameraScreenMask ({ navigation }) {
    const { camera_uploadMask } = useContext(IntroContext)
    const [hasCameraPermission, setHasCameraPermission ] = useState(false)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
    const [hasGalleryPermission, setHasGalleryPermission ] = useState(false)
    const [galleryItems, setGalleryItems] = useState([])
    const [ cameraType, setCameraType ] = useState(Camera.Constants.Type.front)
    const [ cameraRef, setCameraRef ] = useState(null)
    const [ isCameraReady, setIsCameraReady ] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(true);
    

     useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync()
            setHasCameraPermission(cameraStatus.status == 'granted')

            const audioStatus = await Audio.requestPermissionsAsync()
            setHasAudioPermissions(audioStatus.status == 'granted')

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
                    const data = await videoRecordPromise.then(data => {
                    MediaLibrary.saveToLibraryAsync(data.uri)
                    console.log(data)
                    });
                    console.log(data)
                }
            } catch(error) {
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
        if(cameraRef){
           cameraRef.stopRecording()
        }
    }

    const splitFilename = function (str) {
        return str.toString().split('\\').pop().split('/').pop()
    }
    
    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [1,1],
            quality: 1
        })
        if(!result.cancelled){
            const videoFile = {
                uri: result.uri,
                name: splitFilename(result.uri),
                type: 'video/mp4'
            }

            const video = videoFile
            const formData = new FormData()

            formData.append('video', video)
            camera_uploadMask(formData)
            console.log('bruh')
            console.log(result.uri)
        }
    }

    if(!hasCameraPermission || !hasAudioPermissions || !hasGalleryPermission){
        return (
            <View>
                <Text>You do not have permissions</Text>
            </View>
        )
    }

    return (
        <View style = {styles.container}>
            <View style = { styles.TextContainer }>
                <Text style = { styles.boldText }>Lastly!</Text>
            </View>
            <View>
                <Text style = { styles.infoText }>We need to see your face with your face mask on.</Text>
            </View>
            <View style={styles.camContainer}>
                <Camera
                    ref = {ref => setCameraRef(ref)}  
                    style={styles.camera} 
                    type={cameraType}
                    ratio= {'1:1'}
                    onCameraReady={() => setIsCameraReady(true)}
                    onMountError={(error) => {
                        console.log("cammera error", error);
                      }}
                />
            </View>
            <View style={styles.buttonContainer} >
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        title = "Flip Camera"
                        onPress={() => {
                        setCameraType(
                            cameraType === Camera.Constants.Type.front
                            ? Camera.Constants.Type.back
                            : Camera.Constants.Type.front
                        );
                        }}>
                        <Image style = {styles.button} source={require('../../assets/flip.png')}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity 
                        style={styles.button2} title = 'Take Picture'
                        disabled={!isCameraReady} 
                        onLongPress = {() => recordVideo()}
                        onPressOut = {() => stopVideo()}>
                    </TouchableOpacity>
                </View>  
                <View>
                    <TouchableOpacity 
                        onPress={() => pickFromGallery()}
                        style= {styles.galleryButton}>
                        {galleryItems[0] == undefined ?
                        <></>:
                        <Image 
                            style = {styles.galleryButtonImage}
                            source = {{uri: galleryItems[0].uri}}/>
                        }
                    </TouchableOpacity>
                </View>  
            </View>   
        </View>
    )
}

export default CameraScreenMask

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
    },

    camContainer: {
        flex: 1,
        alignSelf: 'center',
        padding: 30
    },

    camera: {
        flex: 1,
        aspectRatio: 1,
    },

    buttonContainer:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      bottom: 0
      
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
    },

    TextContainer: {
        marginTop: 20,
        marginHorizontal: 10
    },
    boldText: {
        color: '#6948f4',
        fontWeight: 'bold',
        fontSize: 50,
    },
    infoText: {
        fontSize: 17,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
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

      
})