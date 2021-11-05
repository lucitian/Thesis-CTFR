const mongoose = require('mongoose')
const crypto = require('bcrypt')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    info: [{
        firstname: { type: String, required: true },
        middleinitial: { type: String },
        lastname: { type: String, required: true },
        nationality: { type: String, required: true },
        contact: { type: Number, required: true },
        vaxstatus: { type: String, required: true },
        address: { type: String, required: true }
    }]
})

userSchema.pre('save', function(next) {
    const user = this
    if (!user.isModified('password')) {
        return next
    }
    
    crypto.genSalt(10, (err, salt) => {
        if (err) {
            return next(err)
        }

        crypto.hash(user.password, salt, (err, hash) => {
            if (err) {
                return next(err)
            }

            user.password = hash
            next()
        })
    })
})

userSchema.methods.comparePassword = function comparePassword(testPassword) {
    const user = this

    return new Promise((resolve, reject) => {
        crypto.compare(testPassword, user.password, (err, isMatch) => {
            if (err) {
                return reject(err)
            } 

            if (!isMatch) {
                return reject(false)
            }

            resolve(true)
        })
    })
}

mongoose.model('User', userSchema) 