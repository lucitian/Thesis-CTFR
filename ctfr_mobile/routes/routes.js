const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const UserInfo = mongoose.model('UserInfo')
const UserVerification = mongoose.model('UserVerification')
const requireAuth = require('../middlewares/requireAuth')
const nodemailer = require('nodemailer')
const crypto = require('bcrypt')
require('dotenv').config()

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
})

transporter.verify((error, success) => {
    if(error){
        console.log(error)
    } else {
        console.log('Ready for messages')
        console.log(success)
    }
})

const router = express.Router()

router.post('/signup', async (req, res) => {
    const { username, email, password } = req.body
    
    const existingEmail = await User.findOne({email: email})
    if (existingEmail) {
        return res.status(422).send({
            error: 'An account with this email already exists.'
        })
    }

    try {
        const user = await new User({ 
            username, 
            email, 
            password,
            isVerified: false,
        })    
        user.save()
        .then(async ()=> {
            const token = jwt.sign({ userId: user._id }, 'MY_SECRET_KEY')    
            const code = Math.floor(100000 + Math.random() * 900000)

            await new UserVerification({
                userId: user._id,
                uniqueString: crypto.hashSync(String(code), 10),
                createdAt: Date.now(),
                expiresAt: Date.now() + 21600
            }).save()
            transporter.sendMail({
                from: process.env.EMAIL_USER,
                to: email,
                subject: 'Verify Your Email',
                html: `
                    <p>Verify your email address to complete the signup and login into your account.</p>
                    <p><b>This link expires in 6 hours.</b></p>
                    <p>Here is your verification code ${code}</p>  
                `,
            })

            res.status(200).json({token, user})
        })
        .catch((error) => {
            console.log(error)
            res.json({
                status: 'FAILED',
                message: 'Failed to create an account.'
            })
        })
        
    } catch (err) {
        return res.status(422).send(err.message)
    }
})

router.post('/signin', async (req, res) => {
    const { email, password } = req.body
    console.log(req.body)

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
        const userInfo = await UserInfo.findOne({ userId: user._id })

        if(!user.isVerified) {
            console.log('yawa')
            return res.status(200).json({
                token, user,
                status: 'Failed',
                message: "Email hasn't been verified yet! Check your inbox."
            })
        } else {
            if (userInfo) {
                console.log('may laman si userInfo')
                res.status(200).json({ token, user, userInfo })
            } else {
                console.log('walang laman si userinfo')
                res.status(200).json({ token, user })
            }
        }
    } catch (err) {
        console.log(err)
        return res.status(422).send({
            error: 'Invalid password or email' 
        })
    }      
})

router.use(requireAuth)

router.post('/verify', async (req, res) => {
    const { input } = req.body
    console.log(input)

    UserVerification.find({userId: req.user._id})
    .then((result) => {
        if(result.length > 0) {
            const {expiresAt} = result[0].expiresAt
            const hashedString = result[0].uniqueString

            if (expiresAt < Date.now()) {
                UserVerification.deleteOne({userId: req.user._id})
                .then(result => {
                    User.deleteOne({userId: req.user._id})
                    .then(() => {
                        res.json({
                            status: 'DELETED',
                            message: 'Link has expired. Please sign up again.'
                        })
                    })
                    .catch((error) => {
                        console.log(error)
                        res.json({
                            status: 'ERROR',
                            message: 'Clearing user with expired unique string failed.'
                        })
                    })
                })
                .catch((error) => {
                    console.log(error)
                    res.json({
                        status: 'ERROR',
                        message: 'An error occurred while clearing expired user verification record'
                    })
                })
            } else {
                crypto.compare(String(input), hashedString)
                .then((result) => {
                    console.log(result)
                    if(result) {
                        User.updateOne({_id: req.user._id}, {isVerified: true})
                        .then(() => {
                            UserVerification.deleteOne({userId: req.user._id})
                            .then(() => {
                                res.status(200).json({
                                    status: 'SUCCESS',
                                    message: 'User successfully verified!'
                                })
                            })
                            .catch((error) => {
                                console.log(error)
                                res.status(422).json({
                                    status: 'FINALIZE ERROR',
                                    message: 'An error occurred while finalizing successful verification'
                                })
                            })
                        })
                        .catch((error) => {
                            console.log(error)
                            res.status(422).json({
                                status: "CHECK ERROR",
                                message: 'An error occurred while updating user record to show verified.'
                            })
                        })
                    } else {
                        res.status(422).json({
                            status: 'INVALID',
                            message: 'Invalid verification details passed. Check your inbox.'
                        })
                    }
                })
                .catch((error) => {
                    console.log(error)
                    res.status(422).json({
                        status: "ERROR",
                        message: 'An error occurred while comparing unique strings.'
                    })
                })
            }
        } else {
            res.status(422).json({
                status: 'ERROR',
                message: "Account record doesn't exist or has been verified already. Please sign in or log in."
            })
        }
    })
    .catch((error) => {
        console.log(error)
        res.json({
            status: 'ERROR',
            message: 'An error occurred while checking for existing user verification record.'
        })
    })
})

module.exports = router 