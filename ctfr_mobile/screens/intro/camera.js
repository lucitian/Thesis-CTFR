import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Image, TouchableOpacity, Alert, ImageBackground } from 'react-native';
import { Camera } from 'expo-camera';
import DefaultImage from '../../assets/faceid.png';

function CameraScreen({navigation}) {
  const def = Image.resolveAssetSource(DefaultImage).uri;
  const [hasPermission, setHasPermission] = useState(null);
  const [camera, setCamera] = useState(null);
  const [image, setImage] = useState(def);
  const [image1, setImage1] = useState(def);
  const [image2, setImage2] = useState(def);
  const [image3, setImage3] = useState(def);
  const [image4, setImage4] = useState(def);
  const [type, setType] = useState(Camera.Constants.Type.back);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const rem = () => {
    setImage(def);
  }
  const rem1 = () => {
    setImage1(def);
  }
  const rem2 = () => {
    setImage2(def);
  }
  const rem3 = () => {
    setImage3(def);
  }
  const rem4 = () => {
    setImage4(def);
  }
  
  const takePicture = async () => {
    if(camera && image == def){
      const data = await camera.takePictureAsync(null); 
      setImage(data.uri);
      }
    else if (camera && image1 == def) {
      const data1 = await camera.takePictureAsync(null); 
      setImage1(data1.uri);
    }
    else if (camera && image2 == def) {
      const data2 = await camera.takePictureAsync(null); 
      setImage2(data2.uri);
    }
    else if (camera && image3 == def) {
      const data3 = await camera.takePictureAsync(null); 
      setImage3(data3.uri);
    }
    else if (camera && image4 == def) {
      const data4 = await camera.takePictureAsync(null); 
      setImage4(data4.uri);
    }
  }




  if (hasPermission === null) {
    return <View />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }
  return (
    <View style = {styles.container}>
        <View style = { styles.TextContainer }>
            <Text style = { styles.boldText }>Almost!</Text>
        </View>
        <View>
          <Text style = { styles.infoText }>Now, we need to see your face to perform our face recognition</Text>
        </View>

        <View style={styles.camContainer}>
          <Camera
            ref = {ref => setCamera(ref)}  
            style={styles.camera} 
            type={type}
            ratio= {'1:1'}/>
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
              <View>
                {image3 && <ImageBackground style = {styles.placeholder} source={{uri: image3}}>
                  <TouchableOpacity disabled = {image3 === def ? true : false} onPress = {(()=>rem3())}>
                    {
                      image3 !== def ?
                      (<Image style = {styles.discard} source={require('../../assets/minus.png')}/> ) : null
                    }
                  </TouchableOpacity>
                </ImageBackground>}
              </View>
              <View>
                {image4 && <ImageBackground style = {styles.placeholder} source={{uri: image4}}>
                  <TouchableOpacity disabled = {image4 === def ? true : false} onPress = {(()=>rem4())}>
                    {
                      image4 !== def ?
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
                      <Image style = {styles.button} source={require('../../assets/flip.png')}/>
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={styles.button2} title = 'Take Picture' onPress = {() => takePicture()}>
                {/* <Image style = {styles.button} source={require('../../assets/flip.png')}/> */}
              </TouchableOpacity>
            </View>   
            <View>
              <TouchableOpacity style={styles.button3} title = 'Submit Photos'>
                <Image style = {styles.button} source={require('../../assets/done.png')}/> 
              </TouchableOpacity>
            </View>    
          </View>   
    </View>
  );
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        margin: 15
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
    TextContainer: {
        marginTop: 50,
        flexDirection: 'row',
        alignSelf: 'flex-start',
    },
    boldText: {
        color: '#6948f4',
        fontWeight: 'bold',
        fontSize: 70,
    },
    infoText: {
        fontSize: 17,
        justifyContent: 'center',
        textAlign: 'center',
        marginTop: 15,
        marginBottom: 30
    },
    discard: {
      height: 20,
      width: 20,
      alignSelf: 'flex-end'
    }
})

