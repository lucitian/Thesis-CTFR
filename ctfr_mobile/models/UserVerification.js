const mongoose = require('mongoose');

const UserVerificationSchema = new mongoose.Schema({
    userId: String,
    uniqueString: String,
    createdAt: Date,
    expiresAt: Date,
})

mongoose.model('UserVerification', UserVerificationSchema)