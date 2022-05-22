import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, Modal, Pressable } from 'react-native'
import { Camera } from 'expo-camera'
import { Audio } from 'expo-av'
import * as ImagePicker from 'expo-image-picker'
import * as MediaLibrary from 'expo-media-library'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import instance from '../../api/api'

function CameraScreenMask ({ navigation }) {
    const [hasCameraPermissions, setHasCameraPermissions] = useState(false)
    const [hasAudioPermissions, setHasAudioPermissions] = useState(false)
    const [hasGalleryPermissions, setHasGalleryPermissions] = useState(false)

    const [galleryItems, setGalleryItems] = useState([])

    const [cameraRef, setCameraRef] = useState(null)
    const [cameraType, setCameraType] = useState(Camera.Constants.Type.front)
    const [isCameraReady, setIsCameraReady] = useState(false)
    const [modalVisible1, setModalVisible1] = useState(true);

     useEffect(() => {
        (async () => {
            const cameraStatus = await Camera.requestPermissionsAsync()
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
                console.warn(error)
            }
        }
    }

    const stopVideo = async () => {
        if (cameraRef) {
            cameraRef.stopRecording()
        }
    }

    const pickFromGallery = async () => {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Videos,
            allowsEditing: true,
            aspect: [1, 1],
            quality: 1
        })
        if (!result.cancelled) {
            //@boss Lucitianism, try mo dito magcreate nung para sa db para di na siguro tayo gagawa pa panibagong button alaws na kasi pwesto wahahahahhaa
        }
    }

    if (!hasCameraPermissions || !hasGalleryPermissions) {
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
                   ref={ref => setCameraRef(ref)}
                   style={styles.camera}
                   ratio={'1:1'}
                   type={cameraType}
                   onCameraReady={() => setIsCameraReady(true)}
                />
            </View>   
            <View style={styles.buttonContainer} >
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        title = "Flip Camera"
                        onPress={() => setCameraType(cameraType === Camera.Constants.Type.front ? Camera.Constants.Type.back : Camera.Constants.Type.front)}>
                        <Image style = {styles.button} source={require('../../assets/flip.png')}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button2} title = 'Take Picture' 
                        disabled={!isCameraReady}
                        onLongPress={() => recordVideo()}
                        onPressOut={() => stopVideo()}>
                        {/* <Image style = {styles.button} source={require('../../assets/flip.png')}/> */}
                    </TouchableOpacity>
                </View>   
                <View>
                    <TouchableOpacity style={styles.button3} title = 'Submit Photos' onPress={() => pickFromGallery()}>
                            {galleryItems[0] == undefined ?
                            <></>
                            :
                            <Image
                                style={styles.galleryButtonImage}
                                source={{ uri: galleryItems[0].uri }}
                            />} 
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
        margin: 30
    },

    camera: {
        flex: 1,
        aspectRatio: 1,
    },

    buttonContainer:{
      flexDirection: 'row',
      justifyContent: 'space-evenly',
      alignItems: 'center',
      
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
    button3: {
      width: 50,
      height: 50,
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 10,
      overflow: 'hidden'
      
    },
    TextContainer: {
        marginTop: 20,
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    boldText: {
        color: '#6948f4',
        fontWeight: 'bold',
        fontSize: 50,
        marginLeft: 10
    },
    infoText: {
        fontSize: 17,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
        textAlign: 'justify',
        margin: 10
    },

    galleryButtonImage: {
        width: 50,
        height: 50,
    },
})