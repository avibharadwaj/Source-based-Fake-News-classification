const axios = require('axios')

const extractData = async (data) => {
    const response = await axios.post('http://localhost:5000/api/extract', data)
    // console.log(response.data)
    return JSON.stringify(response.data)
}

const callPyModel = async (url, extract) => {
    const response = await axios.post(url, extract)
    return JSON.stringify(response.data)
}

module.exports = { callPyModel, extractData }