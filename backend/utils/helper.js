const axios = require('axios')
const config = require('./config')
const _ = require('lodash')

const extractData = async (data) => {
	const response = await axios.post(`${config.flaskServer}/api/extract`, data)
	// console.log(response.data)
	response.citiations = await citeSources(response.data.title)
	return JSON.stringify(response.data)
}

const callPyModel = async (url, extract) => {
	const response = await axios.post(url, extract)
	return JSON.stringify(response.data)
}

// pass the title of article as input(ONLY title)
const citeSources = async(title) => {
	console.log(title)
	const queryPoint = `${config.customEndpoint}?key=${config.customApiKey}&cx=${config.customApiSecondaryKey}`
	const response = await axios.get(`${queryPoint}&q=${title}`)
	const important = response.data.items
	// console.log(important.items.length)
	const citiations = _.map(important, _.partialRight(_.pick, ['title', 'link']))
	console.log(citiations)
	return citiations
}

module.exports = { callPyModel, extractData }