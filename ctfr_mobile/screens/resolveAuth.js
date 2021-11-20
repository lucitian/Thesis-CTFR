import React, { useEffect, useContext } from 'react'
import { Context as AuthContext } from '../context/UserContext'

export default resolveAuth = () => {
    const { localSignIn } = useContext(AuthContext)

    useEffect(() => {
        localSignIn()
    }, [])

    return null
}