import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigation'

import createDataContext from "./createDataContext"
import api from '../api/api'

const authReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {
                ...state,
                errorMessage: action.payload
            }
        case 'signin':
            return {
                errorMessage: '',
                token: action.payload
            }
        case 'signout': 
            return {
                token: null,
                errorMessage: ''
            }
        case 'clear_error':
            return {
                ...state,
                errorMessage: ''
            }
        case 'fetchAccount':
            return action.payload
        default:
            return state
    }
}

const localSignIn = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
        dispatch({
            type:'signin',
            payload: token
        })

        if (await AsyncStorage.getItem('userInfo')) {
            navigate('profile')
        } else {
            navigate('fill')
        }
    } else {
        navigate('login')
    }
}

const clearError = (dispatch) => () => {
    dispatch ({
        type: 'clear_error'
    })
}

const signup = (dispatch) => async ({ username, email, password }) => {
    try {
        const response = await api.post('/signup', { username, email, password })
        await AsyncStorage.setItem('token', response.data.token)
        dispatch({ 
            type: 'signin',
            payload: response.data.token
        })

        navigate('fill')
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })   
    }
}

const signin = (dispatch) => async ({ email, password }) => {
    try {
        const response = await api.post('/signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token)

        dispatch({
            type: 'signin',
            payload: response.data.token
        })

        if (response.data.userInfo) {
            await AsyncStorage.setItem('userInfo', 'true')
            navigate('profile')
        } else {
            navigate('fill')
        }       
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        })
    }
}

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token')
    dispatch({
        type: 'signout'
    })

    navigate('login')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, signout, clearError, localSignIn },
    { token: null, errorMessage: '' }
)