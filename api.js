'use strict'

const debug = require('debug')('sena:api:routes')
const express = require('express')

const api = express.Router()

api.get('/user', (req, res) => {
    debug('A request has come to /user')
    res.send({})
})

api.get('/user/:uuid', (req, res, next) => {
    const { uuid } = req.params
    if(uuid != 'yyy'){
        return next(new Error('User not found'))
    }
    res.send({uuid})
})

api.get('/user/:uuid/:type', (req, res) => {
    const {uuid , type} = req.params
    res.send({uuid, type})
})

module.exports = api