const axios = require('axios')

const newsRouter = require('express').Router()

newsRouter.get('/', (req, res) => {
	res.json({
		message: 'Hello World!'
	})
})

newsRouter.get('/news', async (req, res, next) => {
	try {
		// console.log(req.body)
		const data = req.body
		const response = await axios.post('http://localhost:5000/api/extract', data)
		// console.log(response.data)
		res.json(response.data)
	}
	catch( error ) {
		next(error)
	}
})

module.exports = newsRouter