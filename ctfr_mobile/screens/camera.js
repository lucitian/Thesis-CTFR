import React from 'react'
import { View, Text, StyleSheet, Image } from 'react-native'
import { TextInput, Button } from 'react-native-paper'
import { useForm, Controller } from 'react-hook-form'

function CameraScreen () {
    const { control, handleSubmit, formState: { errors, isValid } } = useForm({ mode: 'onBlur' });
    const onSubmit = data => console.log(JSON.stringify(data));  

    return (
        <View style = { styles.container }>
            <View style = { styles.TextContainer }>
                <Text style = { styles.boldText }>Almost!</Text>
            </View>
            <View>
                <Text style = { styles.infoText }>Now, we need to see your face to perform our face recognition</Text>
            </View>
            <View>
                <Image
                  style={styles.Logo}
                  source={require('../assets/faceid.png')}
                ></Image>
            </View>
            <Button 
                mode = 'contained'
                onPress = {handleSubmit(onSubmit)}
                style = { styles.proceedButton }
            >
                <Text style = { styles.textButton } > Take a Picture</Text>
            </Button>
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
    },
    proceedButton: {
        marginTop: 200,
        width: '85%',
        height: 50,
        justifyContent: 'center',
        textAlign: 'center',
        backgroundColor: '#C3BBE5',
        
    },
    textButton: {
        color: '#6948f4'
    },
    TextContainer: {
        marginTop: 80,
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
        marginHorizontal: 10,
        marginBottom: 50,
        marginTop: 40
    },
    Logo: {
      marginTop: 20,
      width: 300,
      height: 300,
      opacity: .4
    },
})



  