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

    const user = await User.findById(req.user._id)
    console.log(user._id.toString())
    const userInfo = await UserInfo.findOne({ userId: req.user._id})
    //console.log(mongoose.Types.ObjectId(userInfo.userId).toString())
    
    if ( !firstname || !middleinitial || !lastname || !contact || !address ) {
        return res.status(422).send({
            error: "Please provide all necessary information."
        })
    }

    if (mongoose.Types.ObjectId.isValid(userInfo.userId) === null){
        console.log('Already exists.')
        // try {
        //     const userInfo = new UserInfo({
        //         firstname,
        //         middleinitial,
        //         lastname,
        //         contact,
        //         address,
        //         userId: req.user._id
        //     })
    
        //     //await userInfo.save()
        //     console.log(userInfo)
            
        //     //res.send(userInfo)
        // } catch (err) {
        //     return res.status(422).send(err.message)
        // }
    } else {
        console.log('tangina mo rovic')
        
    }
})

module.exports = router