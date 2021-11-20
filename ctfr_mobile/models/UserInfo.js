const mongoose = require('mongoose')

const userInfoSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
    firstname: {
        type: String, 
        required: true 
    },
    middleinitial: {
        type: String
    },
    lastname: {
        type: String, 
        required: true
    },
    contact: {
        type: Number, 
        required: true
    },
    address: {
        type: String,
        required: true
    },
})

mongoose.model('UserInfo', userInfoSchema)