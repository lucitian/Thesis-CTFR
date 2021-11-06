import React from 'react'
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from './screens/login'
import SignupScreen from './screens/signup'
import HomeScreen from './screens/home'
import CameraScreen from './screens/camera'
import ProfileScreen from './screens/profile'
import { Provider as AuthProvider } from './context/AuthContext'
import { setNavigator } from './navigation'
import resolveAuth from './screens/resolveAuth'

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
        home: HomeScreen,
        camera: CameraScreen,
        profile: ProfileScreen
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
    })
})

const App = createAppContainer(switchNavigator)

export default () => {
    return (
        <AuthProvider>
            <App ref = {( navigator ) => { setNavigator(navigator) }}/>
        </AuthProvider>
    )
}