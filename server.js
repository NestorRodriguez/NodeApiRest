'use strict'
const debug = require('debug')('sena:api')
const http = require('http')
//Creación de un request handler
const express = require('express')
//Color verce
const chalk = require('chalk')
const bodyparser =require('body-parser')

const api = require('./api')

//Puerto de salida
const port = process.env.PORT || 3000
//Aplicación de express
const app = express()
//Instancia del servidor http
const server = http.createServer(app)

//Ejecutar el middleware
app.use('/api', api)

//Manejo de errores
app.use((err, req, res, next) => {
    debug(`Error: ${err.message}`)
    if(err.message.match(/not found/))
    {
        return res.status(404).send({error: err.message})
    }
    res.status(500).send({error: err.message})
})

function handleFatalError (err)
{
    console.error(`${chalk.red('[Fatal error]')} ${err.message}`)
    console.error(err.stack)
    process.exit(1)
}

process.on('uncaughtExceeption', handleFatalError)
process.on('unhandleRejection', handleFatalError)

//Escuchar nuestro puerto
server.listen(port, () => {
    console.log(`${chalk.green('[Sena-API Rest]')} server listening on port ${port}`)
})