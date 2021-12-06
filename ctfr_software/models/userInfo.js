const { model, Schema } = require('mongoose')

const userInfoSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },
    firstname: {
        type: String,
        required: true,
    },
    middleinitial: {
        type: String,
        required: true,
    },
    lastname: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    birthdate: {
        type: String,
        required: true
    },
    vaxstatus: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
})

module.exports = model('UserInfo', userInfoSchema)