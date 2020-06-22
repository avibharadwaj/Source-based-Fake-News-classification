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

router.post('/rf', async (req, res, next) => {
	try {
		const data = req.body
		const extract = await helper.extractData(data)
		const response = await helper.callPyModel(`${config.flaskServer}/api/rf`, JSON.parse(extract))
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

router.post('/nn', async (req, res, next) => {
	try {
		const data = req.body
		const extract = await helper.extractData(data)
		const response = await helper.callPyModel(`${config.flaskServer}/api/nn`, JSON.parse(extract))
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

router.post('/log', async (req, res, next) => {
	try {
		const data = req.body
		const extract = await helper.extractData(data)
		const response = await helper.callPyModel(`${config.flaskServer}/api/logistic`, JSON.parse(extract))
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

router.post('/ada', async (req, res, next) => {
	try {
		const data = req.body
		const extract = await helper.extractData(data)
		const response = await helper.callPyModel(`${config.flaskServer}/api/adaboost`, JSON.parse(extract))
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

router.post('/all', async (req, res, next) => {
	try {
		const data = req.body
		const extract = await helper.extractData(data)
		const response = await helper.callPyModel(`${config.flaskServer}/api/all`, JSON.parse(extract))
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

module.exports = router