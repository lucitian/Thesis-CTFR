const mongoose = require('mongoose')
const mongoUri = require('./secret')
const express = require('express')
const app = express()

mongoose.connect(mongoUri.url, {
    useNewUrlParser: true
})

mongoose.connection.on('connected', () => {
    console.log('Rovic Connected')
})

mongoose.connection.on('error', (err) => {
    console.log('Rovic Error', err)
})

app.listen(4000, () => {
    console.log('Rovic is listening at port 4000')
})