import axios from 'axios'
const url = require('./secret_api.js')

export default axios.create({
    baseURL: url.url
})