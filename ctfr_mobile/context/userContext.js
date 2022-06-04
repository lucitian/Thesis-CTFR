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
                user: null,
                userinfo: null,
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
        if (await AsyncStorage.getItem('userinfo_exist')) {
            const user = await AsyncStorage.getItem('user')
            const userInfo = await AsyncStorage.getItem('userinfo')

            dispatch({
                type:'signin',
                payload: {token: token, user: JSON.parse(user), userInfo: JSON.parse(userInfo)}
            })
    
            navigate('profile')
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
            await AsyncStorage.setItem('userinfo_exist', 'true')
            const userresponse = await api.get('/profile')
            const user = userresponse.data.user
            const userInfo = userresponse.data.userInfo
            await AsyncStorage.setItem('user', JSON.stringify(user))
            await AsyncStorage.setItem('userinfo', JSON.stringify(userInfo))
            
            dispatch({
                type: 'signin',
                payload: {token: response.data.token, user: user, userInfo: userInfo}
            })

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

const update = (dispatch) => async ({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus}) => {
    try {
        const response = await api.patch('/update', {
            firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus
        })
        const token = await AsyncStorage.getItem('token')
        const user = await AsyncStorage.getItem('user')
        const userresponse = await api.get('/profile')
        await AsyncStorage.setItem('userinfo', JSON.stringify(userresponse.data.userInfo))

        dispatch ({
            type:'update',
            payload: {token: token, user: JSON.parse(user), userInfo: userresponse.data.userInfo}
        })

        navigate('profile')
    } catch (err) {
        dispatch({
            type: 'update_error',
            payload: 'Something went wrong'
        })
    }
}

const covid_update = (dispatch) => async (covidstatus) => {

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
    await AsyncStorage.removeItem('user')
    await AsyncStorage.removeItem('userinfo')
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