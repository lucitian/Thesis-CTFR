const mongoose = require('mongoose')

const userRoomSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    roomNumber: {
        type: String, 
        required: true 
    },
    date: {
        type: Date
    },
    time: {
        type: Date, 
    },

})

mongoose.model('UserRoom', userRoomSchema)