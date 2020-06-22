import axios from 'axios'
const baseUrl = '/api'

// you will get citations also
// return data
/*
extract,
citations
*/

const postUrl = async object => {
	const data = {
		url: object
	}
	const response = await axios.post(baseUrl + '/extract', data)
	//console.log(JSON.stringify(response.data) + "FROM BACKEND")
	return response.data
}

const getSVM = async object => {
	const data = {url: object}
	const response = await axios.post(baseUrl + '/svm', data)
	return response.data
}

const getNaive = async object => {
    const data = {url: object}
	const response = await axios.post(baseUrl + '/naive', data)
	return response.data
}

const getAll = async object => {
	const data = {url: object}
	const response = await axios.post(baseUrl + '/all', data)
	return response.data
}

export default { postUrl, getSVM, getNaive, getAll }