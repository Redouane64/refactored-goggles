require('dotenv').config()

const express = require('express')
const path = require('path')

const defaultRoute = require('./routes')
const auth = require('./routes/auth')
const configs = require('./config')

const {PORT, HOST} = configs

const server = express()
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())

server.use(defaultRoute)
server.use(auth)

server.listen(PORT, HOST, () => console.info(`Server is listening at http://${HOST}:${PORT}`))