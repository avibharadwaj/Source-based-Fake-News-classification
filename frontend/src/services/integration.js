import axios from 'axios'
const baseUrl = '/api'

const postUrl = async object => {
    const data = {
        url: object
    }
    const response = await axios.post(baseUrl + '/extract', data)
    console.log(response.data)
    return response.data
}

export default { postUrl }