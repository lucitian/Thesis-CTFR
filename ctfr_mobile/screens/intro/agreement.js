import Checkbox from 'expo-checkbox'
import React, { useState, useContext } from 'react'
import { View, Text, StyleSheet, ScrollView, SafeAreaView, TouchableOpacity, Platform, Button } from 'react-native'


function Agreement ({ navigation }) {
    const [isChecked, setChecked] = useState(false);
    const [disable, setDisable] = useState(true);

    const agreed = () => {
        setChecked(true)
        setDisable(false)
        
    }
    return (
        <View style = {styles.container}>
            <View style = {styles.subContainer}>
                <SafeAreaView style = {styles.bruh}>
                <ScrollView style={styles.scrollView}>
                    <Text style={styles.textHistory}>
                    The processor shall immediately inform the controller of any breach of this data processing agreement or of accidental, unlawful or non-unlawful access to personal data, the use or disclosure of personal data or a breach of the integrity of personal data, or that the personal data may have been compromised. The processor shall provide the controller with all the information necessary to enable the controller to comply with current data protection legislation and so that the controller can respond to all requests from the competent data protection authorities. It is the responsibility of the controller to inform the competent data protection authority of inconsistencies in accordance with current legislation. This law established acceptable standards to limit and organize the collection, use and disclosure of personal data by commercial institutions. This means that organizations may collect, use and disclose this percentage of information for purposes that a reasonable person would deem appropriate in the circumstances. Data confidentiality agreements are legally binding agreements that stipulate that both parties do not disclose or benefit from data relating to the institution. A company grants a confidentiality agreement to a new employee or contractor to ensure that its trade secrets and other sensitive information remain confidential. Many third-party companies also need a privacy policy in order to use their services. The eBay mobile app links to the “Privacy und Hagb for mobile devices” and not to the standard privacy policy page.
                    </Text>
                </ScrollView>  
                </SafeAreaView>
                <View style = {styles.section}>
                    <Checkbox
                    style={styles.checkbox}
                    value={isChecked}
                    onValueChange={agreed}
                    color={isChecked ? '#A18AFF' : undefined}
                    />
                    <Text style={styles.paragraph}>I Agree</Text>
                </View>

                <View>
                    <Button 
                        mode = 'contained'
                        onPress = {() => navigation.navigate('fill')}
                        disabled = {disable}       
                        title = 'Proceed'                    >
                    </Button>
                </View>
                
            </View>
        </View>
    )
}

export default Agreement

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#A18AFF',
        justifyContent: 'center',
        alignItems: 'center',
    },

    subContainer:{
        width: '80%',
        height: '80%',
        borderRadius: 25,
        backgroundColor: 'white',
        padding: 25,
    },
    paragraph: {
        fontSize: 15,
    },
    
    checkbox: {
        marginRight: 8,
        marginVertical: 8
    },
    section: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    bruh:{
        height: 400,
        marginVertical: 10
    },
    button:{
        backgroundColor: '#A18AFF'
    }
})