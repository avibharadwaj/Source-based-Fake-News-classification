require('dotenv').config()
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const morgan = require('morgan')
const cors = require('cors')

app.use(cors())
app.use(bodyParser.json())
morgan.token('body', function(res, req) { return JSON.stringify( req.body ) })
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :body'))

app.get( '/', (request, response) => {
	response.send('<h2>Hello, World!</h2>')
})

const PORT = process.env.PORT
app.listen( PORT, () => {
	console.log(`Server running on port ${PORT}`)
})