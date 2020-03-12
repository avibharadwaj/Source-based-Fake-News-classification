const router = require('express').Router()

const helper = require('../utils/helper')
const config = require('../utils/config')

router.get('/', (req, res, next) => {
	res.json({
		message: 'Hello World!'
	})
})

router.post('/extract', async (req, res, next) => {
	try {
		const data = req.body
		const response = await helper.extractData(data)
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

router.post('/svm', async(req, res, next) => {
	try {
		const data = req.body
		const extract = await helper.extractData(data)
		const response = await helper.callPyModel(`${config.flaskServer}/api/svm`, JSON.parse(extract))
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

router.post('/naive', async (req, res, next) => {
	try {
		const data = req.body
		const extract = await helper.extractData(data)
		const response = await helper.callPyModel(`${config.flaskServer}/api/naive`, JSON.parse(extract))
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

module.exports = router