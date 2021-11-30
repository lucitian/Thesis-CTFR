const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const UserInfo = mongoose.model('UserInfo')

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    
    const existingEmail = await User.findOne({ email: email})
    if (existingEmail) {
        return res.status(422).send({
            error: 'An account with this email already exists.'
        })
    }

    try {
        const user = new User({ username, email, password })
        await user.save()
        
        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')
        
        res.send({token})
    } catch (err) {
        return res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(422).send({
            error: 'Must provide email and password'
        })            
    }

    const user = await User.findOne({ email })
    if(!user) {
        return res.status(422).send({ 
            error: 'Invalid email or password'
        })
    }

    try {
        await user.comparePassword(password)

        const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')

        if (await UserInfo.findOne({ userId: user._id })) {
            const userInfo = await UserInfo.findOne({ userId: user._id })
            
            res.send({ token, userInfo })
        } else {
            res.send({ token })
        }
    } catch (err) {
        return res.status(422).send({
            error: 'Invalid password or email' 
        })
    }    
})

module.exports = router 