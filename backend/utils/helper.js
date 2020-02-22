const axios = require('axios')

const extractData = async (data) => {
    try {
        const response = await axios.post('http://localhost:5000/api/extract', data)
		// console.log(response.data)
		return JSON.stringify(response.data)
    }
    catch(error) {
        next(error)
    }
}

const callPyModel = async (url, data) => {
    try {
        let extract = await extractData(data)
		extract = JSON.parse(extract)
		const response = await axios.post(url, extract)
		return JSON.stringify(response.data)
    }
    catch (error) {
        next(error)
    }
}

module.exports = { callPyModel }