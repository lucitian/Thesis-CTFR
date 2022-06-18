const express = require('express')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const User = mongoose.model('User')
const UserInfo = mongoose.model('UserInfo')
const UserVerification = mongoose.model('UserVerification')
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
                expiresAt: Date.now() + 216000
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

            res.status(200).send({token})
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
    if(!user[0].isVerified) {
        return res.status(422).json({
            status: 'Failed',
            message: "Email hasn't been verified yet! Check your inbox."
        })
    } else {  
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
    }
})

module.exports = router 