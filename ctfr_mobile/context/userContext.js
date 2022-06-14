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
        case 'fillup':
            return {
                errorMessage: '',
                token: action.payload
            }
        case 'camera_upload':
            return {
                errorMessage: '',
                token: action.payload
            }
        case 'camera_uploadMask':
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
        if (await AsyncStorage.getItem('userinfo_exist')) {
            const user = await AsyncStorage.getItem('user')
            const userInfo = await AsyncStorage.getItem('userinfo')
            const history = await AsyncStorage.getItem('history')

            dispatch({
                type:'signin',
                payload: {token: token, user: JSON.parse(user), userInfo: JSON.parse(userInfo), roomHistory: JSON.parse(history)}
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
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })   
    }
}

const signin = (dispatch) => async ({ email, password}) => {
    try {
        const response = await api.post('/signin', { email, password })

        await AsyncStorage.setItem('token', response.data.token)

        if (response.data.userInfo) {
            await AsyncStorage.setItem('userinfo_exist', 'true')
            const userEmailResponse = await api.get('/profileemail')
            const userInfoResponse = await api.get('/profileinfo')
            const historyresponse = await api.get('/history')
            await AsyncStorage.setItem('user', JSON.stringify(userEmailResponse.data))
            await AsyncStorage.setItem('userinfo', JSON.stringify(userInfoResponse.data))
            await AsyncStorage.setItem('history', JSON.stringify(historyresponse.data))

            dispatch({
                type: 'signin',
                payload: {token: response.data.token, user: userEmailResponse.data, userInfo: userInfoResponse.data, roomHistory: historyresponse.data}
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

const update = (dispatch) => async ({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus}) => {
    try {
        await api.patch('/update', {
            firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus
        })
        const token = await AsyncStorage.getItem('token')
        const user = await AsyncStorage.getItem('user')
        const history = await AsyncStorage.getItem('history')
        const userInfoResponse = await api.get('/profileinfo')
        const historyResponse = await api.get('/history')
        await AsyncStorage.setItem('userinfo', JSON.stringify(userInfoResponse.data))

        dispatch ({
            type:'update',
            payload: {token: token, user: JSON.parse(user), userInfo: userInfoResponse.data, roomHistory: historyResponse.data}
        })

        navigate('home')
    } catch (err) {
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

    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })
    }
}

const fillup = (dispatch) => async ({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus }) => {
    try {
        const response = await api.post('/fill', { firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus })
        await AsyncStorage.setItem('userinfo_exist', 'true')
        dispatch({
            type: 'fillup',
            payload: response.data.token
        })

        navigate('camera')
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })
    }
}

const camera_upload = (dispatch) => async (formData) => {
    try {
        const response = await api.post('/camera/upload', formData, {
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        })
        await AsyncStorage.setItem('cameraUpload', 'true')

        dispatch({
            type: 'camera_upload',
            payload: response.data.token
        })

        navigate('cameraMask')
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })
    }
}

const camera_uploadMask = (dispatch) => async (formData) => {
    try {
        const response = await api.post('/camera/upload1', formData, {
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        })
        const userEmailResponse = await api.get('/profileemail')
        const userInfoResponse = await api.get('/profileinfo')
        const historyresponse = await api.get('/history')

        if(userEmailResponse.status == 200 && userInfoResponse.status == 200){
            await AsyncStorage.setItem('user', JSON.stringify(userEmailResponse.data))
            await AsyncStorage.setItem('userinfo', JSON.stringify(userInfoResponse.data))
            await AsyncStorage.setItem('history', JSON.stringify(historyresponse.data))
            
            dispatch({
                type: 'signin',
                payload: {token: response.data.token, user: userEmailResponse.data, userInfo: userInfoResponse.data, roomHistory: historyresponse.data}
            })

            navigate('home')
            alert('It may take a while before the system recognizes you. Thank you for cooperating!')
        } else {
            const userEmailResponse = await api.get('/profileemail')
            const userInfoResponse = await api.get('/profileinfo')
            const historyresponse = await api.get('/history')
            
            await AsyncStorage.setItem('user', JSON.stringify(userEmailResponse.data))
            await AsyncStorage.setItem('userinfo', JSON.stringify(userInfoResponse.data))
            await AsyncStorage.setItem('history', JSON.stringify(historyresponse.data))
            
            dispatch({
                type: 'signin',
                payload: {token: response.data.token, user: userEmailResponse.data, userInfo: userInfoResponse.data, roomHistory: historyresponse.data}
            })

            navigate('home')
            alert('It may take a while before the system recognizes you. Thank you for cooperating!')
        }
    } catch (err) {
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })
    }
}

const signout = (dispatch) => async () => {
    await AsyncStorage.removeItem('token')

    console.log('signout')
    dispatch({
        type: 'signout'
    })

    navigate('login')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { signup, signin, fillup, camera_upload, camera_uploadMask, clearError, localSignIn, update, covid_upload, signout },
    { token: null, errorMessage: '' }
)