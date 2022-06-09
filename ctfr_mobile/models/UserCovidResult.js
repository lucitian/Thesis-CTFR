const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        data: Buffer,
        contentType: String,
    },
})

mongoose.model('UserCovidResult', imageSchema)