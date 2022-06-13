const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const path = require('path')
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')
const UserInfo = mongoose.model('UserInfo')
const UserImages = mongoose.model('UserImages')
const UserCovidResult = mongoose.model('UserCovidResult')
const UserRoom = mongoose.model('UserRoom')
const router = express.Router()

router.use(requireAuth)

router.get('/profile', async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        const userInfo = await UserInfo.findOne({ userId: req.user._id})
        
        res.status(200).json({user: user, userInfo: userInfo})
    } catch (err) {
        res.status(304).send(err.message)
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
                covidstatus: 'Negative',
                userId: req.user._id
            })
    
            await userInfo.save()
 
            res.send(userInfo)
        } catch (err) {
            return res.status(422).send(err.message)
        }
    }
})

router.patch('/update', async (req,res) => {
    const { firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address, covidstatus } = req.body

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
            address: address,
            covidstatus: covidstatus
        })

        await userInfo.save()
        res.status(200).send(userInfo)
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

router.post('/camera/upload', upload.single('video'), async (req, res, next) => {
    const paths = req.files.map(file => file.path)

    try {
        const userImages = new UserImages({
            userId: req.user._id,
            image: paths
        })

        await userImages.save()
        res.send(userImages)

    } catch (err) {
        return res.status(422).send(err.message)
    }
})


const covidDIR = '../covidresult'

const covidStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, covidDIR)
    },
    filename: function (req, file, cb) {
        cb(null, req.user._id + '_' + file.originalname)
    }
})

const uploadCovid = multer({
    storage: covidStorage,
    fileFilter: (req, file, cb) => {
        if(file.mimetype == 'image/png' || file.mimetype == 'image/jpg' || file.mimetype == 'image./jpeg') {
            cb(null, true)
        } else {
            cb(null, false)
            return cb(new Error('Only, .png, .jpg. and .jpeg format only!'))
        }
    }    
})

router.post('/profile/covid', uploadCovid.single('image'), (req, res, next) => {
    const image = new UserCovidResult({
        userId: req.user._id,
        image: {
            data: fs.readFileSync(path.join(__dirname, '..', '..', 'covidresult', req.file.filename)),
            contentType: 'image/*',
        },
    })
    image.save().then(result => {
        res.send(image)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

router.get('/history', async (req, res) => {
    try {
        const userRooms = await UserRoom.findById({ userId: req.user._id})
        
        res.status(200).json(userRooms)
    } catch (err) {
        res.status(304).send(err.message)
    }
})

module.exports = router