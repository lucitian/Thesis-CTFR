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
        console.log(err)
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })   
    }
}

// const history = (dispatch) => async ({roomNumber, date, time}) => {
//     try {
//         const historyresponse = await api.get('/history', {roomNumber, date, time})
//         await AsyncStorage.setItem('userhistory', JSON.stringify(historyresponse))

//         dispatch({
//             type: "history",
//             payload: historyresponse.data
//         })

//     }catch (err) {
//         console.log(err)
//         dispatch({
//             type: 'add_error',
//             payload: 'Something went wrong'
//         })  
//     } 
// }

const signin = (dispatch) => async ({ email, password}) => {
    try {
        const response = await api.post('/signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token)

        if (response.data.userInfo) {
            await AsyncStorage.setItem('userinfo_exist', 'true')
            const userresponse = await api.get('/profile')
            const historyresponse = await api.get('/history')
            if(userresponse && historyresponse){
                await AsyncStorage.setItem('user', JSON.stringify(userresponse.data.user))
                await AsyncStorage.setItem('userinfo', JSON.stringify(userresponse.data.userInfo))
                await AsyncStorage.setItem('history', JSON.stringify(historyresponse.data))
            } else {
                const userresponse = await api.get('/profile')
                const historyresponse = await api.get('/history')
                await AsyncStorage.setItem('user', JSON.stringify(userresponse.data.user))
                await AsyncStorage.setItem('userinfo', JSON.stringify(userresponse.data.userInfo))
                await AsyncStorage.setItem('history', JSON.stringify(historyresponse.data))
            }

            dispatch({
                type: 'signin',
                payload: {token: response.data.token, user: userresponse.data.user, userInfo: userresponse.data.userInfo, roomHistory: historyresponse.data}
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
        const userresponse = await api.get('/profile')
        await AsyncStorage.setItem('userinfo', JSON.stringify(userresponse.data.userInfo))

        dispatch ({
            type:'update',
            payload: {token: token, user: JSON.parse(user), userInfo: userresponse.data.userInfo}
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

        navigate('profile')
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
    { signup, signin, clearError, localSignIn, update, covid_upload, signout },
    { token: null, errorMessage: '' }
)