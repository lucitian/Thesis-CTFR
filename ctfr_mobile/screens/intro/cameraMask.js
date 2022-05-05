import React, { useState, useEffect, useContext } from 'react'
import { StyleSheet, Text, View, Image, TouchableOpacity, ImageBackground } from 'react-native'
import { Camera } from 'expo-camera'
import DefaultImage from '../../assets/faceid1.png'
import png from '../../assets/leftW.png'
import png1 from '../../assets/frontW.png'
import png2 from '../../assets/rightW.png'

import { Context as IntroContext } from '../../context/IntroContext'
import instance from '../../api/api'

function CameraScreenMask ({ navigation }) {
    const def = Image.resolveAssetSource(DefaultImage).uri
    const Png = Image.resolveAssetSource(png).uri
    const Png1 = Image.resolveAssetSource(png1).uri
    const Png2 = Image.resolveAssetSource(png2).uri

    const { camera_upload } = useContext(IntroContext)

    const [ hasPermission, setHasPermission ] = useState(null)
    const [ camera, setCamera ] = useState(null)
    const [ image, setImage ] = useState(def)
    const [ image1, setImage1 ] = useState(def) 
    const [ image2, setImage2 ] = useState(def)
    const [ fit, setFit ] = useState(Png)
    const [ type, setType ] = useState(Camera.Constants.Type.back)

    useEffect(() => {
        (async () => {
            const { status } = await Camera.requestCameraPermissionsAsync()
            setHasPermission(status === 'granted')
        })()
    }, [])

    const splitFilename = function (str) {
        return str.split('\\').pop().split('/').pop()
    }

    const rem = () => {
        setImage(def);
        setFit(Png)
    }
    const rem1 = () => {
        setImage1(def);
        setFit(Png1)
    }
    const rem2 = () => {
        setImage2(def);
        setFit(Png2)
    }

    const takePicture = async () => {
        if(camera && image == def){        
            const data = await camera.takePictureAsync(null); 
            setImage(data.uri);
            if(image1 == def){
                setFit(Png1) 
            }
            else if(image2 == def){
                setFit(Png2)
            }
            else{
                setFit(null)
            }    
        }
        else if (camera && image1 == def) {    
            const data1 = await camera.takePictureAsync(null); 
            setImage1(data1.uri);
            if(image2 == def){
                setFit(Png2) 
            }
            else if(image == def){
                setFit(Png)
            }
            else{
                setFit(null)
            } 
        }
        else if (camera && image2 == def) {  
            const data2 = await camera.takePictureAsync(null); 
            setImage2(data2.uri);
            if(image == def){
                setFit(Png) 
            }
            else if(image1 == def){
                setFit(Png1)
            }
            else{
                setFit(null)
            }   
        }
        
    }

    if (hasPermission === null) {
        return <View />;
    }
    if (hasPermission === false) {
        return <Text>No access to camera</Text>;
    }
    
    const Upload_Photos = () => {
        const imageFile = {
            uri: image,
            name: splitFilename(image),
            type: 'image/jpg'
        }

        const imageFile1 = {
            uri: image1,
            name: splitFilename(image1),
            type: 'image/jpg'
        }

        const imageFile2 = {
            uri: image2,
            name: splitFilename(image2),
            type: 'image/jpg'
        }

        const images = [imageFile, imageFile1, imageFile2]
        const formData = new FormData()

        for (let image in images) {
            formData.append('image', images[image])
        }

        camera_upload(formData)
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
                    ref = {ref => setCamera(ref)}  
                    style={styles.camera} 
                    type={type}
                    ratio= {'1:1'}
                />
                <View style = {styles.CamPng}>
                    {fit && <ImageBackground style = {styles.placeholderPNG} source={{uri: fit}}></ImageBackground>}
                </View>
            </View>
            <View style = {styles.picContainer}>
                <View>
                    {image && <ImageBackground style = {styles.placeholder} source={{uri: image}}>
                        <TouchableOpacity disabled = {image === def ? true : false} onPress = {(()=>rem())}>
                            {
                                image !== def ?
                                (<Image style = {styles.discard} source={require('../../assets/minus.png')}/> ) : null
                            }
                        </TouchableOpacity>
                    </ImageBackground>}
                </View>
                <View>
                    {image1 && <ImageBackground style = {styles.placeholder} source={{uri: image1}}>
                        <TouchableOpacity disabled = {image1 === def ? true : false} onPress = {(()=>rem1())}>
                            {
                                image1 !== def ?
                                (<Image style = {styles.discard} source={require('../../assets/minus.png')}/> ) : null
                            }
                        </TouchableOpacity>
                    </ImageBackground>}
                </View>
                <View>
                    {image2 && <ImageBackground style = {styles.placeholder} source={{uri: image2}}>
                        <TouchableOpacity disabled = {image2 === def ? true : false} onPress = {(()=>rem2())}>
                            {
                                image2 !== def ?
                                (<Image style = {styles.discard} source={require('../../assets/minus.png')}/> ) : null
                            }
                        </TouchableOpacity>
                    </ImageBackground>}
                </View>
            </View>
    
            <View style={styles.buttonContainer} >
                <View>
                    <TouchableOpacity
                        style={styles.button}
                        title = "Flip Camera"
                        onPress={() => {
                        setType(
                            type === Camera.Constants.Type.back
                            ? Camera.Constants.Type.front
                            : Camera.Constants.Type.back
                        );
                        }}>
                        <Image style = {styles.button} source={require('../../assets/flip1.png')}/>
                    </TouchableOpacity>
                </View>
                <View>
                    <TouchableOpacity style={styles.button2} title = 'Take Picture' onPress = {() => takePicture()}>
                        {/* <Image style = {styles.button} source={require('../../assets/flip.png')}/> */}
                    </TouchableOpacity>
                </View>   
                <View>
                    <TouchableOpacity style={styles.button3} title = 'Submit Photos' onPress = {Upload_Photos}>
                        <Image style = {styles.button} source={require('../../assets/done1.png')}/> 
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
        // margin: 15,
        padding: 15,
        backgroundColor: '#A18AFF'
    },

    camContainer: {
        flex: .8,
        alignSelf: 'center',
        margin: 10
    },
    
    picContainer: {
        marginTop: 20,
        flexDirection: 'row',
        justifyContent: 'space-evenly'
    },

    camera: {
        flex: 1,
        aspectRatio: 1,
    },

    CamPng: {
        position: 'absolute',
        alignSelf: 'center',
        justifyContent: 'center',
        flex: 1
    },
    buttonContainer:{
      marginTop: 40,

      flexDirection: 'row',
      justifyContent: 'space-evenly'
      
    },
    button: {
      width: 50,
      height: 50,
        
    },
    button2: {
      borderWidth:3,
      borderColor:'#6948f4',
      width:100,
      height:100,
      backgroundColor:'#fff',
      borderRadius:100,
      // width: 50,
      // height: 50,
    },
    button3: {
      width: 50,
      height: 50,
      
    },
    placeholder: {
        width: 50,
        height: 50,
    },

    placeholderPNG: {
        width: 300,
        height: 300,
        opacity: 0.5
    },

    TextContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    boldText: {
        color: 'white',
        fontWeight: 'bold',
        fontSize: 70,
    },
    infoText: {
        fontSize: 17,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 30,
        color: 'white'
    },
    discard: {
      height: 20,
      width: 20,
      alignSelf: 'flex-end'
    }
})