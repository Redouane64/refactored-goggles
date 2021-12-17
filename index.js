require('dotenv').config()

const express = require('express')
const path = require('path')

const defaultRoute = require('./routes')
const auth = require('./routes/auth')

const PORT = process.env.PORT || 5000
const HOST = process.env.HOST || '127.0.0.1'

const server = express()
server.use(express.static(path.join(__dirname, 'public')))
server.use(express.json())

server.use(defaultRoute)
server.use(auth)

server.listen(PORT, HOST, () => console.info(`Server is listening at http://${HOST}:${PORT}`))