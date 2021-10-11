import React from 'react'
import { Router, Scene } from 'react-native-router-flux'

import LoginScreen from './screens/login'
import SignupScreen from './screens/signup'

const App = () => {
    return (
        <Router>
            <Scene key = "root">
                <Scene
                    key = "login"
                    component = { LoginScreen }
                    initial = { true }
                    hideNavBar = { true }
                ></Scene>
                <Scene
                    key = "signup"
                    component = { SignupScreen }
                    hideNavBar = { true }
                ></Scene>
            </Scene>
        </Router>
    ) 
}

export default App