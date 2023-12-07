const express = require('express')
const server = express()
const resorceRouter = require('./api/resorceRouter')

server.use(express.json())

server.use("/api/resource", resorceRouter)

module.exports =  server