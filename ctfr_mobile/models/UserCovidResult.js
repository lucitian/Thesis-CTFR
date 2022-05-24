const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: {
        type: String
    }
})

mongoose.model('UserCovidResult', imageSchema)