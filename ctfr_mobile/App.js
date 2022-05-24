import React from 'react'
import { Dimensions } from 'react-native'
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

import LoginScreen from './screens/login/login'
import SignupScreen from './screens/login/signup'
import FillScreen from './screens/intro/fill'
import CameraScreen from './screens/intro/camera'
import ProfileScreen from './screens/profile/OverlappingContainers/profile'
import HistoryScreen from './screens/profile/history'
import EditScreen from './screens/profile/edit.js'
import Agreement from './screens/intro/agreement'
import { Provider as AuthProvider } from './context/UserContext'
import { Provider as FillProvider } from './context/IntroContext'
import { setNavigator } from './navigation'
import resolveAuth from './screens/resolveAuth'
import CameraScreenMask from './screens/intro/cameraMask'

const deviceWidth = Dimensions.get('window').width

const switchNavigator = createSwitchNavigator({
<<<<<<< HEAD
    // resolveAuth: resolveAuth,
    // login: createStackNavigator({
    //     login: LoginScreen,
    //     signup: SignupScreen
    // },
    // {
    //     headerMode: 'none',
    //     navigationOptions: {
    //         headerVisible: false
    //     }
<<<<<<< HEAD
    // }),
    intro: createStackNavigator({
        agreement: Agreement,
=======
     }),
    intro: createStackNavigator({
        agreement: Agreement,

=======
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
    resolveAuth: resolveAuth,
    login: createStackNavigator({
        login: LoginScreen,
        signup: SignupScreen
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        }
    }),
    intro: createStackNavigator({
<<<<<<< HEAD

>>>>>>> 8c8bbbff13a730f099555630f5936af5188779f9
=======
>>>>>>> 807fc759db860968bb5b73a589a10a473b7c92a4
        fill: FillScreen,
        agreement: Agreement,
        camera: CameraScreen,
        cameraMask: CameraScreenMask,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
    }),
    home: createStackNavigator({
        // main: createBottomTabNavigator({
        profile: ProfileScreen,
        edit: EditScreen,
        history: HistoryScreen
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
    }),
})

const App = createAppContainer(switchNavigator)

export default () => {
    return (
        <AuthProvider>
            <FillProvider>
                <App ref = {( navigator ) => { setNavigator(navigator) }}/>
            </FillProvider>
        </AuthProvider>
    )
}