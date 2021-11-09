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
        default: 
            return state
    }
}

const fillup = (dispatch) => async ({ firstname, middleinitial, lastname, contact, address }) => {
    try {
        const response = await api.post('/fill', { firstname, middleinitial, lastname, contact, address })
        await AsyncStorage.setItem('token', response.data.token)
        console.log(response)
        dispatch({
            type: 'fillup',
            payload: response.data.token
        })

        navigate('tempscreen')
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong'
        })
    }
}

export const { Provider, Context } = createDataContext(
    userReducer,
    { fillup },
    { token: null, errorMessage: '' }
)