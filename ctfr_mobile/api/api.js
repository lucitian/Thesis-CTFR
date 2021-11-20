import axios from 'axios'
import AsyncStorage from '@react-native-async-storage/async-storage'

const url = require('../secret_api.js')

const instance = axios.create({
    baseURL: url.url
})

instance.interceptors.request.use(
    async config => {
        const token = await AsyncStorage.getItem('token')
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }
        return config
    },
    err => {
        return Promise.reject(err)
    }
)

export default instance