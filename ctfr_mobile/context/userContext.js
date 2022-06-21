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
        case 'verify':
            return {
                errorMessage :'',
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
    if (token != null) {
        if (await AsyncStorage.getItem('user')) {
            const user = await AsyncStorage.getItem('user')
            if(await AsyncStorage.getItem('userInfo')) {
                const userInfo = await AsyncStorage.getItem('userInfo')
                if(await AsyncStorage.getItem('userHistory')) {
                    const userHistory = await AsyncStorage.getItem('userHistory')
                    dispatch({
                        type: 'signin',
                        payload: {
                            token: token,
                            user: JSON.parse(user),
                            userInfo: JSON.parse(userInfo),
                            userHistory: JSON.parse(userHistory)
                        }
                    })
                    navigate('home')
                } else {
                    dispatch({
                        type: 'signin',
                        payload: {
                            token: token,
                            user: JSON.parse(user),
                            userInfo: JSON.parse(userInfo),
                        }
                    })
                    navigate('home')
                }
            } else {
                if (!JSON.parse(user).isVerified) {
                    console.log('Not Verified')
                    dispatch({
                        type: 'sigin',
                        payload: {
                            token: token,
                            user: JSON.parse(user)
                        }
                    })
                    navigate('verify')
                } else {
                    const tempData = await AsyncStorage.getItem('tempUserData')
                    console.log('verified')
                    dispatch({
                        type: 'signin',
                        payload: {
                            token: token,
                            user: JSON.parse(user),
                            tempData: JSON.parse(tempData)
                        }
                    })

                    navigate('login')
                }
            }
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
        await AsyncStorage.removeItem('token')
        await AsyncStorage.setItem('token', response.data.token)
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user))

        dispatch({ 
            type: 'signin',
            payload: {token: response.data.token, user: response.data.user}
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

const signin = (dispatch) => async ({email, password}) => {
    try {
        const response = await api.post('/signin', { email, password })
        await AsyncStorage.setItem('token', response.data.token)
        await AsyncStorage.setItem('user', JSON.stringify(response.data.user))
        console.log(response)

        if (!response.data.user.isVerified) {
            console.log('not verified')
            dispatch({
                type: 'signin',
                payload: {token: response.data.token, user: response.data.user}
            })
            navigate('intro')
        } else {
            if (response.data.userInfo) {
                if(await AsyncStorage.getItem('camera_mask_0')) {
                    dispatch({
                        type: 'signin',
                        payload: {
                            token: response.data.token
                        }
                    })
                    navigate('cameraMask')
                } else if (await AsyncStorage.getItem('camera_mask_1')) {
                    await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
                    if (response.data.userHistory) {
                        await AsyncStorage.setItem('userHistory', JSON.stringify(response.data.userHistory))
                        dispatch({
                            type: 'signin',
                            payload: {
                                token: response.data.token, 
                                user: response.data.user, 
                                userInfo: response.data.userInfo,
                                userHistory: response.data.userHistory
                            }
                        })
                        navigate('home')
                    } else {
                        dispatch({   
                            type: 'signin',
                            payload: {
                                token: response.data.token, 
                                user: response.data.user, 
                                userInfo: response.data.userInfo
                            }
                        })
                        navigate('home')
                    }
                } else {
                    dispatch({
                        type: 'signin',
                        payload: response.data.token
                    })
                }
            } else {
                const response = await api.get('/fillInfo')
        
                if(await AsyncStorage.getItem('tempUserData')) {
                    const tempData = await AsyncStorage.getItem('tempUserData')
                    dispatch({
                        type: 'signin',
                        payload: {
                            token: response.data.token,
                            user: response.data.user,
                            tempData: JSON.parse(tempData)
                        }
                    })
                    navigate('agreement')
                } else {
                    await AsyncStorage.setItem('tempUserData', JSON.stringify(response.data.userData))
                    const tempData = await AsyncStorage.getItem('tempUserData')
                    dispatch({
                        type: 'signin',
                        payload: {
                            token: response.data.token,
                            user: response.data.user,
                            tempData: JSON.parse(tempData)
                        }
                    })
                    navigate('agreement')
                }
            }     
        }
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'add_error',
            payload: 'Something went wrong with sign in'
        })
    }
}

const verify = (dispatch) => async (input) => {
    try {
        const response = await api.post('/verify', {input})
        const token = await AsyncStorage.getItem('token')
        const responseUser = await api.get('/profileUser')
        await AsyncStorage.setItem('user', JSON.stringify(responseUser.data.user))

        if((response.data.status).toLowerCase() == 'success') {
            const response = await api.get('/fillInfo')
        
            if(await AsyncStorage.getItem('tempUserData')) {
                const tempData = await AsyncStorage.getItem('tempUserData')
                dispatch({
                    type: 'signin',
                    payload: {
                        token: token,
                        user: JSON.parse(responseUser),
                        tempData: JSON.parse(tempData)
                    }
                })
                navigate('agreement')
            } else {
                await AsyncStorage.setItem('tempUserData', JSON.stringify(response.data.userData))
                const tempData = await AsyncStorage.getItem('tempUserData')
                dispatch({
                    type: 'signin',
                    payload: {
                        token: token,
                        user: JSON.parse(responseUser),
                        tempData: JSON.parse(tempData)
                    }
                })
                navigate('agreement')
            }
        }
    } catch (err) {
        console.log(err)
        dispatch({
            type: 'verify_error',
            payload: 'Something went wrong'
        })
    }
}

const fillup = (dispatch) => async ({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus }) => {
    try {
        const response = await api.post('/fill', { 
            firstname, 
            middleinitial, 
            lastname, 
            contact, 
            birthdate, 
            vaxstatus, 
            address,
            covidstatus
        })
        const user = await AsyncStorage.getItem('user')
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
        dispatch({
            type: 'fillup',
            payload: {
                token: response.data.token,
                user: JSON.parse(user),
                userInfo: response.data.userInfo
            }
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

const update = (dispatch) => async ({ firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus}) => {
    try {
        const response = await api.patch('/update', {
            firstname,
            middleinitial,
            lastname,
            contact,
            birthdate,
            vaxstatus,
            address,
            covidstatus
        })
        console.log(response.data)
        await AsyncStorage.setItem('userInfo', JSON.stringify(response.data.userInfo))
        const token = await AsyncStorage.getItem('token')
        const user = await AsyncStorage.getItem('user')
        
        if (await AsyncStorage.getItem('userHistory')) {
            const userHistory = await AsyncStorage.getItem('history')
            dispatch ({
                type:'update',
                payload: {
                    token: token, 
                    user: JSON.parse(user), 
                    userInfo: response.data.userInfo,
                    userHistory: JSON.parse(userHistory) 
                }
            })

            navigate('home')
        } else {
            dispatch ({
                type:'update',
                payload: {
                    token: token, 
                    user: JSON.parse(user), 
                    userInfo: response.data.userInfo, 
                }
            })

            navigate('home')
        }
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
        const user = await AsyncStorage.getItem('user')
        const userInfo = await AsyncStorage.getItem('userInfo')

        if (await AsyncStorage.getItem('userHistory')) {
            const userHistory = await AsyncStorage.getItem('userHistory')
            dispatch({
                type: 'camera_upload',
                payload: {
                    token: response.data.token,
                    user: JSON.parse(user),
                    userInfo: JSON.parse(userInfo),
                    userHistory: JSON.parse(userHistory)
                }
            })

            navigate('home')
        } else {
            dispatch({
                type: 'camera_upload',
                payload: {
                    token: response.data.token,
                    user: JSON.parse(user),
                    userInfo: JSON.parse(userInfo)
                }
            })

            navigate('home')
        }
    } catch (err) {
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
        await AsyncStorage.setItem('camera_mask_0', 'true')

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
        await AsyncStorage.setItem('camera_mask_1', 'true')
        const user = await AsyncStorage.getItem('user')
        const userInfo = await AsyncStorage.getItem('userInfo')
        
        dispatch({
            type: 'signin',
            payload: {
                token: response.data.token,
                user: JSON.parse(user),
                userInfo: JSON.parse(userInfo)
            }
        })

        navigate('home')
        alert('It may take a while before the system recognizes you. Thank you for cooperating!')
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
    await AsyncStorage.removeItem('userInfo')
    await AsyncStorage.removeItem('userHistory')
    await AsyncStorage.removeItem('tempUserData')

    console.log('signout')
    dispatch({
        type: 'signout'
    })

    navigate('login')
}

export const { Provider, Context } = createDataContext(
    authReducer,
    { 
        localSignIn, 
        signup, 
        verify, 
        signin, 
        fillup, 
        camera_upload, 
        camera_uploadMask, 
        clearError, 
        update, 
        covid_upload, 
        signout },
    { token: null, errorMessage: '' }
)