const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')
const UserInfo = mongoose.model('UserInfo')
const UserImages = mongoose.model('UserImages')
const router = express.Router()

router.use(requireAuth)

router.get('/profile/:id', async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const userInfo = await UserInfo.findOne({ userId: req.user._id})
        
        res.status(200).json({user: user, userInfo: userInfo})
    } catch (err) {
        res.status(300).send(err)
    }
})

router.post('/fill', async (req, res) => {
    const { firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address } = req.body

    if ( !firstname || !middleinitial || !lastname || !contact || !birthdate || !vaxstatus || !address ) {
        console.log(firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address)
        return res.status(422).send({
            error: "Please provide all necessary information."
        })
    }

    if (await UserInfo.findOne({ userId: req.user._id })) {
        console.log('Already exists.')
    } else {
        try {
            const userInfo = new UserInfo({
                firstname,
                middleinitial,
                lastname,
                contact,
                birthdate,
                vaxstatus,
                address,
                userId: req.user._id
            })
    
            await userInfo.save()
 
            res.send(userInfo)
        } catch (err) {
            return res.status(422).send(err.message)
        }
    }
})

router.patch('/update/:id', async (req,res) => {
    const { firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address } = req.body

    if ( !firstname || !middleinitial || !lastname || !contact || !birthdate || !vaxstatus || !address ) {
        console.log(firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address)
        return res.status(422).send({
            error: "Please provide all necessary information."
        })
    }

    try {
        const userInfo = await UserInfo.findOneAndUpdate({userId: req.user._id},{ 
            firstname: firstname,
            middleinitial: middleinitial,
            lastname: lastname,
            contact: contact,
            birthdate: birthdate,
            vaxstatus: vaxstatus,
            address: address
        })

        await userInfo.save()
        res.send(userInfo)
    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    }
})

const DIR = '../images/'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, DIR)
    },
    filename: (req, file, cb) => {
        console.log('Passed!')
        const fileName = req.user._id + '_' + file.originalname
        cb(null, fileName)
    }
})

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024 * 5
    }
})

router.post('/camera/upload', upload.array('image'), async (req, res, next) => {
    const paths = req.files.map(file => file.path)

    const userImages = new UserImages({
        userId: req.user._id,
        image: paths
    })

    await userImages.save()

    res.send(userImages)
})

module.exports = router