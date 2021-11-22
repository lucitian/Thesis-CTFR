import React from 'react'
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from './screens/login/login'
import SignupScreen from './screens/login/signup'
import FillScreen from './screens/intro/fill'
import CameraScreen from './screens/intro/camera'
import ProfileScreen from './screens/profile/profile'
import { Provider as AuthProvider } from './context/UserContext'
import { Provider as FillProvider } from './context/IntroContext'
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
        fill: FillScreen,
        camera: CameraScreen,
    },
    {
        headerMode: 'none',
        navigationOptions: {
            headerVisible: false
        },
    }),
    home: createStackNavigator({
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
            <FillProvider>
                <App ref = {( navigator ) => { setNavigator(navigator) }}/>
            </FillProvider>
        </AuthProvider>
    )
}