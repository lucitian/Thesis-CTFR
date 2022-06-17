require('./models/User')
require('./models/UserInfo')
require('./models/UserImages')
require('./models/UserCovidResult')
require('./models/Room')
require('./models/UserVerification')
require('dotenv').config()
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
// mongoose.connect(mongoUri.url, {
//     useNewUrlParser: true,
// })

    
const port = process.env.PORT || 3000

mongoose.connect(process.env.MONGO_ATLAS, {
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

app.listen(port, () => {
    console.log(`listening on port ${port}`)
})
