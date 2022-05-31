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
        agreement: Agreement,
        fill: FillScreen,
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
                <App ref = {( navigator ) => { setNavigator(navigator)}}/>
            </FillProvider>
        </AuthProvider>
    )
}