require('dotenv').config()

const PORT = process.env.PORT
const flaskServer = process.env.flaskServer
const customApiKey = process.env.customApiKey
const customApiSecondaryKey = process.env.customApiSecondaryKey
const customEndpoint = process.env.customEndpoint

module.exports = {
    PORT,
    flaskServer,
    customApiKey,
    customApiSecondaryKey,
    customEndpoint
}