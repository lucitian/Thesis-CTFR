const express = require('express')
const mongoose = require('mongoose')
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')
const UserInfo = mongoose.model('UserInfo')
const router = express.Router()

router.use(requireAuth)

router.get('/home', async (req, res) => {
    const user = await User.find({ userId: req.user._id })
    res.send(user)
})

router.get('/home/:id', async (req, res) => {
    const user = await User.findById(req.user._id)

    res.send(user)
})

router.post('/fill', async (req, res) => {
    const { firstname, middleinitial, lastname, contact, address } = req.body

    if ( !firstname || !middleinitial || !lastname || !contact || !address ) {
        return res.status(422).send({
            error: "Please provide all necessary information."
        })
    }

    try {
        const userInfo = new UserInfo({
            firstname,
            middleinitial,
            lastname,
            contact,
            address,
            userId: req.user._id
        })
        await userInfo.save()
        res.send(userInfo)
    } catch (err) {
        return res.status(422).send(err.message)
    }
})

module.exports = router