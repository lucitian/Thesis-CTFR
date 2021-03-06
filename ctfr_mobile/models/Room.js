const mongoose = require('mongoose')

const userRoomSchema = new mongoose.Schema({
    roomNumber: {
        type: String, 
        required: true 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    name: {
        type: String
    },
    date: {
        type: String
    },
    time: {
        type: String, 
    },

})

mongoose.model('Room', userRoomSchema)