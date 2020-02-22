const router = require('express').Router()

const helper = require('../utils/helper')

router.get('/', (req, res) => {
	res.json({
		message: 'Hello World!'
	})
})

router.post('/svm', async(req, res, next) => {
	try {
		const data = req.body
		const response = await helper.callPyModel('http://localhost:5000/api/svm', data)
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

router.post('/naive', async (req, res, next) => {
	try {
		const data = req.body
		const response = await helper.callPyModel('http://localhost:5000/api/naive', data)
		res.json(JSON.parse(response))
	}
	catch(error) {
		next(error)
	}
})

module.exports = router