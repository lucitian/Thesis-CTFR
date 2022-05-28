import AsyncStorage from '@react-native-async-storage/async-storage'
import { navigate } from '../navigation'

import createDataContext from './createDataContext'
import api from '../api/api'

const userReducer = (state, action) => {
    switch (action.type) {
        case 'add_error':
            return {
                ...state,
                errorMessage: action.payload
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
        default: 
            return state
    }
}

const fillup = (dispatch) => async ({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus }) => {
    try {
        const response = await api.post('/fill', { firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus })
        dispatch({
            type: 'fillup',
            payload: response.data.token
        })

        navigate('home')
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
        const response = await api.post('/camera/upload', formData, {
            body: formData,
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data'
            },
        })

        dispatch({
            type: 'camera_uploadMask',
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

export const { Provider, Context } = createDataContext(
    userReducer,
    { fillup, camera_upload, camera_uploadMask },
    { token: null, errorMessage: '' }
)