const mongoose = require('mongoose')

const userImageSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    image: [{
        type: String,
        required: true
    }]
})

mongoose.model('UserImages', userImageSchema)