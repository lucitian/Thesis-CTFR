require('./models/User')
require('./models/UserInfo')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const mongoUri = require('./secret')
const authRoutes = require('./routes/routes')
const userInfoRoutes = require('./routes/userInfoRoutes')
const requireAuth = require('./middlewares/requireAuth')

const app = express()

app.use(bodyParser.json())
app.use(authRoutes)
app.use(userInfoRoutes)

// This function is used to connect to the mongoDB cluster
mongoose.connect(mongoUri.url, {
    useNewUrlParser: true,
})

mongoose.connection.on('connected', () => {
    console.log('Connected to Mongo instance')
})

mongoose.connection.on('error', (err) => {
    console.error('Error connecting to mongo', err)
})

app.get('/', requireAuth, (req, res) => {
    res.send(`Your email: ${req.user.email}`)
})

app.listen(3000, () => {
    console.log('listening on port 3000')
})
