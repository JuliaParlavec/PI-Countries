const axios = require('axios')

const apiData = async () => {
    const api = await axios.get('https://restcountries.com/v3/all')
    console.log(api.data)

}
//apiData()

module.exports = apiData