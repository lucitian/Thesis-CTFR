import React from 'react'
import {
    createAppContainer,
    createSwitchNavigator,
} from 'react-navigation'
import { createStackNavigator } from 'react-navigation-stack'

import LoginScreen from './screens/login'
import SignupScreen from './screens/signup'
import FillScreen from './screens/fill'
import CameraScreen from './screens/camera'
import ProfileScreen from './screens/profile'
import TempScreen from './screens/tempscreen'
import { Provider as AuthProvider } from './context/AuthContext'
import { Provider as FillProvider } from './context/UserContext'
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
        tempscreen: TempScreen,
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
            <FillProvider>
                <App ref = {( navigator ) => { setNavigator(navigator) }}/>
            </FillProvider>
        </AuthProvider>
    )
}