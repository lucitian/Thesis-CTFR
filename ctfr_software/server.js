const mongoose = require('mongoose')
const mongoUri = require('./secret')

mongoose.connect(mongoUri.url, {
    useNewUrlParser: true
})

mongoose.connection.on('connected', () => {
    console.log('Rovic Connected')
})

mongoose.connection.on('error', (err) => {
    console.log('Rovic Error', err)
})

