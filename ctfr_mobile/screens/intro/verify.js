import React, { useRef, useState, useContext, useEffect } from 'react'
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import CodeInput from 'react-native-confirmation-code-input';

import { Context as UserContext } from '../../context/UserContext'

const VerifyScreen = ({ navigation }) => {
    // const { email } = route
    // console.log(route.email)
    const { signout } = useContext(UserContext)
    const ref = useRef(null)
    const [input, setInput] = useState('')

    const _onFulfill = (code) => {
        setInput(code)
        if (input == 'Burat') {
          alert(
            'Confirmation Code',
            'Successful!',
            [{text: 'OK'}],
            { cancelable: false }
          );
        } else {
          alert(
            'Confirmation Code',
            'Code not match!',
            [{text: 'OK'}],
            { cancelable: false }
          );
          
          this.refs.codeInputRef1.clear();
        }
    }
    const _onFinishCheckingCode2 =(isValid, code) => {
        console.log(isValid);
        if (!isValid) {
          alert(
            'Code not match!'
            [{text: 'OK'}],
            { cancelable: false }
          );
        } else {
            setInput({ code })
        }
    }
      
    return (
        <View style={styles.container}>
            <View style = { styles.signout }>
                <TouchableOpacity onPress = {signout}><Text>Sign out</Text></TouchableOpacity>
            </View>
            <View style={styles.icon}>
                <MaterialCommunityIcons name='email-open' color="white" size={40}/>
            </View>
            <View style={styles.infoContainer}>
                <Text style={styles.infoTitle}>Verify your email address</Text>
                <View style={styles.infoTextContainer}>
                    <Text style={styles.infoText}>We have sent you a verification code to your email.</Text>
                </View>
            </View>
            <View style = { styles.inputContainer } >
                <CodeInput
                    inactiveColor='#000000'
                    activeColor='rgb(105, 72, 244)'
                    codeLength={5}
                    size={50}
                    space={10}
                    compareWithCode='Burat'
                    className='border-b'
                    autoFocus={false}
                    codeInputStyle={{ fontWeight: '800', backgroundColor: '#F5F5F5' }}
                    onFulfill={(isValid, code) => _onFinishCheckingCode2(isValid, code)}
                />
            </View>
            <View style={styles.resendTextContainer}>
                <Text>Did not receive the code? </Text>
                    <TouchableOpacity><Text style={styles.resendText}>Resend code</Text>
                </TouchableOpacity>
                <Text>.</Text>
            </View>
        </View>
    )
}

export default VerifyScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        alignItems: 'center',
        paddingTop: 80
    },
    signout: {
        position: 'absolute',
        top: 40,
        left: 10
    },
    icon: {
        borderRadius: 100,
        backgroundColor: '#A18AFF',
        padding: 15
    },
    infoContainer: {
        paddingTop: 30,
    },
    infoTitle: {
        alignSelf: 'center',
        fontSize: 25,
        color: '#A18AFF',
        fontWeight: 'bold',
    },
    infoTextContainer: {
        alignSelf: 'center',
        marginTop: 20,
        marginBottom: 20,
        marginLeft: 35,
        marginRight: 35,
    },
    infoText: {
        fontSize: 16,
        textAlign: 'justify'
    },
    inputContainer: {
        justifyContent: 'center',
        paddingBottom: 30,
    },
    resendTextContainer: {
        flexDirection: 'row'
    },
    resendText: {
        color: '#6948F4'
    }
})