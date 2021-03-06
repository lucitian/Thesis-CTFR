const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const fs = require('fs')
const {parse} = require('csv-parse')
const path = require('path')
const requireAuth = require('../middlewares/requireAuth')

const User = mongoose.model('User')
const UserInfo = mongoose.model('UserInfo')
const UserImages = mongoose.model('UserImages')
const UserCovidResult = mongoose.model('UserCovidResult')
const UserVerification = mongoose.model('UserVerification')
const Room = mongoose.model('Room')
const router = express.Router()

router.use(requireAuth)

router.get('/profileUser', async(req, res) => {
    const user = await User.findById(req.user._id)

    res.status(200).json({user})
})

router.post('/fill', async (req, res) => {
    const { firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address } = req.body

    if ( !firstname || !middleinitial || !lastname || !contact || !birthdate || !vaxstatus || !address ) {
        console.log(firstname, middleinitial, lastname, contact, birthdate, vaxstatus, address)
        return res.status(422).json({
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
                userId: req.user._id,
            })
            await userInfo.save()

            res.status(200).json({userInfo})
        } catch (err) {
            console.log(err)
            return res.status(422).send(err.message)
        }
    }
})


router.get('/fillInfo', async (req, res) => {
    try {
        const user = await User.findById(req.user._id)
        let userData = {}
        fs.readFile(path.join(__dirname, '..', '..', 'tup_accounts.csv'), 'utf-8', (err, data) => {
            parse(data, {columns: true}, function(err, rows) {
                for(let i in rows) {
                    if(user.email == rows[i]['tupemail']) {
                        userData = rows[i]
                        res.status(200).json({
                            userData
                        })
                    }
                }
            })
        })
    } catch (err) {
        res.status(422).json({
            status: 'fill_error',
            message: 'An error occured while fetching information'
        })
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
        res.status(200).json({userInfo})
    } catch (err) {
        console.log(err)
        return res.status(404).send(err)
    }
})

router.get('/history', async (req, res) => {
    try {
        const userRooms = await Room.find({userId: req.user._id})
            
        res.status(200).send(userRooms)
    } catch (err) {
        res.status(304).send(err.message)
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
        fileSize: 20 * 1024 * 1024
    }
})

router.post('/camera/upload', upload.single('video'), async (req, res, next) => {
    try {
        const userImages = new UserImages({
            userId: req.user._id,
            image: req.file.path
        })

        await userImages.save()
        res.send(userImages)

    } catch (err) {
        return res.status(422).send(err.message)
    }
})

router.post('/camera/upload1', upload.single('video'), async (req, res, next) => {
    const paths = req.file.path

    try {
    const userImages = await UserImages.findOneAndUpdate({userId: req.user._id},
            {$push: {image:paths}},
            {safe: true, upsert: true}
            )

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
        sentDate: Date.now()
    })
    image.save().then(result => {
        res.send(image)
    }).catch(err => {
        res.status(500).json({
            error: err
        })
    })
})

module.exports = router