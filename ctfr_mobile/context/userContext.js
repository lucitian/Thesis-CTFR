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
        case 'update':
            return {
                errorMessage: '',
                token: action.payload
            }
        case 'covid_upload':
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
        default:
            return state
    }
}

const localSignIn = (dispatch) => async () => {
    const token = await AsyncStorage.getItem('token')

    if (token) {
        if (await AsyncStorage.getItem('userInfo')) {
            const userInfo = await api.get('/profile/:id')
            dispatch({
                type:'signin',
                payload: {token: token, userInfo: userInfo}
            })
    
            navigate('home')
        } else {
            dispatch({
                type:'signin',
                payload: token
            })
            navigate('intro')
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

        navigate('intro')
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

        if (response.data.userInfo) {
            await AsyncStorage.setItem('userInfo', 'true')
            const userInfo = await api.get('/profile/:id')

            dispatch({
                type: 'signin',
                payload: {token: response.data.token, userInfo: userInfo}
            })

            navigate('home')
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

const update = (dispatch) => async ({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus }) => {
    try {
        const response = await api.patch('/update/:id', {
            firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus
        })

        dispatch ({
            type:'update',
            payload: response.data.token
        })
        navigate('home')
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'update_error',
            payload: 'Something went wrong'
        })
    }
}

const covid_upload = (dispatch) => async (formData) => {
    try {
        const response = await api.post('/profile/covid', formData, {
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        })

        dispatch({
            type: 'camera_upload',
            payload: response.data.token
        })

        navigate('home')
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
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
    { signup, signin, signout, clearError, localSignIn, update, covid_upload },
    { token: null, errorMessage: '' }
)